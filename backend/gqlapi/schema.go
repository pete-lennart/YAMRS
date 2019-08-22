package gqlapi

import (
	"errors"
	"github.com/graphql-go/graphql"
	"github.com/rs/xid"
	"github.com/virtusmaior/YAMRS/backend/database"
)

var reviewType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Review",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"movieid": &graphql.Field{
			Type: graphql.Int,
		},
		"text": &graphql.Field{
			Type: graphql.String,
		},
		"numstars": &graphql.Field{
			Type: graphql.Int,
		},
		"username": &graphql.Field{
			Type: graphql.String,
		},
		"approved": &graphql.Field{
			Type: graphql.Boolean,
		},
	},
})

func createRootMutation(ds database.Datastore) *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "RootMutation",
		Fields: graphql.Fields{
			"createReview": &graphql.Field{
				Type:        graphql.Boolean,
				Description: "Create new review",
				Args: graphql.FieldConfigArgument{
					"movieid": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.Int),
					},
					"text": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
					"numstars": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.Int),
					},
					"username": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: func(params graphql.ResolveParams) (interface{}, error) {
					id := xid.New()
					movieid, _ := params.Args["movieid"].(int)
					text, _ := params.Args["text"].(string)
					numstars, _ := params.Args["numstars"].(int)
					username, _ := params.Args["username"].(string)
					err := ds.CreateReview(id.String(), movieid, text, numstars, username)
					if err != nil {
						return false, err
					}
					return true, nil
				},
			},
			"approveReview": &graphql.Field{
				Type:        graphql.Boolean,
				Description: "Approve existing review",
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: func(params graphql.ResolveParams) (interface{}, error) {
					id, _ := params.Args["id"].(string)
					err := ds.ApproveReview(id)
					if err != nil {
						return nil, err
					}
					return true, nil
				},
			},
		},
	})
}

func createRootQuery(ds database.Datastore) *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "RootQuery",
		Fields: graphql.Fields{
			"allReviews": &graphql.Field{
				Type:        graphql.NewList(reviewType),
				Description: "All reviews",
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					allReviews, err := ds.AllReviews()
					if err != nil {
						return nil, err
					}
					return allReviews, nil
				},
			},
			"reviewsOfMovie": &graphql.Field{
				Type:        graphql.NewList(reviewType),
				Description: "Reviews of a single movie",
				Args: graphql.FieldConfigArgument{
					"movieid": &graphql.ArgumentConfig{
						Type: graphql.Int,
					},
				},
				Resolve: func(params graphql.ResolveParams) (interface{}, error) {
					movieid, ok := params.Args["movieid"].(int)
					if !ok {
						return nil, errors.New(`Wrong type for field "movieid"`)
					}
					movieReviews, err := ds.ReviewsOfMovie(movieid)
					if err != nil {
						return nil, err
					}
					return movieReviews, nil
				},
			},
			"unapprovedReviews": &graphql.Field{
				Type:        graphql.NewList(reviewType),
				Description: "All unapproved reviews",
				Resolve: func(params graphql.ResolveParams) (interface{}, error) {
					unapprovedReviews, err := ds.UnapprovedReviews()
					if err != nil {
						return nil, err
					}
					return unapprovedReviews, nil
				},
			},
		},
	})
}

func CreateSchema(ds database.Datastore) graphql.Schema {
	var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
		Query:    createRootQuery(ds),
		Mutation: createRootMutation(ds),
	})
	return schema
}

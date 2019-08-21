package database

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"github.com/virtusmaior/YAMRS/backend/mail"
)

type Datastore interface {
	AllReviews() ([]*review, error)
	ReviewsOfMovie(id string) ([]*review, error)
	UnapprovedReviews() ([]*review, error)
	CreateReview(id string, movieid string, text string, numstars int, username string) error
	ApproveReview(id string) error
}

type DBConnection struct {
	*mongo.Collection
}

type review struct {
	ID       string `json:"id"`
	MovieID  string `json:"movieid"`
	Text     string `json:"text"`
	NumStars int    `json:"numstars"`
	Username string `json:"username"`
	Approved bool   `json:"approved"`
}

func (rdbc *DBConnection) AllReviews() ([]*review, error) {
	foundReviews := []*review{}
	cur, err := rdbc.Find(context.Background(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.Background())
	for cur.Next(context.Background()) {
		var result review
		err := cur.Decode(&result)
		if err != nil {
			return nil, err
		}
		foundReviews = append(foundReviews, &result)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}
	return foundReviews, nil
}

func (rdbc *DBConnection) ReviewsOfMovie(id string) ([]*review, error) {
	foundReviews := []*review{}
	cur, err := rdbc.Find(context.Background(), bson.D{bson.E{Key: "movieid", Value: id}})
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.Background())
	for cur.Next(context.Background()) {
		result := &review{}
		err := cur.Decode(&result)
		if err != nil {
			return nil, err
		}
		foundReviews = append(foundReviews, result)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}
	return foundReviews, nil
}

func (rdbc *DBConnection) UnapprovedReviews() ([]*review, error) {
	foundReviews := []*review{}
	cur, err := rdbc.Find(context.Background(), bson.D{bson.E{Key: "approved", Value: false}})
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.Background())
	for cur.Next(context.Background()) {
		result := &review{}
		err := cur.Decode(&result)
		if err != nil {
			return nil, err
		}
		foundReviews = append(foundReviews, result)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}
	return foundReviews, nil
}

func (rdbc *DBConnection) CreateReview(id string, movieid string, text string, numstars int, username string) error {
	newReview := &review{
		ID:       id,
		MovieID:  movieid,
		Text:     text,
		NumStars: numstars,
		Username: username,
		Approved: false,
	}
	_, err := rdbc.InsertOne(context.Background(), newReview)
	if err != nil {
		return err
	}
	mail.SendNotificationMail()
	return nil
}

func (rdbc *DBConnection) ApproveReview(id string) error {
	filter := bson.D{bson.E{Key: "id", Value: id}}
	update := bson.D{
		bson.E{Key: "$set", Value: bson.D{
			bson.E{Key: "approved", Value: true},
		}},
	}
	_, err := rdbc.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}
	return nil
}
package gqlapi

import (
	"errors"
	"github.com/graphql-go/graphql"
)

func ExecuteQuery(query string, schema graphql.Schema) (*graphql.Result, error) {
	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: query,
	})
	if len(result.Errors) > 0 {
		return nil, errors.New("Something went wrong while executing query")
	}
	return result, nil
}

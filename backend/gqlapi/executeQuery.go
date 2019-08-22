package gqlapi

import (
	"github.com/graphql-go/graphql"
)

func ExecuteQuery(query string, schema graphql.Schema) (*graphql.Result, error) {
	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: query,
	})
	if len(result.Errors) > 0 {
		return nil, result.Errors[0]
	}
	return result, nil
}

package database

import (
	"context"
	"time"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"github.com/virtusmaior/YAMRS/helper"
)

type DBConfig struct {
	User     string `json:"dbuser"`
	Password string `json:"dbpassword"`
}

func InitDBCollection() (*DBConnection, error) {
	var dbc DBConfig
	err := helper.LoadConfigIntoStruct("../../config.json", &dbc)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(
		"mongodb+srv://" + dbc.User + ":" + dbc.Password + "@cluster0-9j6na.mongodb.net/test?retryWrites=true&w=majority",
	))
	if err != nil {
		return nil, err
	}
	err = client.Ping(ctx, nil)
	if err != nil {
		return nil, err
	}
	return &DBConnection{client.Database("movieratingdb").Collection("ratings")}, nil
}
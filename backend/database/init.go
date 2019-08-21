package database

import (
	"context"
	"time"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"github.com/virtusmaior/YAMRS/backend/config"
)

type DBConfig struct {
	User     string `json:"dbuser"`
	Password string `json:"dbpassword"`
}

func InitDBCollection() (*DBConnection, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(
		"mongodb+srv://" + config.DBConfig.User + ":" + config.DBConfig.Password + "@cluster0-9j6na.mongodb.net/test?retryWrites=true&w=majority",
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
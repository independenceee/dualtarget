package api

import (
	"context"
	"fmt"
	"log"

	"github.com/blockfrost/blockfrost-go"
)

func Blockfrost(apiKey string, server string) {
	fmt.Printf("API")
	api := blockfrost.NewAPIClient(blockfrost.APIClientOptions{
		ProjectID: apiKey,
		Server:    server,
	})

	fmt.Printf("API")
	info, err := api.Info(context.TODO())
	if err != nil {
		fmt.Printf("API Info:\n\tUrl: %s\n\tVersion: %s", info.Url, info.Version)
		log.Fatal(err)
	}

	fmt.Printf("API Info:\n\tUrl: %s\n\tVersion: %s", info.Url, info.Version)
}

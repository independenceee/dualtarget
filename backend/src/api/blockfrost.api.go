package api

import (
	"context"
	"fmt"
	"log"

	"github.com/blockfrost/blockfrost-go"
)

func Blockfrost(ProjectID string, Server string) blockfrost.APIClient {
	if ProjectID == "" && Server == "" {
		log.Fatal("ProjectID and Server has been required")
	}

	var api blockfrost.APIClient = blockfrost.NewAPIClient(blockfrost.APIClientOptions{
		ProjectID: ProjectID,
		Server:    Server,
	})

	return api
}

func SpecificTransaction(ProjectID string, Server string, TxHash string) {
	api := Blockfrost(ProjectID, Server)

	acc, err := api.TransactionUTXOs(context.Background(), TxHash)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%+v", acc.Inputs[0].Amount[0].Quantity)
}

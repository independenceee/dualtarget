package constants

import (
	"dualtarget-backend/src/helpers"
	"log"
	"os"

	"github.com/joho/godotenv"
)

// instance env
type Env struct {
	DATABASE_HOST     string
	DATABASE_PORT     string
	DATABASE_USER     string
	DATABASE_PASSWORD string
	DATABASE_NAME     string
}

func env() *Env {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	var (
		DATABASE_HOST     = os.Getenv("POSTGRES_HOST")
		DATABASE_PORT     = os.Getenv("POSTGRES_PORT")
		DATABASE_USER     = os.Getenv("POSTGRES_USER")
		DATABASE_PASSWORD = os.Getenv("POSTGRES_PASSWORD")
		DATABASE_NAME     = os.Getenv("POSTGRES_DB")
	)

	if err != nil {
		helpers.ErrorPanic(err)
	}

	return &Env{
		DATABASE_HOST:     DATABASE_HOST,
		DATABASE_PORT:     DATABASE_PORT,
		DATABASE_USER:     DATABASE_USER,
		DATABASE_PASSWORD: DATABASE_PASSWORD,
		DATABASE_NAME:     DATABASE_NAME,
	}
}

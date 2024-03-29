package configs

import (
	"dualtarget-backend/src/helpers"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func DatabaseConnection() *gorm.DB {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	var (
		HOST          = os.Getenv("POSTGRES_HOST")
		PORT          = os.Getenv("POSTGRES_PORT")
		USER          = os.Getenv("POSTGRES_USER")
		PASSWORD      = os.Getenv("POSTGRES_PASSWORD")
		DATABASE_NAME = os.Getenv("POSTGRES_DB")
	)

	port, err := strconv.ParseInt(PORT, 10, 64)
	if err != nil {
		helpers.ErrorPanic(err)
	}

	sqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", HOST, port, USER, PASSWORD, DATABASE_NAME)
	database, err := gorm.Open(postgres.Open(sqlInfo), &gorm.Config{})
	helpers.ErrorPanic(err)

	return database
}

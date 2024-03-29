package configs

import (
	"dualtarget-backend/src/constants"
	"dualtarget-backend/src/helpers"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func DatabaseConnection() *gorm.DB {
	env := constants.Env()

	sqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, USER, PASSWORD, DATABASE_NAME)
	database, err := gorm.Open(postgres.Open(sqlInfo), &gorm.Config{})
	helpers.ErrorPanic(err)

	return database
}

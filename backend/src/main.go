package main

import (
	"dualtarget-backend/src/configs"
	"dualtarget-backend/src/routers"

	"github.com/gin-gonic/gin"
)

func main() {
	configs.Database()
	var app *gin.Engine = gin.Default()
	routers.Routers(app)
	app.Run(":8080")
}

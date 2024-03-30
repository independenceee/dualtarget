package routers

import "github.com/gin-gonic/gin"

func Routers(app *gin.Engine) {
	app.Group("/api/v0")
	AccountRouter(app.Group("/account"))
	TransactionRouter(app.Group("/transaction"))
}

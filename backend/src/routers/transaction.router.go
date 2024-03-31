package routers

import (
	"github.com/gin-gonic/gin"
)

func TransactionRouter(router *gin.RouterGroup) {
	router.GET("")
	router.GET("/:id")
	router.POST("/")
	router.PATCH("/:id")
	router.DELETE("/:id")
}

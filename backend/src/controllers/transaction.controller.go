package controllers

import (
	"dualtarget-backend/src/data/request"
	"dualtarget-backend/src/data/response"
	"dualtarget-backend/src/helpers"
	"dualtarget-backend/src/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type TTransactionController struct {
	transactionService services.ITransactionService
}

func TransactionController(service services.ITransactionService) *TTransactionController {
	return &TTransactionController{
		transactionService: service,
	}
}

func (controller *TTransactionController) Create(context *gin.Context) {
	createTransactionRequest := request.CreateTransaction{}
	err := context.ShouldBindJSON(&createTransactionRequest)
	helpers.ErrorPanic(err)

	controller.transactionService.Create(createTransactionRequest)
	result := response.Response{
		Code:   http.StatusOK,
		Status: "200",
		Data:   nil,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)
}

func (controller *TTransactionController) Update(context *gin.Context) {
	updateTransactionRequest := request.UpdateTransaction{}
	err := context.ShouldBindJSON(&updateTransactionRequest)
	helpers.ErrorPanic(err)

	id := context.Param("id")

	updateTransactionRequest.Id = id
	controller.transactionService.Update(updateTransactionRequest)

	result := response.Response{
		Code:   http.StatusOK,
		Status: "200",
		Data:   nil,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)

}

func (controller *TTransactionController) Delete(context *gin.Context) {
	id := context.Param("id")
	controller.transactionService.Delete(id)
	result := response.Response{
		Code:   http.StatusOK,
		Status: "200",
		Data:   nil,
	}

	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)
}

func (controller *TTransactionController) FindById(context *gin.Context) {
	id := context.Param("id")
	tagResponse := controller.transactionService.FindById(id)

	result := response.Response{
		Code:   http.StatusOK,
		Status: "200",
		Data:   tagResponse,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)
}

func (controller *TTransactionController) FindAll(context *gin.Context) {

	countQuery := context.Query("count")
	sizeQuery := context.Query("size")
	count, err := strconv.Atoi(countQuery)
	helpers.ErrorPanic(err)
	size, err := strconv.Atoi(sizeQuery)
	helpers.ErrorPanic(err)

	accounts, totalPage := controller.transactionService.FindAll(count, size)
	responseData := map[string]interface{}{
		"accounts":   accounts,
		"total_page": totalPage,
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "200",
		Data:   responseData,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, webResponse)

}

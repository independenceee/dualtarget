package controllers

// type TTransactionController struct {
// 	transactionService services.
// }

// func TransactionController(service services.IAccountService) *TAccountController {
// 	return &TAccountController{
// 		accountService: service,
// 	}
// }

// func (controller *TAccountController) Create(context *gin.Context) {
// 	createAccountRequest := request.CreateAccount{}
// 	err := context.ShouldBindJSON(&createAccountRequest)
// 	helpers.ErrorPanic(err)

// 	controller.accountService.Create(createAccountRequest)
// 	result := response.Response{
// 		Code:   http.StatusOK,
// 		Status: "200",
// 		Data:   nil,
// 	}
// 	context.Header("Content-Type", "application/json")
// 	context.JSON(http.StatusOK, result)
// }

// func (controller *TAccountController) Update(context *gin.Context) {
// 	updateAccountRequest := request.UpdateAccount{}
// 	err := context.ShouldBindJSON(&updateAccountRequest)
// 	helpers.ErrorPanic(err)

// 	accountId := context.Param("id")
// 	id, err := strconv.Atoi((accountId))
// 	helpers.ErrorPanic(err)

// 	updateAccountRequest.Id = id
// 	controller.accountService.Update(updateAccountRequest)

// 	result := response.Response{
// 		Code:   http.StatusOK,
// 		Status: "200",
// 		Data:   nil,
// 	}
// 	context.Header("Content-Type", "application/json")
// 	context.JSON(http.StatusOK, result)

// }

// func (controller *TAccountController) Delete(context *gin.Context) {
// 	accountId := context.Param("id")
// 	id, err := strconv.Atoi(accountId)
// 	helpers.ErrorPanic(err)
// 	controller.accountService.Delete(id)

// 	result := response.Response{
// 		Code:   http.StatusOK,
// 		Status: "200",
// 		Data:   nil,
// 	}

// 	context.Header("Content-Type", "application/json")
// 	context.JSON(http.StatusOK, result)
// }

// func (controller *TAccountController) FindById(context *gin.Context) {

// 	accountId := context.Param("id")
// 	id, err := strconv.Atoi(accountId)
// 	helpers.ErrorPanic(err)

// 	tagResponse := controller.accountService.FindById(id)

// 	result := response.Response{
// 		Code:   http.StatusOK,
// 		Status: "200",
// 		Data:   tagResponse,
// 	}
// 	context.Header("Content-Type", "application/json")
// 	context.JSON(http.StatusOK, result)
// }

// func (controller *TAccountController) FindAll(context *gin.Context) {

// 	accounts := controller.accountService.FindAll()
// 	webResponse := response.Response{
// 		Code:   http.StatusOK,
// 		Status: "200",
// 		Data:   accounts,
// 	}
// 	context.Header("Content-Type", "application/json")
// 	context.JSON(http.StatusOK, webResponse)

// }

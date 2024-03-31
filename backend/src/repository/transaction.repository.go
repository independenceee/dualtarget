package repository

import (
	dto "dualtarget-backend/src/dto/transaction"
	"dualtarget-backend/src/helpers"
	"dualtarget-backend/src/models"
	"errors"

	"gorm.io/gorm"
)

type ITransactionRepository interface {
	Save(transaction models.Transaction)
	Update(transaction models.Transaction)
	Delete(transactionId string)
	FindById(transactionId string) (transaction models.Transaction, err error)
	FindAll() []models.Transaction
}

type TransactionRepositoryImplement struct {
	DB *gorm.DB
}

func TransactionRepository(DB *gorm.DB) *TransactionRepositoryImplement {
	return &TransactionRepositoryImplement{DB: DB}
}

func (transactionRepository *TransactionRepositoryImplement) Delete(transactionId string) {
	var transactionDto models.Transaction
	result := transactionRepository.DB.Where("id = ?", transactionId).Delete(&transactionDto)
	helpers.ErrorPanic(result.Error)
}

func (transactionRepository *TransactionRepositoryImplement) FindAll() []models.Transaction {
	var transactions []models.Transaction
	result := transactionRepository.DB.Find(&transactions)
	helpers.ErrorPanic(result.Error)
	return transactions
}

func (transactionRepository *TransactionRepositoryImplement) FindById(accountId string) (transaction models.Transaction, err error) {
	var transactionDto models.Transaction
	result := transactionRepository.DB.Find(&transactionDto, accountId)
	if result != nil {
		return transactionDto, nil
	} else {
		return transactionDto, errors.New("tag is not found")
	}
}

// save transaction repository
func (transactionRepository *TransactionRepositoryImplement) Save(transaction models.Transaction) {
	result := transactionRepository.DB.Create(&transaction)
	helpers.ErrorPanic(result.Error)
}

// update transaction repository
func (transactionRepository *TransactionRepositoryImplement) Update(TransactionDto models.Transaction) {
	var updateAccount = dto.UpdateTransactionDto{
		Id:        TransactionDto.Id,
		Date:      TransactionDto.Date,
		TxHash:    TransactionDto.TxHash,
		Status:    TransactionDto.Status,
		Action:    TransactionDto.Action,
		Amount:    TransactionDto.Amount,
		AccountId: TransactionDto.AccountId,
	}
	result := transactionRepository.DB.Model(&updateAccount).Updates(updateAccount)
	helpers.ErrorPanic(result.Error)
}

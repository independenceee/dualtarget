package repository

import (
	dto "dualtarget-backend/src/dto/transaction"
	"dualtarget-backend/src/helpers"
	"dualtarget-backend/src/models"
	"errors"

	"gorm.io/gorm"
)

type ITransactionRepository interface {
	Save(transaction models.Transaction) (transactionDto models.Transaction, err error)
	Update(transaction models.Transaction)
	Delete(transactionId string)
	FindById(transactionId string) (transaction models.Transaction, err error)
	FindByTxHash(transactionHash string) (transaction models.Transaction, err error)
	FindAll(count int, size int) ([]models.Transaction, int)
}

type TTransactionRepository struct {
	DB *gorm.DB
}

func TransactionRepositoryImplement(DB *gorm.DB) ITransactionRepository {
	return &TTransactionRepository{DB: DB}
}

func (transactionRepository *TTransactionRepository) Delete(transactionId string) {
	var transactionDto models.Transaction
	result := transactionRepository.DB.Where("id = ?", transactionId).Delete(&transactionDto)
	helpers.ErrorPanic(result.Error)
}

func (transactionRepository *TTransactionRepository) FindByTxHash(transactionHash string) (transaction models.Transaction, err error) {
	var transactionDto models.Transaction
	result := transactionRepository.DB.Find(&transactionDto, transactionHash)
	if result != nil {
		return transactionDto, nil
	} else {
		return transactionDto, errors.New("tag is not found")
	}
}

func (transactionRepository *TTransactionRepository) FindAll(count int, size int) ([]models.Transaction, int) {
	var transactions []models.Transaction
	result := transactionRepository.DB.Limit(size).Offset(count).Find(&transactions)
	helpers.ErrorPanic(result.Error)
	totalPage := len(transactions) / size
	return transactions, totalPage
}

func (transactionRepository *TTransactionRepository) FindById(accountId string) (transaction models.Transaction, err error) {
	var transactionDto models.Transaction
	result := transactionRepository.DB.Find(&transactionDto, accountId)
	if result != nil {
		return transactionDto, nil
	} else {
		return transactionDto, errors.New("transaction is not found")
	}
}

func (transactionRepository *TTransactionRepository) Save(transaction models.Transaction) (transactionDto models.Transaction, err error) {
	result := transactionRepository.DB.Create(&transaction)
	helpers.ErrorPanic(result.Error)
	return transaction, nil
}

func (transactionRepository *TTransactionRepository) Update(TransactionDto models.Transaction) {
	var updateTransaction = dto.UpdateTransactionDto{
		Id:        TransactionDto.Id,
		Date:      TransactionDto.Date,
		TxHash:    TransactionDto.TxHash,
		Status:    TransactionDto.Status,
		Action:    TransactionDto.Action,
		Amount:    TransactionDto.Amount,
		AccountId: TransactionDto.AccountId,
	}
	result := transactionRepository.DB.Model(&updateTransaction).Updates(updateTransaction)
	helpers.ErrorPanic(result.Error)
}

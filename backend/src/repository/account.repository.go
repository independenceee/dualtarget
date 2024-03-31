package repository

import (
	dto "dualtarget-backend/src/dto/account"
	"dualtarget-backend/src/helpers"
	"dualtarget-backend/src/models"
	"errors"

	"gorm.io/gorm"
)

type IAccountRepository interface {
	Save(account models.Account)
	Update(account models.Account)
	Delete(accountId string)
	FindById(accountId string) (accountDto models.Account, err error)
	FindAll() []models.Account
}

type TAccountRepository struct {
	DB *gorm.DB
}

func AccountRepositoryImplement(DB *gorm.DB) IAccountRepository {
	return &TAccountRepository{DB: DB}
}

func (accountRepository *TAccountRepository) Delete(accountId string) {
	var accountDto models.Account
	result := accountRepository.DB.Where("id = ?", accountId).Delete(&accountDto)
	helpers.ErrorPanic(result.Error)
}

func (accountRepository *TAccountRepository) FindAll() []models.Account {
	var accounts []models.Account
	result := accountRepository.DB.Find(&accounts)
	helpers.ErrorPanic(result.Error)
	return accounts
}

func (accountRepository *TAccountRepository) FindById(accountId string) (account models.Account, err error) {
	var accountDto models.Account
	result := accountRepository.DB.Find(&accountDto, accountId)
	if result != nil {
		return accountDto, nil
	} else {
		return accountDto, errors.New("Account is not found")
	}
}

func (accountRepository *TAccountRepository) Save(accountDto models.Account) {
	result := accountRepository.DB.Create(&accountDto)
	helpers.ErrorPanic(result.Error)
}

func (accountRepository *TAccountRepository) Update(accountDto models.Account) {
	var updateAccount = dto.UpdateAccountDto{
		Id:            accountDto.Id,
		WalletAddress: accountDto.WalletAddress,
		StakeAddress:  accountDto.StakeAddress,
	}
	result := accountRepository.DB.Model(&accountRepository).Updates(updateAccount)
	helpers.ErrorPanic(result.Error)
}

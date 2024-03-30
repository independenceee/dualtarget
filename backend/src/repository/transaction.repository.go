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
	Delete(accountId int)
	FindById(accountId int) (accountDto models.Account, err error)
	FindAll() []models.Account
}

type AccountRepositoryImplement struct {
	DB *gorm.DB
}

func AccountRepository(DB *gorm.DB) *AccountRepositoryImplement {
	return &AccountRepositoryImplement{DB: DB}
}

func (account *AccountRepositoryImplement) Delete(accountId string) {
	var accountDto models.Account
	result := account.DB.Where("id = ?", accountId).Delete(&accountDto)
	helpers.ErrorPanic(result.Error)
}

func (account *AccountRepositoryImplement) FindAll() []models.Account {
	var accounts []models.Account
	result := account.DB.Find(&accounts)
	helpers.ErrorPanic(result.Error)
	return accounts
}

func (account *AccountRepositoryImplement) FindById(accountId int) (tags models.Account, err error) {
	var accountDto models.Account
	result := account.DB.Find(&accountDto, accountId)
	if result != nil {
		return accountDto, nil
	} else {
		return accountDto, errors.New("tag is not found")
	}
}

func (account *AccountRepositoryImplement) Save(accountDto models.Account) {
	result := account.DB.Create(&accountDto)
	helpers.ErrorPanic(result.Error)
}

func (account *AccountRepositoryImplement) Update(accountDto models.Account) {
	var updateAccount = dto.UpdateAccountDto{
		Id:            accountDto.Id,
		WalletAddress: accountDto.WalletAddress,
		StakeAddress:  accountDto.StakeAddress,
	}
	result := account.DB.Model(&account).Updates(updateAccount)
	helpers.ErrorPanic(result.Error)
}

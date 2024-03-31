package services

import (
	"dualtarget-backend/src/data/request"
	"dualtarget-backend/src/data/response"
	"dualtarget-backend/src/helpers"
	"dualtarget-backend/src/models"
	"dualtarget-backend/src/repository"

	"github.com/go-playground/validator/v10"
)

type IAccountService interface {
	Create(account request.CreateAccount)
	Update(account request.UpdateAccount)
	Delete(accountId string)
	FindById(accountId string) response.AccountResponse
	FindAll() []response.AccountResponse
}

type TAccountService struct {
	AccountRepository repository.IAccountRepository
	Validate          *validator.Validate
}

func AccountServiceImplement(accountRepository repository.IAccountRepository, validate *validator.Validate) IAccountService {
	return &TAccountService{
		AccountRepository: accountRepository,
		Validate:          validate,
	}
}

func (accountService *TAccountService) Create(accountRequest request.CreateAccount) {
	err := accountService.Validate.Struct(accountRequest)
	helpers.ErrorPanic(err)
	accountModel := models.Account{
		WalletAddress: accountRequest.WalletAddress,
	}
	accountService.AccountRepository.Save(accountModel)
}

func (accountService *TAccountService) Delete(accountId string) {
	accountService.AccountRepository.Delete(accountId)
}

func (accountService *TAccountService) Update(account request.UpdateAccount) {
	existAccount, err := accountService.AccountRepository.FindById(account.Id)
	helpers.ErrorPanic(err)

	existAccount.WalletAddress = account.WalletAddress
	existAccount.StakeAddress = account.StakeAddress
	accountService.AccountRepository.Update(existAccount)
}
func (accountService *TAccountService) FindById(accountId string) response.AccountResponse {
	existAccount, err := accountService.AccountRepository.FindById(accountId)
	helpers.ErrorPanic(err)

	result := response.AccountResponse{
		Id:            existAccount.Id,
		CreatedAt:     existAccount.CreatedAt.String(),
		UpdatedAt:     existAccount.UpdatedAt.String(),
		WalletAddress: existAccount.WalletAddress,
		StakeAddress:  existAccount.StakeAddress,
	}
	return result
}

func (accountService *TAccountService) FindAll() []response.AccountResponse {
	result := accountService.AccountRepository.FindAll()

	var accounts []response.AccountResponse
	for _, value := range result {
		account := response.AccountResponse{
			Id:            value.Id,
			WalletAddress: value.WalletAddress,
			StakeAddress:  value.StakeAddress,
			CreatedAt:     value.CreatedAt.String(),
			UpdatedAt:     value.UpdatedAt.String(),
		}
		accounts = append(accounts, account)
	}

	return accounts
}

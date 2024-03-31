package dto

type UpdateAccountDto struct {
	Id            string `validate:"required" json:"id"`
	WalletAddress string `validate:"required" json:"wallet_address"`
	StakeAddress  string `validate:"required" json:"stake_address"`
}

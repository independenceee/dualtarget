package request

type CreateAccount struct {
	WalletAddress string `validate:"required" json:"wallet_address"`
	StakeAddress  string `json:"stake_address"`
}

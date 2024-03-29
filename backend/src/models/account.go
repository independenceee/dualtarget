package models

type Account struct {
	Id            int    `gorm:"type:int";primary_key`
	WalletAddress string `gorm:"type:varchar(255)"`
	StakeAddress  string `gorm:"type:varchar(255)"`
}

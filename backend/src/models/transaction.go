package models

type Transaction struct {
	Id     int    `gorm:"type:int";primary_key`
	TxHash string `gorm:"type:varchar(255)"`
	Date   string `gorm:"type:varchar(255)"`
	action string `gorm:"type:varchar(255)"`
	amount string `gorm:"type:varchar(255)"`

	status string
}

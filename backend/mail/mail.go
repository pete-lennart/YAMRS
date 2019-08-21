package mail

import (
	"net/smtp"
	"github.com/virtusmaior/YAMRS/backend/config"
)

type EmailConfig struct {
	User       string   `json:"emailuser"`
	Password   string   `json:"emailpassword"`
	Recipients []string `json:"emailrecipients"`
}

func SendNotificationMail() error {
	auth := smtp.PlainAuth(
		"",
		config.EmailConfig.User,
		config.EmailConfig.Password,
		"smtp.gmail.com",
	)
	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		config.EmailConfig.User,
		config.EmailConfig.Recipients,
		[]byte(`From: YAMRS Notification Service
To: ` + config.EmailConfig.Recipients[0] + `
Subject: A new review has been added!

Look it up!`),
	)
	if err != nil {
		return err
	}
	return nil
}

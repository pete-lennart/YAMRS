package mail

import (
	"net/smtp"
	"github.com/virtusmaior/YAMRS/helper"
)

type EmailConfig struct {
	User       string   `json:"emailuser"`
	Password   string   `json:"emailpassword"`
	Recipients []string `json:"emailrecipients"`
}

func SendNotificationMail() error {
	var ec EmailConfig
	err := helper.LoadConfigIntoStruct("../../config.json", &ec)
	if err != nil {
		return err
	}
	auth := smtp.PlainAuth(
		"",
		ec.User,
		ec.Password,
		"smtp.gmail.com",
	)
	err = smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		ec.User,
		ec.Recipients,
		[]byte(`From: YAMRS Notification Service
To: ` + ec.Recipients[0] + `
Subject: A new review has been added!

Look it up!`),
	)
	if err != nil {
		return err
	}
	return nil
}

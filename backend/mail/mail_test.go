package mail

import "testing"

func TestSendNotificationMail(t *testing.T) {
    err := SendNotificationMail()
    if err != nil {
       t.Error(err)
    }
}
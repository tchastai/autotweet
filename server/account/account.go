package account

import (
	"encoding/json"
	"net/http"

	"server/auth"

	"github.com/dghubble/go-twitter/twitter"
)

// Account represents a Twitter account
type Account struct {
	ProfilePictureURL string `json:"profilePictureURL"`
	Username          string `json:"username"`
}

// getAccountInfo returns info about the current user
func getAccountInfo(creds auth.Token) Account {
	client := auth.GetTwitterClient(creds)

	user, _, _ := client.Accounts.VerifyCredentials(
		&twitter.AccountVerifyParams{
			IncludeEntities: twitter.Bool(false),
			SkipStatus:      twitter.Bool(true),
			IncludeEmail:    twitter.Bool(false),
		})

	return Account{ProfilePictureURL: user.ProfileImageURL, Username: user.ScreenName}
}

func getAccountInfoHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	creds := auth.Token{
		Token:       ctx.Value(auth.Ctx).(auth.Token).Token,
		TokenSecret: ctx.Value(auth.Ctx).(auth.Token).TokenSecret,
	}

	account := getAccountInfo(creds)

	b, _ := json.Marshal(account)

	w.Write(b)
}

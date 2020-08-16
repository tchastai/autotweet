package auth

import (
	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
	tAuth "github.com/dghubble/oauth1/twitter"
)

// ConsumerCreds represents consumer credentials required for Twitter API authorization
type ConsumerCreds struct {
	ConsumerToken  string
	ConsumerSecret string
}

// ClientCreds store the app's credentials
var ClientCreds ConsumerCreds

// StoreCredentials stores the provided credentials in a package scoped variable
func StoreCredentials(c ConsumerCreds) {
	ClientCreds = c
}

// GetTwitterClient returns a Twitter client authenticated with `creds`
func GetTwitterClient(creds Token) *twitter.Client {
	config := oauth1.Config{
		ConsumerKey:    ClientCreds.ConsumerToken,
		ConsumerSecret: ClientCreds.ConsumerSecret,
		Endpoint:       tAuth.AuthenticateEndpoint,
	}
	token := oauth1.NewToken(creds.Token, creds.TokenSecret)
	httpClient := config.Client(oauth1.NoContext, token)
	return twitter.NewClient(httpClient)
}

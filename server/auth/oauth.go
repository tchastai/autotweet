package auth

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/dghubble/oauth1"
	"github.com/dghubble/oauth1/twitter"
)

// Token represents credentials as defined in RFC5849, 1.1.
type Token struct {
	Token       string `json:"token"`
	TokenSecret string `json:"tokenSecret"`
}

// AuthenticateResponse represents a response from the `oauth/authenticate` endpoint.
type AuthenticateResponse struct {
	Verifier string `json:"verifier"`
	Token    string `json:"token"`
}

// getRequestToken gets a request token
func getRequestToken(w http.ResponseWriter, r *http.Request) {
	config := oauth1.Config{
		ConsumerKey:    ClientCreds.ConsumerToken,
		ConsumerSecret: ClientCreds.ConsumerSecret,
		CallbackURL:    r.URL.Query().Get("oauth_callback"),
		Endpoint:       twitter.AuthenticateEndpoint,
	}

	t, s, err := config.RequestToken()
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		return
	}

	reqToken := Token{Token: t, TokenSecret: s}
	res, _ := json.Marshal(reqToken)

	w.Write(res)
}

// getAccessToken returns an access token from from the given AuthenticateResponse.
func getAccessToken(w http.ResponseWriter, r *http.Request) {
	config := oauth1.Config{
		ConsumerKey:    ClientCreds.ConsumerToken,
		ConsumerSecret: ClientCreds.ConsumerSecret,
		Endpoint:       twitter.AuthenticateEndpoint,
	}

	token, sec, err := config.AccessToken(
		r.URL.Query().Get("oauth_token"),
		"",
		r.URL.Query().Get("oauth_verifier"),
	)

	if err != nil {
		log.Println(err)
		return
	}

	t := oauth1.NewToken(token, sec)
	b, _ := json.Marshal(Token{Token: t.Token, TokenSecret: t.TokenSecret})

	w.Write(b)
}

package account

import (
	"github.com/gorilla/mux"
	"github.com/valaymerick/autotweet/server/auth"
)

// RegisterRouter attaches `account` handlers to the provided router
func RegisterRouter(r *mux.Router) {
	subrouter := r.PathPrefix("/accounts/").Subrouter()
	subrouter.Use(auth.Middleware)
	subrouter.HandleFunc("/info", getAccountInfoHandler)
}

package account

import (
	"server/auth"

	"github.com/gorilla/mux"
)

// RegisterRouter attaches `account` handlers to the provided router
func RegisterRouter(r *mux.Router) {
	subrouter := r.PathPrefix("/accounts/").Subrouter()
	subrouter.Use(auth.Middleware)
	subrouter.HandleFunc("/info", getAccountInfoHandler)
}

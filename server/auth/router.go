package auth

import "github.com/gorilla/mux"

// RegisterRouter attaches `auth` handlers to the provided router
func RegisterRouter(r *mux.Router) {
	subrouter := r.PathPrefix("/auth/").Subrouter()
	subrouter.HandleFunc("/request_token", getRequestToken)
	subrouter.HandleFunc("/access_token", getAccessToken)
}

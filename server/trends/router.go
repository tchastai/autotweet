package trends

import (
	"server/auth"

	"github.com/gorilla/mux"
)

// RegisterRouter attaches `trends` handlers to the provided router
func RegisterRouter(r *mux.Router) {
	subrouter := r.PathPrefix("/trends/").Subrouter()
	subrouter.Use(auth.Middleware)
	subrouter.HandleFunc("/{username}/metrics", getUserMetricsHandler)
	subrouter.HandleFunc("/{username}/graph", renderGraph)
}

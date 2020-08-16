package auth

import (
	"context"
	"net/http"
)

// ContextKey represents a context key
type ContextKey struct {
	key string
}

// Ctx refers to the auth context
var Ctx ContextKey = ContextKey{"auth"}

// Middleware validates the authentication header
func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		key, secret, ok := r.BasicAuth()

		if !ok {
			w.WriteHeader(401)
		} else {
			ctx := context.WithValue(r.Context(), Ctx, Token{key, secret})
			next.ServeHTTP(w, r.WithContext(ctx))
		}
	})
}

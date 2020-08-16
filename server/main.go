package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/urfave/cli/v2"

	"github.com/valaymerick/autotweet/server/account"
	"github.com/valaymerick/autotweet/server/auth"
	"github.com/valaymerick/autotweet/server/trends"
)

// Serve creates an http listening to `port`
func Serve(port string) {
	r := mux.NewRouter()

	auth.RegisterRouter(r)
	account.RegisterRouter(r)
	trends.RegisterRouter(r)

	cors := handlers.CORS(
		handlers.AllowedHeaders([]string{"authorization"}),
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowCredentials(),
	)

	r.Use(cors)

	http.ListenAndServe(":"+port, r)
}

func main() {
	app := &cli.App{
		Name:  "autotweet-server",
		Usage: "Backend for the autotweet mobile app.",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:     "consumerKey",
				Required: true,
				Usage:    "Twitter consumer key",
				EnvVars:  []string{"TWITTER_CONSUMER_KEY"},
				Aliases:  []string{"k"},
			},
			&cli.StringFlag{
				Name:     "consumerSecret",
				Required: true,
				Usage:    "Twitter consumer secret",
				EnvVars:  []string{"TWITTER_CONSUMER_SECRET"},
				Aliases:  []string{"s"},
			},
			&cli.IntFlag{
				Name:  "port",
				Value: 8080,
				Usage: "Listen and serve port",
			},
		},
		Action: func(c *cli.Context) error {
			creds := auth.ConsumerCreds{ConsumerToken: c.String("consumerKey"),
				ConsumerSecret: c.String("consumerSecret")}
			p := strconv.Itoa(c.Int("port"))

			fmt.Printf("☁️ Listening on port %s.", p)
			fmt.Printf("\nCredentials: %s.\n", creds)

			auth.StoreCredentials(creds)

			Serve(p)

			return nil
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}

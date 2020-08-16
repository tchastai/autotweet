package trends

import (
	"encoding/json"
	"net/http"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/gorilla/mux"
	"github.com/valaymerick/autotweet/server/auth"
)

type metrics struct {
	Points    int `json:"points"`
	Retweets  int `json:"retweets"`
	Favorites int `json:"favorites"`
	Replies   int `json:"replies"`
}

// getUserMetrics returns metrics over the last month starting from the last tweet
// for a given user
func getUserMetrics(username string, creds auth.Token) metrics {
	client := auth.GetTwitterClient(creds)

	tl, _, _ := client.Timelines.UserTimeline(&twitter.UserTimelineParams{ScreenName: username, IncludeRetweets: twitter.Bool(false), Count: 40})

	curMetrics := metrics{
		Points:    0,
		Retweets:  0,
		Favorites: 0,
		Replies:   0,
	}

	if len(tl) < 1 {
		return metrics{}
	}

	for i, tweet := range tl {

		if i <= 20 {
			curMetrics.Replies -= tweet.ReplyCount
			curMetrics.Retweets -= tweet.RetweetCount
			curMetrics.Favorites -= tweet.FavoriteCount
		} else {
			curMetrics.Replies += tweet.ReplyCount
			curMetrics.Retweets += tweet.RetweetCount
			curMetrics.Favorites += tweet.FavoriteCount
		}
	}

	curMetrics.Points = curMetrics.Replies + curMetrics.Retweets + curMetrics.Favorites

	return curMetrics
}

func getUserMetricsHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	creds := auth.Token{
		Token:       ctx.Value(auth.Ctx).(auth.Token).Token,
		TokenSecret: ctx.Value(auth.Ctx).(auth.Token).TokenSecret,
	}

	vars := mux.Vars(r)

	m := getUserMetrics(vars["username"], creds)

	b, _ := json.Marshal(m)

	w.Write(b)
}

package trends

import (
	"html/template"
	"log"
	"net/http"
	"strconv"

	"server/auth"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/gorilla/mux"
)

type graphViewData struct {
	DataPoints []int
}

func getDataPoints(username string, count int, creds auth.Token) []int {
	client := auth.GetTwitterClient(creds)

	tl, _, _ := client.Timelines.UserTimeline(
		&twitter.UserTimelineParams{
			ScreenName:      username,
			IncludeRetweets: twitter.Bool(false),
			Count:           200,
			TrimUser:        twitter.Bool(true),
		})

	var points []int

	for i, tweet := range tl {
		if i < count {
			points = append(points, tweet.FavoriteCount+tweet.RetweetCount)
		}
	}

	return points
}

func renderGraph(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	creds := auth.Token{
		Token:       ctx.Value(auth.Ctx).(auth.Token).Token,
		TokenSecret: ctx.Value(auth.Ctx).(auth.Token).TokenSecret,
	}

	vars := mux.Vars(r)

	tweetCount, err := strconv.Atoi(r.URL.Query().Get("count"))

	if err != nil {
		w.WriteHeader(400)
	}

	var viewData graphViewData

	viewData.DataPoints = getDataPoints(vars["username"], tweetCount, creds)

	tmpl := template.Must(template.ParseFiles("trends/graph.html"))

	log.Println(err)

	tmpl.Execute(w, viewData)
}

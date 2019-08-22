// TODO:
// - Comments
// - Tests

package main

import (
	"log"
	"net/http"
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/virtusmaior/YAMRS/backend/database"
	"github.com/virtusmaior/YAMRS/backend/gqlapi"
)

func main() {
	rdbc, err := database.InitDBCollection()
	if err != nil {
		log.Panic(err)
	}

	var schema = gqlapi.CreateSchema(rdbc)

	http.HandleFunc("/graphql", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		var data map[string]interface{}
		buf := new(bytes.Buffer)
		buf.ReadFrom(r.Body)
		err := json.Unmarshal(buf.Bytes(), &data)
		if err != nil {
			log.Println(err);
			http.Error(w, err.Error(), 400)
			return
		}
		query, ok := data["query"].(string)
		if !ok {
			log.Println(err);
			http.Error(w, "Invalid query type", 400)
			return
		}
		result, err := gqlapi.ExecuteQuery(query, schema)
		if err != nil {
			log.Println(err);
			http.Error(w, "Error while processing query", 400)
			return
		}
		json.NewEncoder(w).Encode(result)
	})

	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)

	fmt.Println("Access the web app via browser at 'http://localhost:8080'")

	http.ListenAndServe(":8080", nil)
}

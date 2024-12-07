package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		_, _ = fmt.Fprint(w, "Hello, 世界！")
	})

	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), nil))
}

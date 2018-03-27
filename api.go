package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"time"
	"net/http"
	"github.com/gorilla/mux"
)

const (
	DB_USER     = "minux"
	DB_PASSWORD = "minux13"
	DB_NAME     = "minux"
)

var db *sql.DB

func init() {
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", DB_USER, DB_PASSWORD, DB_NAME)
	tmpDB, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	db = tmpDB
}

func main() {
	r := mux.NewRouter().StrictSlash(false)
	r.HandleFunc("/AddPatient", AddPatient)

	server := &http.Server{
			Addr		: ":8080",
			Handler		: r,
			ReadTimeout	: 10 * time.Second,
			WriteTimeout	: 10 * time.Second,
			MaxHeaderBytes	: 1 << 20,
	}

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./public/images")))

	server.ListenAndServe()

}

func checkErr(err error) {
    if err != nil {
         fmt.Println(err)
    }
}

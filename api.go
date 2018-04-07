package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"html/template"
	"log"
	"net/http"
	"time"
	"reflect"
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
	if err != nil {
		log.Fatal(err)
	}

	db = tmpDB
}

func Form(w http.ResponseWriter, r *http.Request) {
	t := template.New("historialformulario") // Create a template.
	t, err := t.ParseFiles("public/templates/login.html")
	if err != nil {
		log.Fatal(err)
	}
	t.Execute(w, "historialformulario")
}

func Patients(w http.ResponseWriter, r *http.Request) {
	var err error

	switch r.Method {
	case "POST":
		var patient Patient

		w.Header().Set("Content-type", "application/json")

		// Process JSON
		decoder := json.NewDecoder(r.Body)
		err = decoder.Decode(&patient)
		if err != nil {
			fmt.Fprintf(w, `{"error": "Err while parsing JSON"}`)
			log.Println(err)
			return
		}

		fmt.Println( patient.Fullname )
		fmt.Println( patient )
		fmt.Println( "jjjjjjjjjjjjjw" )
		// Create Patient
		//patient.Save()
	//x := struct{Foo string; Bar int }{"foo", 2}

    v := reflect.ValueOf( patient )

    values := make([]interface{}, v.NumField())

    for i := 0; i < v.NumField(); i++ {
        values[i] = v.Field(i).Interface()
    }

    fmt.Println(values)
		//fmt.Fprintf(w, `{"patient": "saved"}`)
		// Print patient
	default:
		w.Header().Set("Content-type", "application/json")
		http.Error(w, `{"status": "Internal Server Error"}`, http.StatusInternalServerError)
	}
}

func main() {
	r := mux.NewRouter().StrictSlash(false)
	r.HandleFunc("/", Form)
	r.HandleFunc("/patients", Patients)

	server := &http.Server{
		Addr:           ":8080",
		Handler:        r,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	r.PathPrefix("/js/").Handler(http.StripPrefix("/js/", http.FileServer(http.Dir("./public/js/"))))
	r.PathPrefix("/css/").Handler(http.StripPrefix("/css/", http.FileServer(http.Dir("./public/css/"))))
	r.PathPrefix("/img/").Handler(http.StripPrefix("/img/", http.FileServer(http.Dir("./public/images/"))))

	server.ListenAndServe()
}

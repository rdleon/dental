package main

import (
    "database/sql"
    "fmt"
    _ "github.com/lib/pq"
    "time"
)

const (
    DB_USER     = "minux"
    DB_PASSWORD = "minux23"
    DB_NAME     = "minux"
)

var db *sql.DB

func init() {
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", DB_USER, DB_PASSWORD, DB_NAME)
	tmpDB, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	db = tmpDB
	//defer db.Close()
}

func PostAddPatient(w http.ResponseWriter, r *http.Request){

	var patientId int

	//Fields of patient table
	patientCreated := time.Now()
	patientUpdated := time.Now()
	var patientFullName int
	var patientNickName string
	var patientGender int
	var patientBirthDate time.time
	var patientSibilings int
	var patientLivesWith string
	var patientAddressId int
	var patientSchoolId int

	//Fields of address table
	var patientStreetAndNumber string
	var patientNeighberhood string
	var patientTelephone string

	//Fields of school table
	var patientSchoolName string
	var patientSchoolAddress string

	//Insert address
	err = db.QueryRow("INSERT INTO addresses (street_and_number,neighberhood,telephone) VALUES($1,$2,$3) returning id;",patientStreetAndNumber, patientNeighberhood, patientTelephon ).Scan(&patientAddressId)
	checkErr(err)

	//Insert school
	err = db.QueryRow("INSERT INTO schools (name,address) VALUES($1,$2) returning id;", patientSchoolName, patientSchoolAddress ).Scan(&patientSchoolId)
	checkErr(err)

	//Insert patient
	err = db.QueryRow("INSERT INTO schools (created, updated, fullname, nickname, gender, birthdate, siblings, lives_with, address_id, school_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) returning id;", patientFullName, patientNickName, patientGender, patientBirthDate, patientSibilings, patientLivesWith, patientAddressId, patientSchoolId ).Scan(&patientId)
	checkErr(err)

	fmt.Println("# Querying")
	rows, err := db.Query("SELECT * FROM patients where id = $1", patientId)
	checkErr(err)

	for rows.Next() {
	    var id int
	    var gender string
	    err = rows.Scan(&id, &gender)
	    checkErr(err)
	    fmt.Println("id | genero ")
	    fmt.Printf("%2v | %6v\n", id, gender)
	}

}

func main() {
	r := mux.NewRouter().StrictSlash(false)
	r.HandleFunc("/PostAddPatient", PostAddPatient).Methods("POST")

	server := &http.Server{
			Addr		: ":8080",
			Handler		: r,
			ReadTimeout	: 10 * time.Second,
			WriteTimeout	: 10 * time.Second,
			MaxHeaderBytes	: 1 << 20,
	}

	//r.PathPrefix("/").Handler(http.FileServer(http.Dir("./public/")))

	server.ListenAndServe()

}

func checkErr(err error) {
    if err != nil {
         log.Fatal(err)
    }
}

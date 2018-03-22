package main

import (
	//"database/sql"
	//"fmt"
	_ "github.com/lib/pq"
	"time"
	"html/template"
	"net/http"
	//"strings"
	"strconv"
	//"github.com/gorilla/mux"
	//"reflect"
)

type Patient struct {
	Id		int
	Created		time.Time
	Updated		time.Time
	FullName	string
	NickName	string
	Gender		int
	BirthDate	time.Time
	Sibilings	int
	LivesWith	string
	AddressId	string	//Cuando cacha el id cuando se hace insert es un string
	SchoolId	string	//Cuando cacha el id cuando se hace insert es un string
}

type Address struct{
	Id		int
	StreetAndNumber	string
	Neighberhood	string
	Telephone	string

}

type School struct{
	Id		int
	Name		string
	AddressId	string	//Cuando cacha el id cuando se hace insert es un string
}

func AddPatient(w http.ResponseWriter, r *http.Request){

	if r.Method == "GET" {
		t, _ := template.ParseFiles("public/login.html")
		t.Execute(w, nil)
	} else {

		var patient Patient
		var school  School
		var addressPatient Address
		var addressSchool  Address

		r.ParseForm()
		patient.Created		= time.Now()
		patient.Updated		= time.Now()
		patient.FullName	= r.Form["fullname"][0]
		patient.NickName	= r.Form["nickname"][0]
		patient.Gender, _	= strconv.Atoi(r.Form["gender"][0])
		patient.BirthDate, _	= time.Parse("2006-01-02T15:04:05.000Z",r.Form["birthday"][0]);
		patient.Sibilings, _	= strconv.Atoi(r.Form["sibilings"][0])
		patient.LivesWith	= r.Form["liveswith"][0]

		addressPatient.StreetAndNumber	= r.Form["streetandnumber"][0]
		addressPatient.Neighberhood	= r.Form["neighberhood"][0]
		addressPatient.Telephone	= r.Form["telephone"][0]

		school.Name		= r.Form["schoolname"][0]

		addressSchool.StreetAndNumber	= r.Form["schooladdress"][0]


		//Insert address patient
		err := db.QueryRow("INSERT INTO addresses (street_and_number,neighberhood,telephone) VALUES($1,$2,$3) returning id;", addressPatient.StreetAndNumber, addressPatient.Neighberhood, addressPatient.Telephone ).Scan(&patient.AddressId)
		checkErr(err)

		//Insert address school
		err = db.QueryRow("INSERT INTO addresses (street_and_number) VALUES($1) returning id;", addressSchool.StreetAndNumber ).Scan(&school.AddressId)
		checkErr(err)

		//Insert school
		err = db.QueryRow("INSERT INTO schools (name,address) VALUES($1,$2) returning id;", school.Name, school.AddressId ).Scan(&patient.SchoolId)
		checkErr(err)

		//Insert patient
		err = db.QueryRow("INSERT INTO patients (created, updated, fullname, nickname, gender, birthdate, siblings, lives_with, address_id, school_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning id;", patient.Created, patient.Updated, patient.FullName, patient.NickName, patient.Gender, patient.BirthDate, patient.Sibilings, patient.LivesWith, patient.AddressId, patient.SchoolId ).Scan(&patient.Id)
		checkErr(err)

	}
}



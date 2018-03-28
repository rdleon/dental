package main

import (
	"fmt"
	_ "github.com/lib/pq"
	"time"
	"html/template"
	"net/http"
	//"strings"
	//"strconv"
	"reflect"
	"database/sql"
	"encoding/json"
	"io/ioutil"
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

type Parent struct{
	Id		int
	FullName	string
	Ocupation	string
	MaritalStatusId	string	//Cuando cacha el id cuando se hace insert es un string
	AddressId	string	//Cuando cacha el id cuando se hace insert es un string
}

type MedicalHistory struct{
	PatientId		string //Cuando cacha el id cuando se hace insert es un string
	Creation		time.Time
	Doctor			string
	DoctorTelephone		string
	GestationWeeks		int
	BirthType		int
	BirthHeight		int
	BirthWeight		int
	CurrentWeight		int
	Surgeries		string //Cuando cacha el id cuando se hace insert es un string
	BloodTransfusions	string //Cuando cacha el id cuando se hace insert es un string
	Treatments		string //Cuando cacha el id cuando se hace insert es un string
}

type JSONPatient struct {
	Patientfullname	string `json:"patientfullname"`
        Patientnickname	string `json:"patientnickname"`
        Patientgender	string `json:"patientgender"`
        Patientbirthday	string `json:"patientbirthday"`
}
type JSONParent struct {
	Fatherfullname	string `json:"fatherfullname"`
        Fatherocupation	string `json:"fatherocupation"`
        Motherfullname	string `json:"motherfullname"`
        Motherocupation string `json:"motherocupation"`
        Parentmarital	string `json:"parentmarital"`
        Liveswith	string `json:"liveswith"`
        Sibilings	string `json:"sibilings"`
        Streetandnumber string `json:"streetandnumber"`
        Neighberhood	string `json:"neighberhood"`
        Telephone	string `json:"telephone"`
        Schoolname	string `json:"schoolname"`
        Schooladdress	string `json:"schooladdress"`
}
/*type JSONChronics struct {
	Test string
}*/
type JSONHistory struct {
	Mhdoctor		 string `json:"mhdoctor"`
        Mhdoctortelephone	 string `json:"mhdoctortelephone"`
        Gestationweeks		 string `json:"gestationweeks"`
        Birthtype		 string `json:"birthtype"`
        Birthheight		 string `json:"birthheight"`
        Birthweight		 string `json:"birthweight"`
        Currentweight		 string `json:"currentweight"`
        Surgeries		 string `json:"surgeries"`
        Bloodtransfusions	 string `json:"bloodtransfusions"`
        Treatments		 string `json:"treatments"`
}
type JSONPreviousHistory struct {
	Firsvisit		string `json:"firsvisit"`
        Birthtype		string `json:"birthtype"`
        Cooperation		string `json:"cooperation"`
        Dentalpain		string `json:"dentalpain"`
        Notesdentalpain		string `json:"notesdentalpain"`
        Highchdiet		string `json:"highchdiet"`
        Noteshighchdiet		string `json:"noteshighchdiet"`
        Biberon			string `json:"biberon"`
        Biberonlastused		string `json:"biberonlastused"`
        Biberonliquids		string `json:"biberonliquids"`
        Pacifierfrecuency	string `json:"pacifierfrecuency"`
        Floos			string `json:"floos"`
        Lastflourapp		string `json:"lastflourapp"`
        Flourinwater		string `json:"flourinwater"`
        Badhabits		string `json:"badhabits"`
}
type JSONCompleteHistory struct {
	Patient		JSONPatient `json:"patient"`
	Parent		JSONParent `json:"parent"`
	History		JSONHistory `json:"history"`
	Chronics	[]int `json:"chronics"`
	PreviousHistory	JSONPreviousHistory `json:"previoushistory"`
}

func SqlRowsToSlice( rows *sql.Rows ){
	//var s string
	for rows.Next(){
		columns, _ := rows.Columns()
		b := reflect.TypeOf(columns)
		fmt.Println(b)
		fmt.Println(columns)
		fmt.Println(reflect.TypeOf(rows))
	}
}

func AddPatient(w http.ResponseWriter, r *http.Request){

	if r.Method == "GET" {
		t := template.New("historialformulario") // Create a template.
		t, _ = t.ParseFiles("public/login.html")
		t.Execute(w, "historialformulario")
		rows, err := db.Query("SELECT * FROM addresses")
		checkErr(err)
		/*type notasarray struct{
			id	string
			san	string
			neig	string
			tel	string
		}*/
		SqlRowsToSlice(rows)
	} else {

		decoder := json.NewDecoder(r.Body)
		bodyBuffer, _ := ioutil.ReadAll(r.Body)
		//bodyString := string(bodyBuffer)
		//bodyBuffer2, _ := ioutil.ReadAll(decoder)
		fmt.Println("jjjjjjjjjjjjjjjjj")
		fmt.Println( bodyBuffer )
		//fmt.Println( bodyString )
		fmt.Println("jjjjjjjjjjjjjjjjj")
		var t JSONCompleteHistory
		err := decoder.Decode(&t)
		//fmt.Println(err.Error())
		if err != nil {
			 panic(err)
		}
		fmt.Println("MMM")
		defer r.Body.Close()
		fmt.Println(t)
		/*var patient		Patient
		var school		School
		var addressPatient	Address
		var addressSchool	Address
		var parent		Parent
		var mh			MedicalHistory

		r.ParseForm()

		//Paciente
		patient.Created		= time.Now()
		patient.Updated		= time.Now()
		patient.FullName	= r.Form["fullname"][0]
		patient.NickName	= r.Form["nickname"][0]
		patient.Gender, _	= strconv.Atoi(r.Form["gender"][0])
		patient.BirthDate, _	= time.Parse("02/01/2006",r.Form["birthday"][0])
		patient.Sibilings, _	= strconv.Atoi(r.Form["sibilings"][0])
		patient.LivesWith	= r.Form["liveswith"][0]

		addressPatient.StreetAndNumber	= r.Form["streetandnumber"][0]
		addressPatient.Neighberhood	= r.Form["neighberhood"][0]
		addressPatient.Telephone	= r.Form["telephone"][0]

		school.Name		= r.Form["schoolname"][0]

		addressSchool.StreetAndNumber	= r.Form["schooladdress"][0]

		//Padres
		parent.FullName		= r.Form["parentfullname"][0]
		parent.Ocupation	= r.Form["parentocupation"][0]
		parent.MaritalStatusId	= r.Form["parentmarital"][0]
		//parent.AddressId	= r.Form["parentaddress"][0]	//Uso la direccion del paciente

		//Historial medico
		mh.Creation, _		= time.Parse("02/01/2006", r.Form["mhcreation"][0])
		mh.Doctor		= r.Form["mhdoctor"][0]
		mh.DoctorTelephone	= r.Form["mhdoctortelephone"][0]
		mh.GestationWeeks, _	= strconv.Atoi(r.Form["gestationweeks"][0])
		mh.BirthType, _		= strconv.Atoi(r.Form["birthtype"][0])
		mh.BirthHeight, _	= strconv.Atoi(r.Form["birthheight"][0])
		mh.BirthWeight, _	= strconv.Atoi(r.Form["birthweight"][0])
		mh.CurrentWeight, _	= strconv.Atoi(r.Form["currentweight"][0])

		//Notas	historial medico
		surgeries		:= r.Form["surgeries"][0]
		bloodTransfusions	:= r.Form["bloodtransfusions"][0]
		treatments		:= r.Form["treatments"][0]

		//Chronics
		chronics := r.Form["chronics"]


		fmt.Println( chronics )
		fmt.Println(r.Form["birthday"][0])

								/*** Pacientes ***//*
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

								/*** Padres/Pacientes ***//*
		//Insert parent
		err = db.QueryRow("INSERT INTO parents (fullname, ocupation, marital_status, address) VALUES($1,$2,$3,$4) returning id;", parent.FullName, parent.Ocupation, parent.MaritalStatusId, patient.AddressId ).Scan(&parent.Id)
		checkErr(err)

		//Insert relation patient-parent
		db.QueryRow("INSERT INTO parents_children (patient_id, parent_id) VALUES($1,$2);", patient.Id, parent.Id )
		//checkErr(err)

								/*** Historial Medico ***//*
		//Insert note sugeries
		err = db.QueryRow("INSERT INTO notes (title, body, type) VALUES($1,$2,$3) returning id;", "Surgeries", surgeries, "surgeries").Scan(&mh.Surgeries)
		checkErr(err)

		//Insert note blood transfusions
		err = db.QueryRow("INSERT INTO notes (title, body, type) VALUES($1,$2,$3) returning id;", "Blood Transfusions", bloodTransfusions, "transfusions").Scan(&mh.BloodTransfusions)
		checkErr(err)

		//Insert note treatments
		err = db.QueryRow("INSERT INTO notes (title, body, type) VALUES($1,$2,$3) returning id;", "Treatments", treatments, "treatments").Scan(&mh.Treatments)
		checkErr(err)

		//Insert note medical_histories
		db.QueryRow("INSERT INTO medical_histories (patient_id, creation, doctor, doctor_telephone, gestation_weeks, birth_type, birth_height, birth_weight, current_weight, surgeries, blood_transfusions, treatments) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)", patient.Id, mh.Creation, mh.Doctor, mh.DoctorTelephone, mh.GestationWeeks, mh.BirthType, mh.BirthHeight, mh.BirthWeight, mh.CurrentWeight, mh.Surgeries, mh.BloodTransfusions, mh.Treatments)
		checkErr(err)

								/*** Chronics ***/
		//db.QueryRow("INSERT INTO ")
	}
}

/*
func rowToSlice( ){
	var s []
}
*/



//Cuantos padres? y su insert otro padre y su relacion con el paciente
//Marital satatus OTHER, address(Id), marital(id) en la base de datos
//En historial medico las ultimas tres con id a notas
//Cuando se crea se copia desde papel?
// mhcreation hirtoy medical 

package main

import (
	"time"
)

type Patient struct {
	Id        int       `json:id`
	Created   time.Time `json:created`
	Updated   time.Time `json:updated`
	FullName  string    `json:fullname`
	Nickname  string    `json:nickname`
	Gender    int       `json:gender`
	BirthDate time.Time `json:birthdate`
	Sibilings int       `json:siblings`
	LivesWith string    `json:liveswith`
	Address   Address   `json:address`
	School    School    `json:school`
}

type Address struct {
	Id              int
	StreetAndNumber string
	Neighberhood    string
	Telephone       string
}

type School struct {
	Id        int
	Name      string
	AddressId string //Cuando cacha el id cuando se hace insert es un string
}

type Parent struct {
	Id              int
	FullName        string
	Ocupation       string
	MaritalStatusId string //Cuando cacha el id cuando se hace insert es un string
	AddressId       string //Cuando cacha el id cuando se hace insert es un string
}

type MedicalHistory struct {
	PatientId         string //Cuando cacha el id cuando se hace insert es un string
	Creation          time.Time
	Doctor            string
	DoctorTelephone   string
	GestationWeeks    int
	BirthType         int
	BirthHeight       int
	BirthWeight       int
	CurrentWeight     int
	Surgeries         []string //Cuando cacha el id cuando se hace insert es un string
	BloodTransfusions []string //Cuando cacha el id cuando se hace insert es un string
	Treatments        []string //Cuando cacha el id cuando se hace insert es un string
}

func Load(patient_id int) (patient Patient, err error) {
	return
}

func (p Patient) Save() {
}

CREATE TABLE cat_gender(
	id SERIAL PRIMARY KEY,
	gender VARCHAR(10)
)
INSER INTO cat_gender ("female")
INSER INTO cat_gender ("male")


CREATE TABLE addresses(
	id 			SERIAL PRIMARY KEY,
	street_and_number 	VARCHAR(56),
	neighberhood 		VARCHAR(56),
	telephone 		VARCHAR(16)
)

CREATE TABLE schools(
	id 	SERIAL PRIMARY KEY,
	name 	VARCHAR(40),
	address INTEGER REFERENCES addresses (id)
)

CREATE TABLE parents(
	id 		SERIAL PRIMARY KEY,
	spouse		*
	fullname	VARCHAR(64)
	ocupation	VARCHAR(64)
	marital_status	*
	address		INTEGER REFERENCES addresses (id)
)

CREATE TABLE parentschildren(
	children_id	INTEGER REFERENCES patient_id (id),
	parent_id	INTEGER REFERENCES parents (id)
)

CREATE TABLE patients (
    id 		SERIAL PRIMARY KEY,
    created 	DATE,
    updated	DATE,
    fullname 	VARCHAR(56),
    nickname 	VARCHAR(40),
    gender 	INTEGER REFERENCES cat_gender (id),
    birthdate	DATE,
    siblings 	INTEGER,
    lives_with 	(Catalog: [Parent 1, Parent 2, Both, Other]),
    address_id 	INTEGER REFERENCES addresses (id)
    school_id	INTEGER REFERENCES schools (id)	
)


CREATE TABLE notes(
	id 	SERIAL PRIMARY KEY,
	title 	VARCHAR(40),
	body 	VARCHAR(1056),
	type 	INTEGER *
)

CREATE TABLE cat_birth_type(
	id 	SERIAL PRIMARY KEY,
	type	VARCHAR(24)
)

CREATE TABLE medicalhistories(
    patient_id 		INTEGER,
    creation 		DATE,
    doctor 		VARCHAR(56),
    doctor_telephone 	VARCHAR(16),
    gestation_weeks 	INTEGER,
    birth_type 		INTEGER REFERENCES cat_birth_type (id),
    birth_height 	INTEGER,
    birth_weight 	INTEGER,
    current_weight 	INTEGER,
    cirguries 		(relation: Notes)***,
    blood_transfusions 	(relation: Notes),
    treatments 		(relation: Notes)
)

CREATE TABLE patientchronics(
    patient_id 	INTEGER REFERENCES patients (id),
    disease_id 	(relation: Chronics),*
    notes 	(relation: Notes)
)

CREATE TABLE prevdentalhistory
    patient_id			INTEGER REFERENCES patients (id),
    first_visit 		BOOLEAN,
    visit_notes 		(relation: Notes)*,
    cooperation 		BOOLEAN,
    dental_pain 		BOOLEAN,
    dental_pain_notes 		(relation: Notes)*
    high_ch_diet		BOOLEAN
    high_ch_diet_notes 		(relation: Notes)*
    biberon 			BOOLEAN
    biberon_last_used 		INTEGER
    biberon_liquids 		(relation: Notes)*
    pacifier_frequency 		INTEGER
    breast_fed 			BOOLEAN
    brush_frequency 		INTEGER
    floss 			BOOLEAN
    last_flour_application 	DATE
    flour_in_wather 		(relation: Notes)*
    bad_habits 			(relation: Notes)*
)

CREATE TABLE vaccines(
	id 	SERIAL PRIMARY KEY,
	name 	VARCHAR(40)
)

CREATE TABLE patientvaccines(
	patient_id 	INTEGER REFERENCES patients (id),
   	vaccine_id 	INTEGER REFERENCES vaccines (id)
)

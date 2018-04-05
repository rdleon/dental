CREATE TABLE cat_gender(
	id SERIAL PRIMARY KEY,
	gender VARCHAR(10)
);
INSERT INTO cat_gender (gender) VALUES ('female'), ('male');


CREATE TABLE addresses(
	id 			SERIAL PRIMARY KEY,
	city			VARCHAR(28),
	street_and_number 	VARCHAR(56),
	neighberhood 		VARCHAR(56),
	telephone 		VARCHAR(64)
);

CREATE TABLE schools(
	id 	SERIAL PRIMARY KEY,
	name 	VARCHAR(40),
	grade	VARCHAR(40),
	turn	VARCHAR(40)
);

CREATE TABLE others(
	id 	SERIAL PRIMARY KEY,
	name 	text
);

CREATE TABLE patients (
	id 		SERIAL PRIMARY KEY,
	created 	DATE,
	updated		DATE,
	fullname 	VARCHAR(56),
	nickname 	VARCHAR(40),
	gender 		INTEGER REFERENCES cat_gender (id),
	birthdate	DATE,
	siblings 	INTEGER,
	number_child	INTEGER,
	lives_with 	VARCHAR(40),
	address_id 	INTEGER REFERENCES addresses (id),
	school_id	INTEGER REFERENCES schools (id)	
);

CREATE TABLE cat_marital_status(
	id 		SERIAL PRIMARY KEY,
	marital_status	VARCHAR(32),
	system		BOOLEAN
);
INSERT INTO cat_marital_status (marital_status, system) VALUES ('Married',True),('Divorced',True),('Single',True),('Widowed',True);

CREATE TABLE parents(
	id 		SERIAL PRIMARY KEY,
	fullname	VARCHAR(64),
	ocupation	VARCHAR(64),
	marital_status	INTEGER REFERENCES cat_marital_status (id),
	address		INTEGER REFERENCES addresses (id)
);

CREATE TABLE parents_children(
	patient_id	INTEGER REFERENCES patients (id),
	parent_id	INTEGER REFERENCES parents (id)
);

CREATE TABLE notes(
	id 	SERIAL PRIMARY KEY,
	title 	VARCHAR(40),
	body 	VARCHAR(1056),
	type 	VARCHAR(40)
);

CREATE TABLE cat_birth_type(
	id 	SERIAL PRIMARY KEY,
	type	VARCHAR(24)
);
INSERT INTO cat_birth_type (type) VALUES ('Natural'), ('C-section'), ('Other');

CREATE TABLE medical_histories(
	patient_id 		INTEGER,
	doctor 			VARCHAR(56),
	doctor_telephone 	VARCHAR(16),
	gestation_weeks 	INTEGER,
	birth_type 		INTEGER REFERENCES cat_birth_type (id),
	birth_height 		INTEGER,
	birth_weight 		INTEGER,
	current_height 		INTEGER,
	current_weight 		INTEGER,
	surgeries 		text,
	blood_transfusions 	text,
	treatments 		text
);

CREATE TABLE chronics(
	id 	SERIAL PRIMARY KEY,
	chronic	text
);
INSERT INTO chronics (chronic) VALUES ('Alergias'), ('Anemas'), ('Artitris'), ('Asma'), ('Cáncer'), ('Convulsiones'), ('Diabetes'), ('Escarlatina'), ('Enfermedades cardiacas'), ('Fibrosis Quística'), ('Fiebre reumática'), ('Hemofilia'), ('Hepatitis'), ('Hiperactividad'), ('HIV'), ('Leucemia'), ('Neumonía'), ('Parálisis cerebral'), ('Parotiditis'), ('Problemas auditibos'), ('Problemas ortopédicos'), ('Problemas renales'), ('Problema en los ojos'), ('Retraso psicomotor'), ('Sarampión'), ('Síndrome'), ('Soplo cardiaco'), ('Varicela');

CREATE TABLE patient_chronics(
	patient_id 	INTEGER REFERENCES patients (id),
	disease_id 	INTEGER REFERENCES chronics (id),
);

CREATE TABLE observations(
	patient_id 	INTEGER REFERENCES patients (id),
	notes	 	INTEGER REFERENCES notes (id),
	asa_patient	VARCHAR(16)
);

CREATE TABLE bad_habits(
	id  		SERIAL PRIMARY KEY,
	patient_id	INTEGER REFERENCES patients (id),
	name		text,
	frequency	INTEGER,
	duration	INTEGER,
	intensity	INTEGER
)

CREATE TABLE prev_dental_history(
	patient_id		INTEGER REFERENCES patients (id),
	first_visit 		BOOLEAN,
	visit_notes 		INTEGER REFERENCES notes (id),
	cooperation 		BOOLEAN,
	dental_pain 		BOOLEAN,
	dental_pain_notes 	text,
	balanced_diet		BOOLEAN,
	high_ch_diet		BOOLEAN,
	high_ch_diet_notes 	text,
	biberon 		BOOLEAN,
	biberon_last_used 	INTEGER,
	biberon_liquids 	text,	
	biberon_frequency 	INTEGER,
	pacifier		BOLLEAN,
	pacifier_frequency 	INTEGER,
	breast_fed 		BOOLEAN,	
	brush_frequency		INTEGER,
	floss			BOOLEAN,
	flour_in_wather		BOOLEAN,
	where_flour_in_wather 	text,
	flour_aplication	BOOLEAN,
	last_flour_application	DATE
);

CREATE TABLE vaccines(
	id 	SERIAL PRIMARY KEY,
	name 	VARCHAR(40),
	system	BOOLEAN
);
INSERT INTO vaccines (name, system) VALUES ('BCG', true), ('DPT', true), ('Polio', true), ('Triple', true);

CREATE TABLE patient_vaccines(
	patient_id 	INTEGER REFERENCES patients (id),
   	vaccine_id 	INTEGER REFERENCES vaccines (id)
);

CREATE TABLE consult(
	patient_id 	INTEGER REFERENCES patients (id),
	reason		text,
	referred	text
)

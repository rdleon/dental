# Encuesta inicial

Estos son los campos que llenará el paciente para la encuesta inicial.

Información del paciente:

Table Patients
     - Id (serial)
     - created (date)
     - updated (date)
     - fullname (string)
     - nickname (string)
     - gender (Catalog: [Male, Female])
     - birthdate (date)
     - siblings (int)
     - patient potition, in siblings (int)
     - lives_with (Catalog: [Parent 1, Parent 2, Both, Other])
     - address_id (relation: Addresses)
     - school_id (relation: Schools)

Table ParentsChildren

     - children_id (relation: Patients)
     - parent_id (relation: Parents)

Table Parents
     - id (serial)
     - spouse (self-relation?)
     - full name (string)
     - ocupation (string)
     - marital_status (Catalog: [Married, Divorced, Single, Widowed])
     - Address (relation: Addresses)

Table Addresses
     - id (serial)
     - Street and number (string)
     - Neighberhood (string)
     - telephone (string)

Table Schools
     - id (serial)
     - name (string)
     - address (relation: Addresses)

Table Notes
     - id (serial)
     - title (string)
     - body (string)
     - type (catalog: [School, Cirguries, blood_transfusions, Disease, Visit, Other])

Información de historial médico

Table MedicalHistories
     - patient_id (relation: Patients)
     - creation (date)
     - doctor (string)
     - doctor_telephone (string)
     - gestation_weeks (int)
     - birth_type (catalog: [Natural, C-section, other])
     - birth_height (int)
     - birth_weight (int)
     - current_weight (int) 
     - cirguries (relation: Notes)
     - blood_transfusions (relation: Notes)
     - treatments (relation: Notes)

Table PatientChronics [OneToMany]
     - patient_id (relation: Patients)
     - disease_id (relation: Chronics)
     - notes (relation: Notes)

Table Chronics
     - id (serial)
     - name (string)

Table PrevDentalHistory
     - patient_id (relation: Patients)
     - first_visit (boolean)
     - visit_notes (relation: Notes)
     - cooperation (boolean)
     - dental_pain (boolean)
     - dental_pain_notes (relation: Notes)
     - high_ch_diet (boolean)
     - high_ch_diet_notes (relation: Notes)
     - biberon (boolean)
     - biberon_last_used (int)
     - biberon_liquids (relation: Notes)
     - pacifier_frequency (int)
     - breast_fed (boolean)
     - brush_frequency (int)
     - floss (boolean)
     - last_flour_application (date)
     - flour_in_wather (relation: Notes)
     - bad_habits (relation: Notes)

Table Vaccines
     - id (serial)
     - name (string)

Table PatientVaccines [OneToMany]
     - patient_id (relation: Patients)
     - vaccine_id (relation: Vaccines)

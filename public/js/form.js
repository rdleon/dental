'use strict';

function activetab(evt, idsection) {
	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		//console.log( tablinks[i].className)
		tablinks[i].className = tablinks[i].className.replace(" activeTab", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(idsection).style.display = "block";
	evt.currentTarget.className += " activeTab";
}

function nexttab(evt){

	var tabs = {
		"tab1" : "tab2",
	    	"tab2" : "tab3",
	    	"tab3" : "tab4",
	    	"tab4" : "tab5",
	    	"tab5" : "tab6",
	    	"tab6" : "tab1"
	        }
	var tablinks = document.getElementsByClassName("tablinks");
	for (var i = 0; i < tablinks.length; i++) {
		if (tablinks[i].className.includes("activeTab")){
	    		//console.log(tabs[tablinks[i].id])
			//var bgElement = document.getElementById("bg")
			//var bgBounding = bgElement.getBoundingClientRect();
			document.getElementById(tabs[tablinks[i].id]).click();
			//console.log(bgElement.y)
			scroll(0, 0)
	    		break;
	    	}
	}
}

function addvaccines(){
	
	var badhabitsDiv =  document.getElementById("extravaccines");
	var divcontent = document.createElement('div');
	divcontent.setAttribute("name", "extravaccinescontent");
	var divs = '<div class="fieldcontainer">' +
		   	'<label  class="labeldental" >Vacuna:</label>'+				
		   	'<input type="text" class="textbox" name="whereflourinwater" id="whereflourinwater" ><br>'+
	           '</div>';
	
	divcontent.innerHTML = divs;

	badhabitsDiv.appendChild(divcontent)

}

var habitos = [];

function addbadhabit(){
	
	var badhabitsDiv =  document.getElementById("badhabits");
	habitos.push(1);
	var numero = habitos.length;
	var divcontent = document.createElement('div');
	divcontent.setAttribute("name", "badhabitscontent");
	var divs = '<div class="sectiondiv2"><span>Hábito '+ numero +'</span></div>' +
		   '<div class="fieldcontainer">' +
		   	'<label  class="labeldental" >¿Cuál?:</label>'+				
		   	'<input type="text" class="textbox" name="whereflourinwater" id="whereflourinwater" ><br>'+
	           '</div>' +
		   '<div class="fieldcontainer">' +
			'<label  class="labeldental" >Frecuencia:</label>'+				
			'<input type="text" class="textbox" name="whereflourinwater" id="whereflourinwater" ><br>'+
	           '</div>' +
		   '<div class="fieldcontainer">' +
		   	'<label  class="labeldental" >Duración:</label>'+				
		   	'<input type="text" class="textbox" name="whereflourinwater" id="whereflourinwater" ><br>'+
	           '</div>' +
		   '<div class="fieldcontainer">' +
		   	'<label  class="labeldental" >Intensidad:</label>'+				
		   	'<input type="text" class="textbox" name="whereflourinwater" id="whereflourinwater" ><br>' +
	           '</div>';
	
	divcontent.innerHTML = divs;

	badhabitsDiv.appendChild(divcontent)

}

function selectother(selected, idElementDisplay){
	if( selected.selectedOptions[0].value == "other" ){
		var otherSelected = document.getElementById( idElementDisplay );
		otherSelected.style.display = "inline-block"
		otherSelected.focus();
	}else{
		var otherSelected = document.getElementById( idElementDisplay );
		otherSelected.style.display = "none"
	}
}

function radioandshow( display, idElementDisplay){
	if( display == "show" ){
		var elementDisiplay = document.getElementById( idElementDisplay );
		elementDisiplay.style.display = "block";
		elementDisiplay.getElementsByTagName("input")[0].focus();
	}else{
		var elementDisiplay = document.getElementById( idElementDisplay );
		elementDisiplay.style.display = "none";
	}
}

function valorParaNull(obj) {
	if( obj === null)
		return 0
}

function guardar(evt){

	evt.preventDefault();

	var chronicssel	= document.getElementsByName("chronics");
	var chronics	= [];
	for( var i=0; i<chronicssel.length; i++ ){
		if( chronicssel[i].checked){
			chronics.append( chronicssel[i].value )
		}
	}

	/*
	var firsvisit   		= document.querySelector('input[name="firsvisit"]:checked'	);firsvisit = valorParaNull(firsvisit);
	var visitnotes   		= document.getElementById("visitnotes"			 	).value;
	var cooperation 		= document.querySelector('input[name="cooperation"]:checked'	);cooperation = valorParaNull(cooperation);
	var dentalpain 			= document.querySelector('input[name="dentalpain"]:checked'	);dentalpain = valorParaNull(dentalpain);
	var notesdentalpain 		= document.getElementById("notesdentalpain"			).value;
	var highchdiet 			= document.querySelector('input[name="highchdiet"]:checked'	);highchdiet = valorParaNull(highchdiet);
	var noteshighchdiet 		= document.getElementById("noteshighchdiet"			).value;
	var biberon 			= document.querySelector('input[name="biberon"]:checked'	);biberon = valorParaNull(biberon);
	var biberonlastused   		= document.getElementById("biberonlastused"			).value;
	var biberonliquids   		= document.getElementById("biberonliquids"			).value;
	var pacifierfrecuency   	= document.getElementById("pacifierfrecuency"			).value;
	var floos 			= document.querySelector('input[name="floos"]:checked'		);floos = valorParaNull(floos);
	var lastflourapp   		= document.getElementById("lastflourapp"			).value;
	var flourinwater   		= document.getElementById("flourinwater"			).value;
	var badhabits      		= document.getElementById("badhabits"				).value;


chupon
frecuencia biberon
frecuecia cepilla  
ha recibido aplicación flour
motivo de la visita

	*/


    var patient = {
	"fullname"  : document.getElementById("fullname").value,
        "nickname"  : document.getElementById("nickname").value,
        "gender"    : parseInt(document.getElementById("gender").value),
        "birthdate" : new Date( parseInt(document.getElementById("birthdayyear").value), parseInt(document.getElementById("birthdaymonth").value)-1,  parseInt(document.getElementById("birthdayday").value )).toISOString(),
        "sibilings" : parseInt(document.getElementById("sibilings").value),
        "liveswith" : document.querySelector('input[name="liveswith"]:checked'),
	"father": {
		"fullname": document.getElementById("fatherfullname").value,
		"ocupation": document.getElementById("fatherocupation"	).value,
		"maritalstatus": document.getElementById("parentmarital").value
	},
	"mother": {
		"fullname": document.getElementById("fatherfullname").value,
		"ocupation": document.getElementById("fatherocupation").value,
		"maritalstatus": document.getElementById("parentmarital").value

	},
        "address"   : {
		"streetandnumber":  document.getElementById("streetandnumber").value,
		"city":  document.getElementById("city").value,
		"neighberhood": document.getElementById("neighberhood").value,
		"telephone": document.getElementById("telephone").value
	},
        "school"    : {
		"name": document.getElementById("schoolname").value
	},
	"medicalhistory":{
			"doctor"		:document.getElementById("mhdoctor"		).value,
                        "telephone"		:document.getElementById("mhdoctortelephone"	).value,
                        "gestationweeks"	:document.getElementById("gestationweeks"	).value,
                        "birthtypw"		:document.getElementById("birthtype"		).value,
                        "birthheight"		:document.getElementById("birthheight" 		).value,
                        "birthweight"		:document.getElementById("birthweight" 		).value,
                        "currentheight"		:document.getElementById("currentheight" 	).value,
                        "currentweight"		:document.getElementById("currentweight" 	).value,
                        "surgeries"		:document.getElementById("surgeries" 		).value,
                        "bloodtransfusions"	:document.getElementById("bloodtransfusions" 	).value,
                        "treatments"		:document.getElementById("treatments" 		).value

	},
	"chronics": chronics,
	"historymedicalprev": {
		"firsvisit"		: document.querySelector('input[name="firsvisit"]:checked'	),
	        "visitnotes"		: document.getElementById("visitnotes"			 	).value,
		"cooperation"		: document.querySelector('input[name="cooperation"]:checked'	),
		"dentalpain"		: document.querySelector('input[name="dentalpain"]:checked'	),
	        "notesdentalpain"	: document.getElementById("notesdentalpain"			).value,
		"balanceddiet"		: "",
	        "highchdiet"		: document.querySelector('input[name="highchdiet"]:checked'	),
	        "noteshighchdiet"	: document.getElementById("noteshighchdiet"			).value,
	        "biberon"		: document.querySelector('input[name="biberon"]:checked'	),
	        "biberonlastused"	: document.getElementById("biberonlastused"			).value,
	        "biberonliquids"	: document.getElementById("biberonliquids"			).value,
		"biberonfrecuency"	: "",
		"pacifier"		: "",
	        "pacifierfrecuency"	: document.getElementById("pacifierfrecuency"			).value,
		"breastfed"		: "",
		"brushfrecuency"	: "",
	        "floos"			: document.querySelector('input[name="floos"]:checked'		),
	        "flourinwater"		: document.getElementById("flourinwater"			).value,
		"whereflourinwater"	: "",
		"flour"			: "",
	        "lastflourapp"		: document.getElementById("lastflourapp"			).value,
	        "badhabits"		: document.getElementById("badhabits"				).value	
	}		

    };

	//var fatherfullname  		= 
	//var fatherocupation 		= 
	//var parentmarital   		= document.getElementById("parentmarital").value;//select
	//var liveswith       		= document.querySelector('input[name="liveswith"]:checked');liveswith = valorParaNull(liveswith)
	//var sibilings       		= document.getElementById("sibilings"		).value;
	//var streetandnumber 		= document.getElementById("streetandnumber"	).value;
	//var neighberhood    		= document.getElementById("neighberhood"	).value;
	//var telephone       		= document.getElementById("telephone"		).value;
	//var schoolname      		= document.getElementById("schoolname"		).value;
	var schooladdress   		= document.getElementById("schooladdress"	).value;

	//var mhdoctor   			= document.getElementById("mhdoctor"		).value;
	//var mhdoctortelephone   	= document.getElementById("mhdoctortelephone"	).value;
	//var gestationweeks   		= document.getElementById("gestationweeks"	).value;
	//var birthtype   		= document.getElementById("birthtype"		).value;//select
	//var birthheight   		= document.getElementById("birthheight" 	).value;
	//var birthweight   		= document.getElementById("birthweight" 	).value;
	//var currentweight   		= document.getElementById("currentweight" 	).value;
	//var surgeries   		= document.getElementById("surgeries" 		).value;
	//var bloodtransfusions  		= document.getElementById("bloodtransfusions" 	).value;
	//var treatments   		= document.getElementById("treatments" 		).value;
	
	/*
	var chronicssel	= document.getElementsByName("chronics");
	var chronics	= [1];
	for( var i=0; i<chronicssel.length; i++ ){
		if( chronicssel[i].checked){
			chronics.append( chronicssel[i].value )
		}
	}
	*/

	var xhr = new XMLHttpRequest();
	var url = "/patients";
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send( JSON.stringify(patient) );

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.responseText);
        }
    };

	xhr.onloadend = function () {
    		console.log( patient )
  	};

}


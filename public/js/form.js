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
	if( selected.selectedOptions[0].value == "0" ){
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

function radiohideshow( idElementDisplay, idElementHide){
	var elementShow = document.getElementById( idElementDisplay );
	elementShow.style.display = "block";
	elementShow.getElementsByTagName("input")[0].focus();
	var elementHide = document.getElementById( idElementHide );
	elementHide.style.display = "none";
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
			chronics.push( chronicssel[i].value )
		}
	}

	var vaccinessel	= document.getElementsByName("vaccines");
	var vaccines	= [];
	for( var i=0; i<vaccinessel.length; i++ ){
		if( vaccinessel[i].checked){
			vaccines.push( vaccinessel[i].value )
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

	*/

    var gestationweeks = parseInt(document.getElementById("gestationweeks").value) * parseFloat(document.getElementById("weeksormonthsgestation").value);

    var patient = {
	"fullname"  : document.getElementById("fullname").value,
        "nickname"  : document.getElementById("nickname").value,
        "gender"    : parseInt(document.getElementById("gender").value),
        "birthdate" : new Date( parseInt(document.getElementById("birthdayyear").value), parseInt(document.getElementById("birthdaymonth").value)-1,  parseInt(document.getElementById("birthdayday").value )).toISOString(),
        "sibilings" : parseInt(document.getElementById("sibilings").value),
	"childnumber" : parseInt(document.getElementById("childnumber").value),
	"reasonconsult": document.getElementById("reasonconsult").value,
	"referredby":document.getElementById("referredby").value,
        "liveswith" : {
		"valueid" : parseInt(document.getElementById("liveswith").value),
		"othervalue": document.getElementById("otherliveswith").value	
	},
	"father": {
		"fullname": document.getElementById("fatherfullname").value,
		"ocupation": document.getElementById("fatherocupation"	).value,
		"maritalstatus":{
			"valueid": parseInt(document.getElementById("parentmarital").value),
			"othervalue": document.getElementById("otherparentmarital").value
		}

	},
	"mother": {
		"fullname": document.getElementById("fatherfullname").value,
		"ocupation": document.getElementById("fatherocupation").value,
		"maritalstatus": {
			"valueid": parseInt(document.getElementById("parentmarital").value),
			"othervalue": document.getElementById("otherparentmarital").value
		}

	},
        "address"   : {
		"streetandnumber":  document.getElementById("streetandnumber").value,
		"city":  document.getElementById("city").value,
		"neighberhood": document.getElementById("neighberhood").value,
		"telephone": document.getElementById("telephone").value
	},
        "school"    : {
		"name": document.getElementById("schoolname").value,
		"gradeschool": document.getElementById("gradeschool").value,
		"turnschool": document.getElementById("turnschool").value
	},
	"medicalhistory":{
		"pediatrist"		:document.getElementById("pediatrist"		).value,
                "pediatristtelephone"	:document.getElementById("pediatristtelephone"	).value,
                "gestationweeks"	:gestationweeks,
                "birthtype"		:{
			"valueid"    : parseInt(document.getElementById("birthtype").value),
			"othervalue" : document.getElementById("otherbirthtype").value
		},
                "birthheight"   	:parseFloat(document.getElementById("birthheight" 	).value),
                "birthweight"   	:parseFloat(document.getElementById("birthweight" 	).value),
                "currentheight"		:parseFloat(document.getElementById("currentheight" 	).value),
                "currentweight"		:parseFloat(document.getElementById("currentweight" 	).value),
                "surgeries"		:document.getElementById("surgeries" 		).value,
                "bloodtransfusions"	:document.getElementById("bloodtransfusions" 	).value,
                "treatments"		:document.getElementById("treatments" 		).value

	},
	"chronics": chronics,
	"historymedicalprev": {
		"firsvisit"		: document.querySelector('input[name="firsvisit"]:checked'	).value == "true",
	        "visitnotes"		: document.getElementById("visitnotes"			 	).value,
		"cooperation"		: document.querySelector('input[name="cooperation"]:checked'	).value == "true",
		"dentalpain"		: document.querySelector('input[name="dentalpain"]:checked'	).value == "true",
	        "notesdentalpain"	: document.getElementById("notesdentalpain"			).value,
		"balanceddiet"		: document.querySelector('input[name="balanceddiet"]:checked'	).value == "true",
	        "highchdiet"		: document.querySelector('input[name="highchdiet"]:checked'	).value == "true",
	        "noteshighchdiet"	: document.getElementById("noteshighchdiet"			).value,
	        "biberon"		: document.querySelector('input[name="biberon"]:checked'	).value == "true",
	        "biberonlastused"	: document.getElementById("biberonlastused"			).value,
	        "biberonliquids"	: document.getElementById("biberonliquids"			).value,
		"biberonfrecuency"	: document.getElementById("biberonfrecuency"			).value,
		"pacifier"		: document.querySelector('input[name="pacifier"]:checked'	).value == "true",
	        "pacifierfrecuency"	: document.getElementById("pacifierfrecuency"			).value,
		"breastfed"		: document.querySelector('input[name="breastfed"]:checked'	).value == "true",
		"brushfrecuency"	: document.getElementById("brushfrecuency"			).value,
	        "floos"			: document.querySelector('input[name="floos"]:checked'		).value == "true",
	        "flourinwater"		: document.querySelector('input[name="flourinwater"]:checked'	).value == "true",
		"whereflourinwater"	: document.getElementById("whereflourinwater"			).value,
		"flour"			: document.querySelector('input[name="flour"]:checked'		).value == "true",
	        "lastflourapp"		: document.getElementById("lastflourapp"			).value,
	        "badhabits"		: document.querySelector('input[name="badhabit1"]:checked'	).value == "true",	
	        "habitname"		: document.getElementById("habitname"				).value,
	        "habitfrequency"	: document.getElementById("habitfrequency"			).value,
	        "lastflourapp"		: document.getElementById("lastflourapp"			).value,
	        "habitintensity"	: document.getElementById("habitintensity"			).value
	},		
	"vaccines" : vaccines
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
	//var schooladdress   		= document.getElementById("schooladdress"	).value;

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


	aparence
	box-shadow
	outline
	-moz-appearance:none; /* Firefox 
    -webkit-appearance:none; /* Safari and Chrome 
    appearance:none;



	texto y seleccion de meses
	kgs y cms margin


	Evaluar cuando no se ingresa nada, por como lo recibe, si es que lo transforma con una funcion
	Cuando es de un Si o un No y se ingresa un texto
	Agregar otra vacuna


	*/

	console.log( JSON.stringify(patient) )

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

/*linear-gradient(to bottom,#563d7c 0,#6f5499 100%);*/

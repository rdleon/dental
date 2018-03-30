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
		"uno" : "dos",
	    	"dos" : "tres",
	    	"tres" : "cuatro",
	    	"cuatro" : "cinco",
	    	"cinco" : "uno"
	        }
	var tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		if (tablinks[i].className.includes("activeTab")){
	    		console.log(tabs[tablinks[i].id])
	    		document.getElementById(tabs[tablinks[i].id]).click();
	    		break;
	    	}
	}
}

function valorParaNull(obj) {
	if( obj === null)
		return 0
}

function guardar(evt){

	evt.preventDefault();

	var firsvisit   		= document.querySelector('input[name="firsvisit"]:checked'	);firsvisit = valorParaNull(firsvisit);
	var birthtype   		= document.getElementById("visitnotes"			 	).value;
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


    var patient = {
        "fullname": document.getElementById("fullname").value,
        "nickname": document.getElementById("nickname").value,
        "gender": parseInt(document.getElementById("gender").value)
//        "birthdate": document.getElementById("birthday").value
    };

	var fatherfullname  		= document.getElementById("fatherfullname" 	).value;
	var fatherocupation 		= document.getElementById("fatherocupation"	).value;
	var motherfullname  		= document.getElementById("motherfullname" 	).value;
	var motherocupation 		= document.getElementById("motherocupation"	).value;
	var parentmarital   		= document.getElementById("parentmarital"	).value;//select
	var liveswith       		= document.querySelector('input[name="liveswith"]:checked');liveswith = valorParaNull(liveswith)
	var sibilings       		= document.getElementById("sibilings"		).value;
	var streetandnumber 		= document.getElementById("streetandnumber"	).value;
	var neighberhood    		= document.getElementById("neighberhood"	).value;
	var telephone       		= document.getElementById("telephone"		).value;
	var schoolname      		= document.getElementById("schoolname"		).value;
	var schooladdress   		= document.getElementById("schooladdress"	).value;

	var mhdoctor   			= document.getElementById("mhdoctor"		).value;
	var mhdoctortelephone   	= document.getElementById("mhdoctortelephone"	).value;
	var gestationweeks   		= document.getElementById("gestationweeks"	).value;
	var birthtype   		= document.getElementById("birthtype"		).value;//select
	var birthheight   		= document.getElementById("birthheight" 	).value;
	var birthweight   		= document.getElementById("birthweight" 	).value;
	var currentweight   		= document.getElementById("currentweight" 	).value;
	var surgeries   		= document.getElementById("surgeries" 		).value;
	var bloodtransfusions  		= document.getElementById("bloodtransfusions" 	).value;
	var treatments   		= document.getElementById("treatments" 		).value;

	var chronicssel	= document.getElementsByName("chronics");
	var chronics	= [1];
	for( var i=0; i<chronicssel.length; i++ ){
		if( chronicssel[i].checked){
			chronics.append( chronicssel[i].value )
		}
	}


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


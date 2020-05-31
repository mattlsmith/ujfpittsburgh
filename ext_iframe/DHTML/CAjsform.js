var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");


// Revision: $Revision: 1.16 $

/*
	USAGE:
		<SCRIPT LANGUAGE="JavaScript" SRC="path to this file"></SCRIPT>
		<FORM onSubmit="return verify(this);">
	
	FIELD NAMING CONVENTION:
		If included, these fields are required:
			first, last, address, city, state, zip or azip, bzip, email country
		All other field names will be treated as optional
	
	Version 1.1 
	Last Revision 5/10/05 1:04PM
	Cyrus Murphy	
*/






//function errors() { return true; } 
//window.onerror = errors;


var noverify = false;

function verify (myform) {
	
	
	if(noverify) {
	
		return true;
	
	
	} 
	
	var msg			  = "";
	var toselect	  = "";
	var empty_fields = "";
	var errors       = "";
	var numempty	  = 0;
	var numerrors	  = 0;
	var has_required_text = 0;
	
	// Populates first name and last name values into variables firstName 
	// and lastName. These variables are then used to populatee the
	// "usrname" form field later on in the app under certain conditions.
	for (var count = 0; count < myform.length; count++) {
		var myElement = myform.elements[count];
		var myRegEx = /^static_message[0-9]+$/;
		if (myRegEx.test(myElement.name))
			has_required_text = 1;
		if (myElement.name == "first")
			var firstName = myElement.value;
		if (myElement.name == "last")
			var lastName = myElement.value;
	}
		
	
	// Check regexs and for empty fields
	for (var i = 0; i < myform.length; i++) {
		var e = myform.elements[i];
		
		// if the second argument is passed in check all select fields in form
		if(arguments.length == 2) {	
			if(e.type == "select-one" || e.type == "select") {
				if(e.selectedIndex == 0 && e.name != 'prefix') {
				 	if(e.name == 'issue' || e.name == 'issues') {
						errors += ("\n      Select an issue area");
					  	numerrors++;
						
					} else {
					     errors += ("\n          Select A Topic");
					     numerrors++;
					}

				}
			
			}
		}
		

		if(e.type == "select" || e.type == "select-one" && e.name == 'country') {
			if(myform.country && myform.country.selectedIndex == 0) {
			errors += ("\n      Select a Country");
			numerrors++;
			}
		}
		
		
		
		
		if ((e.type == "text") || (e.type == "textarea")) {
			if ((e.value == null) || (e.value == "")) {
				var regex = /^message[0-9]*$/;
				if (regex.test(e.name) && !has_required_text) {
					empty_fields += ("\n          Message Body");
                                        if (toselect == "") toselect = e.name;
                                        numempty++;
				}
				else {
				switch (e.name) {
					
					case "subject":
						empty_fields += ("\n          Subject");
						if (toselect == "") toselect = e.name;
						numempty++;
						break;
						
					case "first":
						empty_fields += ("\n          First Name");
						if (toselect == "") toselect = e.name;
						numempty++;
						break;
					case "name":
						empty_fields += ("\n          Name");
						if (toselect == "") toselect = e.name;
						numempty++;
						break;
					case "last":
						empty_fields += ("\n          Last Name");
						if (toselect == "") toselect = e.name;
						numempty++;
						break;
					case "searchlast":
						empty_fields += ("\n          Last Name");
						if (toselect == "") toselect = e.name;
						numempty++;
						break;
					case "address":
						empty_fields += ("\n          Address");
						if (toselect == "") toselect = e.name;
						numempty++;
						break;
					case "city":
						empty_fields += ("\n          City");
						if (toselect == "") toselect = e.name;
						numempty++;
						break;
					case "state":
						if(!myform.country) {
							empty_fields += ("\n          State");
							if (toselect == "") toselect = e.name;
							numempty++;
							break;
						} else if(myform.country && myform.country.selectedIndex == 1 && myform.country[1].value == 'USA') {
							empty_fields += ("\n          State/Province");
							if (toselect == "") toselect = e.name;
							numempty++;
							break;
						} else {
							break;
						}
					case "azip":
						if(myform.country && myform.country.selectedIndex == 1 && myform.country[1].value == 'USA') { 
							empty_fields += ("\n          Zip Code (5 digit only)");
						 	if (toselect == "") toselect = e.name;
							numempty++;
							break;
						} else if(!myform.country) {
							empty_fields += ("\n          Zip Code");
							if (toselect == "") toselect = e.name;
							numempty++;
							break;
						} else {
							break;
						}
					case "zip":
						empty_fields += ("\n          Zip Code");
						if (toselect == "") toselect = e.name;
						numempty++;
						break;
					case "email":
						empty_fields += ("\n          Email Address");
						if (toselect == "") toselect = e.name;
						numempty++;
						break;
					case "usrname": 
						//If first and last name form fields are not empty, then
						//populate the "usrname" field with that information.
						if ((firstName != "") && (lastName != ""))
							e.value = firstName + " " + lastName;
						break;
				}
				}
						

			} else if ((e.name == "first") && !(e.value.match(/[A-Za-z]+/))) {
				errors += ("\n          First Name");
				if (toselect == "") toselect = e.name;
				numerrors++;
			} else if ((e.name == "last") && !(e.value.match(/[A-Za-z]+/))) {
				errors += ("\n          Last Name");
				if (toselect == "") toselect = e.name;
				numerrors++;
			} else if ((e.name == "searchlast") && !(e.value.match(/[A-Za-z]+/))) {
				errors += ("\n          Last Name");
				if (toselect == "") toselect = e.name;
				numerrors++;
			} else if ((e.name == "city") && !(e.value.match(/[A-Za-z]+/))) {
				errors += ("\n          City");
				if (toselect == "") toselect = e.name;
				numerrors++;
			} else if ((e.name == "address") && !(e.value.match(/.+/))) {
				errors += ("\n          Last Name");
				if (toselect == "") toselect = e.name;
				numerrors++;
			} else if ((e.name == "state") && !(e.value.match(/^(AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY|AE|AA|AE|AE|AP)$/i))) {

				var fullstatename = e.value.toString();
				//fullstatename = e.value.replace(/\s/g, "");
				var matched = (fullstatename.match(/^(ALABAMA|ALASKA|AMERICAN SAMOA|ARIZONA|ARKANSAS|CALIFORNIA|COLORADO|CONNECTICUT|DELAWARE|DISTRICT OF COLUMBIA|FLORIDA|GEORGIA|GUAM|HAWAII|IDAHO|ILLINOIS|INDIANA|IOWA|KANSAS|KENTUCKY|LOUISIANA|MAINE|MARYLAND|MASSACHUSETTS|MICHIGAN|MINNESOTA|MISSISSIPPI|MISSOURI|MONTANA|NEBRASKA|NEVADA|NEW HAMPSHIRE|NEW JERSEY|NEW MEXICO|NEW YORK|NORTH CAROLINA|NORTH DAKOTA|OHIO|OKLAHOMA|OREGON|PENNSYLVANIA|PUERTO RICO|RHODE ISLAND|SOUTH CAROLINA|SOUTH DAKOTA|TENNESSEE|TEXAS|UTAH|VERMONT|VIRGIN ISLANDS|VIRGINIA|WASHINGTON|WEST VIRGINIA|WISCONSIN|WYOMING)$/i));
				matched = (matched)?true:false;
				if(!matched) {
					if((myform.country && myform.country.selectedIndex == 1 && myform.country[1].value == 'USA') || !e.value.match(/[A-Za-z]+/)) { 
						errors += ("\n          State/Province");
						if (toselect == "") toselect = e.name;
						numerrors++;
					} else if(!myform.country && !e.value.match(/[A-Za-z]+/)) {
						errors += ("\n          State");
						if (toselect == "") toselect = e.name;
						numerrors++;
					}
				}	
				
			} else if (((e.name == "azip") || (e.name =="zip"))) {
				if((myform.country && myform.country.selectedIndex == 1 && myform.country[1].value == 'USA' && !e.value.match(/^\d{5}$/)) || (!myform.country && !e.value.match(/^\d{5}$/))) { 
					errors += ("\n          Zip Code (5 digit only)");
				 	if (toselect == "") toselect = e.name;
					numempty++;
					break;
				}
			} else if ((e.name == "bzip") && (!(e.value.match(/\d{4}/)) || (e.value.length > 4))) {
				errors += ("\n          Zip +4");
				if (toselect == "") toselect = e.name;
				numerrors++;
			} else if ((e.name == "email") && !(e.value.match(/\w+-*@\w+/)) || (e.name == "email") && (e.value.match(/\w+\,\w+/))) {
				errors += ("\n          Email Address");
				if (toselect == "") toselect = e.name;
				numerrors++;
			}  else if ((e.name == "usrname") && !(e.value.match(/[A-Za-z]+/))) {
                                errors += ("\n          Your Name");
                                if (toselect == "") toselect = e.name;
                                numerrors++;
                        }
		}
	}
	
	// Return true if no errors or empty fields
	if (!empty_fields && !errors) { 
		submitonce(myform); 
		return true; 
	} 
	
	// Otherwise, create and display error message
	msg =  "_______________________________________\n\n";
	msg += "The form was unable to be submitted due to the\nfollowing ";
	numempty + numerrors == 1
		? msg += "error.  "
		+ "Please correct this error and\n"
		: msg += "errors.  "
		+ "Please correct these errors and\n";
	msg += "attempt to re-submit.\n";
	msg += "_______________________________________\n\n";
	
	if (empty_fields) {
		msg += "The following required ";
		numempty == 1
			? msg += "field was empty:"
			: msg += "fields were empty:";
		msg += (empty_fields + "\n");
		if (errors) msg += "\n";
	}
	
	if (errors) {
		msg += "The following ";
		numerrors == 1
			? msg += "field contained errors:"
			: msg += "fields contained errors:";
		msg += (errors + "\n");
	}
	
	// Show alert and stop submission
	alert(msg);
	if (toselect != "") {
	

		
			var i = myform.name;	
			if(i == '') {
				
				var myl = document.getElementById?true:false;
				var ie4 = (document.all && !myl)?true:false;	
				//alert(ie4);
				if(!ie4) {
				
					eval("myform." + toselect + ".select()");
					eval("myform." + toselect + ".focus()");
				} else {

				   return false;
				}
							

	
			} else {
				
			eval("document." + i +  "." + toselect + ".select()");
			eval("document." + i +  "." + toselect + ".focus()");
			return false;
			}

	}
	//alert('test');
	return false;
	


}


function chkselect(formname, selectname, message) {
		var x = eval('document.' + formname + '.' + selectname + '.options[0].selected');
		if(x) { alert(message); return false; }
}		


function submitonce(theform){
	//if IE 4+ or NS 6+
	if (document.all||document.getElementById){
		//screen thru every element in the form, and hunt down "submit" and "reset"
		for (i=0;i<theform.length;i++){
			var tempobj=theform.elements[i];
			
			if(tempobj.type.toLowerCase()=="reset" || tempobj.type.toLowerCase()=="submit") {
				
				if(tempobj.value != 'Go Back & Edit' && tempobj.value != 'Preview') {
					//disable em
					tempobj.disabled=true;
				}
			}
		}
	}
}









// harsh
function chkRecipients() {
	var count=0;
	for(var l=0; l<document.recipients.length; l++) {
		if(document.recipients.elements[l].type == 'checkbox' && document.recipients.elements[l].checked == true) { count++; }
	}
	if(count==0) {
		alert('Please select a recipient first.');
		return false;
	}
}
// harsh end


}
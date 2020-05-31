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

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

/*
	USAGE:
		CAgateway(dir);
		CAredirect(ns, ie, other);
		CAconfirm(url, message);
		CAcss(dir); Mac Detect
		CApopupbox();
		CAradiochek();  
		CApusharray(array, value);
		include(file);
		
        Revision: $Revision: 1.9 $

	Tyler Rorabaugh
	
*/
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////





function CAgateway(dir) {


			
	CAcss(dir);
//	window.onerror = errors;
	if(arguments.length > 1) {
		if(arguments[1] == 'frameset') {
		frameset(dir);
		
		}	
	}

}



//function errors() { return true; } 
//window.onerror = errors;

//////////////////////////////////////////////////////////////////
// 
// detects browser and redirects user to correct page
//////////////////////////////////////////////////////////////////


//// Declare Global Variables


// live is a variable to switch between the internal lan
// and the flat file server
// if this document is located on the internal lan server
// switch live to '' otherwise switch live to the ffs server


//var live = '';

if(document.location.protocol == 'https:') {
      var live = 'https://ssl.capwiz.com/';
} else {      
     var live = 'http://ffs.capwiz.com';
     // var live = '';
}




//// End declare Global variables


// ns = where you want to go for nestscrape
// ie = where you want to direct the user for interenet explorer
// other = if they dont have either ie or ns redirect pass them c



var isNav, isIE

function CAredirect(ns, ie, other) {
	
	if (parseInt(navigator.appVersion) >= 4) {
		if (navigator.appName == "Netscape") {
			isNav = true;
			top.location.href = ns;
		} else { 
		 	isIE = true
			top.location.href = ie;
		}
	}

	if (!isNav && !isIE) {

		top.location.href = other
	}

}


//////////////////////////////////////////////////////////////////
// 
// Confirms A Deleted Object
//////////////////////////////////////////////////////////////////


function CAconfirm(url, message) {
	if(confirm(message))
	window.location = url;
	
}




//////////////////////////////////////////////////////////////////
// 
// Detects platform and redirects user to appropriate CSS document
//////////////////////////////////////////////////////////////////


function CAMacCss() {



if ((navigator.platform =='MacPPC')&&(navigator.appVersion.substr(17,8) != "MSIE 5.0")) {
                 
                 
                document.write('<Link rel="stylesheet" href="' + live + '/DHTML/css/mac.css" type="text/css">');
                 
	} else {
		
		 document.write('<Link rel="stylesheet" href="' + live + '/DHTML/css/capwiz.css" type="text/css">');             
                 
                
                
                
                }

}




/////////////////////////////////////////////////////////////////
// 
// Detects platform and redirects user to appropriate CSS document
// Dynamically builds the url so that each client can have a css dir
// Usage: CAcss(directoryname) ;
// 
//////////////////////////////////////////////////////////////////
function CAcss(dir) {

	var link = '<link rel="stylesheet" href="' + live;
	var capwiz = '/css/capwiz.css';
	var caonly = '/DHTML/css/caonly.css';
	if ((navigator.platform =='MacPPC')&&(navigator.appVersion.substr(17,8) != "MSIE 5.0")) {
		capwiz = '/css/mac.css';
		caonly = '/DHTML/css/caonlymac.css';
	}
	capwiz = link + '/' + dir + capwiz + '" type="text/css">';
	// alert(capwiz); 
	document.write(capwiz);
	if	(document.location.protocol == 'https:')
		caonly = '/SSLProxy' + caonly + '?host=ffs.capwiz.com&port=80&path_query=' + escape(caonly);
	caonly = link + caonly + '" type="text/css">';
	// alert(caonly);
	document.write(caonly);

	document.write('<link rel="stylesheet" href="' + live + '/' + dir + '/css/xc.css" type="text/css">');
}



//////////////////////////////////////////////////////////////////
// 
// creates pop up box
//////////////////////////////////////////////////////////////////
// creates pop up box
// allows for height width location toolbar scrolling status directories menubar resizable 
// w = width
// h = height
// no = on or off of features
// yes = yes for resizable
//
//////////////////////////////////////////////////////////////////


function CApopupbox(url, name, w, h, scroll, no, yes) {
        
	if(arguments.length == 7) {
        var z = window.open(url, name, 'width='+ w + ',' + 'height='+ h + ',' + 'location='+ no + ',' + 'scrollbars=' + scroll + ',' + 'status='+ no + ',' + 'directories='+ no + ',' + 'menubar='+ no + ',' + 'resizable='+ yes + ',' + 'screenX=Window.screenX' + ',' + 'left=screenX' + ',' + 'screenY=Window.screenY' + ',' + 'top=Window.screenY');
   	z.focus();
	} else if(arguments.length == 8) {
		    if(arguments[7] == 'center') {
                                var a = "toolbar=" + no + ",location=0,directories=0,status=0,menubar=" + no + ",scrollbars=" + scroll;
                                var b = ",resizable="+yes;
                                var c = ",width="+w+",height="+h;
                                var windowW = w;
                                var windowH = h;
                                var windowX = (screen.width) ? (screen.width-w)/2 : 0;
                                var windowY = (screen.height) ? (screen.height-h)/2 : 0;
                                var d = ',screenX='+windowX+',' + 'left='+windowX+',' + 'screenY='+windowY+ ',' + 'top='+windowY;
				var ops = a+b+c+d;
                                var splashWin = window.open(url, name, ""+ops+"");
                                splashWin.focus();
                   }
	
	
	}		   


	       
}	       

//////////////////////////////////////////////////////////////////
	
	



//////////////////////////////////////////////////////////////////
// 
// Pushes a vale onto an array because IE doesnt support the push
// method
//////////////////////////////////////////////////////////////////

	

function pusharray(array, value) {

	var length = array.length;
	array[length] = value;
	//alert(array.length)

return array;
}




//////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
// 
// include method so that you can include other scripts within one
// script.
//////////////////////////////////////////////////////////////////

	
function include(file) {
	
		var start = '<script language="javascript" src="'  
		var end = '"></script>'
		//alert(file);
		document.write(start + file + end);
		//alert(start + file + end);
}




var qcount = 0;
function CAlimitcheckboxes(thiselement, limitnum, message) {


	if(thiselement.checked == true) {
		   if(qcount < limitnum) {
			qcount++;
		   } else if(qcount >= limitnum) {
				alert(message);
				thiselement.checked = false;
		   }

	} else if(thiselement.checked == false) {
		qcount--;

	}

}

 

function checkboxcheck(formname, message) {

                var count=0;
                var form = eval('document.' + formname);
		for(var i=0; i<form.length; i++) {
                                if(form.elements[i].type == 'checkbox' && form.elements[i].checked == true) {
                                        
                                        count++;
                                }
                }



		if(count == 0) {
			alert('Error! \n \n Please choose your recipients.');
			return false;
		} else if(count > 5) {
			alert('Error! \n \n Please choose less than 5 recipients.');
		
		}
		



}


function frameset(dir) {
	var noframes = (parent.frames.length == 0)? true : false;
	if(noframes) {
		
		var tmpurl = document.location;
		var fullurl = '/' + dir + '/index_frame.dbq?url=' + tmpurl;
		document.location = fullurl;
	}	
}


//////////////////////////////////////////////////////////////////
// sendtext()
// Used in conjunction with CapWiz::SpellChecker::App.
// See module documentation for details.
//////////////////////////////////////////////////////////////////
function sendtext(strFormName,strFieldName) {
	var semi = new RegExp("\;","g");
	document.send.field.value = strFieldName;
	document.send.form.value = strFormName;
	document.send.checkme.value = (document.forms[strFormName].elements[strFieldName].value.replace(semi,"\;"));
	window.open('','SpellChecker','width=480,height=360,top=150,left=150,scrollbars=1,location=true,toolbar=0');
	document.send.submit();
}


}
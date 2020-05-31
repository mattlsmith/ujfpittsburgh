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

//=============================================================================
//
//  MiscFunctions.js
//		This file contains JavaScript functions to handle the miscellaneous 
//		client-side functions 
//
//=============================================================================
	
// Constants

// Functions

function TextAreaMaxLength (oTA, iMaxLength, sMsg) {

	if (oTA.value.length > iMaxLength) {
	
		// truncate value to max length
		oTA.value = oTA.value.substring(0, iMaxLength);
		
		// show message if message is passed
		if (sMsg.length > 0) { alert(sMsg);	}
	}
	
	return true;
}

function setText(o,sText){
	var bCreateTextNode = true;
	var oTextNode;

	if(o.childNodes.length > 0){
		while (o.firstChild != o.lastChild){
			o.removeChild(o.lastChild);
		}
		if(o.firstChild.nodeType != 3){
			o.removeChild(o.lastChild);
		}else{
			bCreateTextNode = false;
		}
	}

	if(bCreateTextNode){
		oTextNode = o.ownerDocument.createTextNode(sText);
		o.appendChild(oTextNode);
	}else{
		o.firstChild.data = sText;
	}
}

function getText(o){
	if(o.childNodes.length>0 && o.firstChild.nodeType == 3){
			return o.firstChild.data;
	}else{
		return '';
	}
}

function changeTextInputToSelected(select, textInput)
{
    //select_GetSelectedText in Core.js
    textInput.value = select_GetSelectedText(select);
}

// ======================================================================================
//  Cross browser event attaching helper functions
// ======================================================================================

function createAddEventListener(o)
{
    if(!o.addEventListener && o.attachEvent)
    {
	    o.addEventListener = ieAddEventListener;
    }
}

function ieAddEventListener(eventName, handler, capture)
{
    this.attachEvent("on" + eventName, handler);
}

// ======================================================================================
//  "Object Security Control" Object Class
// ======================================================================================

// Constructor
// 
// Note:
//    The collection of checkboxes to which this object is mapped must ensure that
//    every checkbox has a unique value for its ID attribute within the collection.
function OSCObject()
{
    this.headers = [];
    this.checkboxRows = [];
    this.columnUncheckedCount = [];
    this.checkedCollection = [];
    this.uncheckedCollection = [];
}

// Arguments:
//    row - Array of all checkboxes from one row
OSCObject.prototype.addCheckboxRow = function (row)
{
    for(var j = row.length - 1; j >= 0; --j)
    {
        if(row[j].checked)
        {
            this.checkedCollection[j][row[j].id] = row[j];
        }
        else
        {
            this.columnUncheckedCount[j]++;
            this.uncheckedCollection[j][row[j].id] = row[j];
        }
    }
    
    this.checkboxRows.push(row);
};


// Arguments:
//    inputs   - Collection of all input (checkbox) objects in grid
//    colCount - Number of columns in grid
OSCObject.prototype.populate = function (inputs, colCount)
{
    var len = inputs.length; // len: Number of total checkboxes in grid
    var n = colCount;        // n:   Every non-header checkbox in grid
    var j;                   // j:   Current column index
    var row;                 // row: Array representing 1 row of checkboxes
    
    // Headers
    for(j = 0; j < colCount; ++j)
    {
        this.headers.push(inputs[j]);
        this.columnUncheckedCount.push(0);
        this.checkedCollection.push({});
        this.uncheckedCollection.push({});
    }
    
    // Non-headers
    while(n < len)
	{
	    row = [];
	    
	    for(j = colCount - 1; j >= 0; --j)
	    {
	        row.push(inputs[n++]);
	    }
	    
		this.addCheckboxRow(row);
	}
};


// This must be called only after populate()
OSCObject.prototype.init = function ()
{
    var box;
    var rows = this.checkboxRows;
    var rowCount = rows.length;
    
    // Headers
    for(var i = 0; i < this.headers.length; ++i)
    {
        this.headers[i].checked = (this.columnUncheckedCount[i] <= 0);
        
        // Double-closured function for capturing the looped variable's current value.
        addEvent(this.headers[i], "click", (function(o, x){return function(){selectAll(o, x);};})(this, i), false);
    }
    
    // Non-headers
    // Do not addEventListener to individual checkboxes here,
    // it is 55% slower (using cross browser compatibility).
    // Instead, addEventListener for additional events and
    // let this be the fixed "onclick" handler.
    for(var i = rowCount - 1; i >= 0 ; --i)
    {
        for(var j = rows[i].length - 1; j >= 0; --j)
        {
            box = rows[i][j];
            box["onclick"] = syncLogic;
            box["oscObject"] = this;
            box["oscRowIndex"] = i;
            box["oscColIndex"] = j;
        }
    }
};

// ======================================================================================
//  "Object Security Control" event handlers
// ======================================================================================

// Header checkbox clicked
// 
// Arguments:
//    o   - OSCObject instance
//    col - Index of column to toggle
function selectAll(o, col)
{
    var box, nextColumn;
    var checked = o.headers[col].checked;
    var rows = o.checkboxRows;
    var ncc = o.columnUncheckedCount;
    
    var fromCollection, toCollection, incNoCheckCount;
    
    // Get execution values
    if(checked)
    {
        fromCollection = o.uncheckedCollection[col];
        toCollection   = o.checkedCollection[col];
        increment      = -1;
    }
    else
    {
        fromCollection = o.checkedCollection[col];
        toCollection   = o.uncheckedCollection[col];
        increment      = 1;
    }
    
    // Toggle necessary checkboxes
    for(x in fromCollection)
    {
        box = fromCollection[x];
        
        if(box.disabled)
        {
            continue;
        }
        
        box.checked = checked;
        toCollection[x] = box;
        delete fromCollection[x];
        ncc[col] += increment;
    }
    
    nextColumn = col + increment;
    
    if(o.headers[nextColumn])
    {
        o.headers[nextColumn].checked = checked;
        arguments.callee(o, nextColumn);
    }
}

// Individual checkbox clicked
// 
// Arguments:
//    e - Event object for some browsers
function syncLogic(e)
{
    var box = this;
    
    var osc = box["oscObject"];
    
    var oscRowIndex = parseInt(box["oscRowIndex"]);
    var oscColIndex = parseInt(box["oscColIndex"]);
    
    // No event handling mechanism found
    if(!osc || isNaN(oscRowIndex) || isNaN(oscColIndex))
    {
        return;
    }
    
    var rows = osc.checkboxRows;
    var checked = box.checked;
    
    var fromCollection, toCollection, increment;
    
    if(checked)
    {
        fromCollection = osc.uncheckedCollection;
        toCollection = osc.checkedCollection;
        increment = -1;
    }
    else
    {
        fromCollection = osc.checkedCollection;
        toCollection = osc.uncheckedCollection;
        increment = 1;
    }
    
    do
    {
        if(box.disabled)
        {
            continue;
        }
        
        box.checked = checked;
        toCollection[oscColIndex][box.id] = box;
        delete fromCollection[oscColIndex][box.id];
        osc.columnUncheckedCount[oscColIndex] += increment;
        
        osc.headers[oscColIndex].checked = (osc.columnUncheckedCount[oscColIndex] <= 0); // Check the select all
        
        while((box = rows[oscRowIndex][oscColIndex += increment]) && box.disabled); // Skip over disabled boxes
    }
    while(box && box.checked != checked);
}

// ======================================================================================
//  "Object Security Control" loader
// ======================================================================================

function loadOSC(id, colCount)
{
    var inputs = document.getElementById(id).getElementsByTagName("input");
    var osc = new OSCObject();
    osc.populate(inputs, colCount);
    osc.init();
}

// ======================================================================================
//  Timer Class
// ======================================================================================

// Constructor
function Timer()
{
    this.times = [];
}

Timer.prototype.addCheckpoint = function()
{
    this.times.push(getMilliseconds());
};

Timer.prototype.getReport = function()
{
    var result = "======================";
    
    switch(this.times.length)
    {
        case 0:
            result += "\nNo checkpoints set.";
            break;
        case 1:
            result += "\nNo ending checkpoint set.";
            break;
        default:
            result += "\nTotal time: " + this.getElapsedTime();
            result += "\n======================";
    }
    
    for(var i = 0; i < this.times.length - 1; i++)
    {
        result += "\nBlock " + (i + 1) + "'s execution time:\n";
        result += (this.times[i+1] - this.times[i]);
        result += "\n======================";
    }
    
    return result;
};

Timer.prototype.showReport = function()
{
    alert(this.getReport());
};

Timer.prototype.getElapsedTime = function()
{
    return (this.times.length > 0) ? (this.times[this.times.length - 1] - this.times[0]) : Number.NaN;
};

// Arguments:
//    d - (Optional) Date() object
function getMilliseconds(d)
{
    if(arguments.length < 1)
    {
        d = new Date();
    }
    
	return ((d.getHours() * 60 + d.getMinutes()) * 60 + d.getSeconds()) * 1000 + d.getMilliseconds();
}

// ======================================================================================

function disableCtl(CtlID, disabled)
{
	if(document.getElementById(CtlID))
	{
		document.getElementById(CtlID).disabled = disabled;
	}
}

// ======================================================================================

}
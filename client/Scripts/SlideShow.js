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

var gImageCapableBrowser = true

/********************************************
  Slideshow uses these functions
 ********************************************/
 
ImagePreloader.prototype.onComplete = function() {
    this.nProcessed++
    
    if (this.nProcessed == this.nImages) {
      this.callback(this.aImages, this.aCaptions, this.nLoaded)
    }
}

ImagePreloader.prototype.onabort = function() {
	this.bAbort = true
	this.oImagePreloader.onComplete()
}

ImagePreloader.prototype.onerror = function() {
	this.bError = true
	this.oImagePreloader.onComplete()
}

ImagePreloader.prototype.onload = function() {
    this.bLoaded = true
    this.oImagePreloader.nLoaded++
    this.oImagePreloader.onComplete()
}

ImagePreloader.prototype.preload = function(image, caption) {
    // create new Image object and add to array
    var oImage = document.createElement('img');
    this.aImages.push(oImage);
    
    // set up event handlers for the Image object
    oImage.onload = ImagePreloader.prototype.onload;
    oImage.onerror = ImagePreloader.prototype.onerror;
    oImage.onabort = ImagePreloader.prototype.onabort;

    // assign pointer back to this
    oImage.oImagePreloader = this;
    oImage.bLoaded = false;

    // assign the .src property of the Image object
    oImage.src = image;
    oImage.alt = 'Slideshow Image ' + this.aImages.length;

    if (caption) 
    {
        var oNewParagraph = document.createElement('p');
        this.aCaptions.push(oNewParagraph);
        var oCaption = document.createTextNode(caption);
        oNewParagraph.appendChild(oCaption);
        oImage.alt = caption;
    }

 }

function ImagePreloader(images, captions, callback) {

    // store the callback
    this.callback = callback
    
    // initialize internal state
    this.nLoaded = 0
    this.nProcessed = 0
    this.aImages = new Array
    this.aCaptions = new Array
    
    // record the number of images
    // number of images = number of captions may have blank caption
    this.nImages = images.length
    
    // for each image, call preload()
    for (var i = 0; i < images.length; i++) {
		this.preload(images[i], captions[i])
    }
}

/********************************************
 Photo Personal Page Element uses these functions
 ********************************************/

ImagePreloader_NoCaptions.prototype.onComplete = function() {
    this.nProcessed++
    
    if (this.nProcessed == this.nImages)     {
        this.callback(this.aImages, this.nLoaded)
    }
}

ImagePreloader_NoCaptions.prototype.onabort = function() {
	this.bAbort = true
	this.oImagePreloader.onComplete()
}

ImagePreloader_NoCaptions.prototype.onerror = function() {
	this.bError = true
	this.oImagePreloader.onComplete()
}

ImagePreloader_NoCaptions.prototype.onload = function() {
    this.bLoaded = true
    this.oImagePreloader.nLoaded++
    this.oImagePreloader.onComplete()
}

ImagePreloader_NoCaptions.prototype.preload = function(image) {
    // create new Image object and add to array
    var oImage = document.createElement('img')
    this.aImages.push(oImage)
   
    // set up event handlers for the Image object
    oImage.onload = ImagePreloader_NoCaptions.prototype.onload
    oImage.onerror = ImagePreloader_NoCaptions.prototype.onerror
    oImage.onabort = ImagePreloader_NoCaptions.prototype.onabort

    // assign pointer back to this.
    oImage.oImagePreloader = this
    oImage.bLoaded = false

    // assign the .src property of the Image object
    oImage.src = image
    oImage.alt = 'Slideshow Image ' + this.aImages.length;
 }

function ImagePreloader_NoCaptions(images, callback) {
    // store the callback
    this.callback = callback
    
    // initialize internal state.
    this.nLoaded = 0
    this.nProcessed = 0
    this.aImages = new Array
    
    // record the number of images.
    this.nImages = images.length
    
    // for each image, call preload()
    for (var i = 0; i < images.length; i++) {
		this.preload(images[i])
	}
}

/********************************************
 Shared functions
 ********************************************/

function SlideShow(imgCount, Interval) {
    this.imageCount = imgCount
    this.currentImage = 0
    //if (gSupportCaptions == true) { this.currentCaption = 0 }
    this.currentCaption = 0 
    this.playPauseID = 0
    this.intervalID = ""
    this.slideInterval = Interval * 1000
    this.images = new Array(this.imageCount) 
    //if (gSupportCaptions == true) { this.captions = new Array(this.imageCount) }
    this.captions = new Array(this.imageCount)
    this.uniqueID = ""
    this.random = false
}

function canManipulateImages() {
	if (document.images) {
	    return true
	} else {
	    return false
	}
}

function get_random(MaxNumber) {
   var ranNum = Math.round(Math.random() * MaxNumber)
   return ranNum
}

function nextSlide(oSS, click) {
   if (click == true) {
      clearInterval(oSS.intervalID)
      oSS.intervalID = ''
      document.getElementById(oSS.playPauseID).src = ROOT_PATH + 'images/button_play.gif'
   }

   if (oSS.random) {
      var iNum = get_random(oSS.imageCount - 1)
	  oSS.currentImage = iNum
	  if (oSS.gSupportCaptions) { oSS.currentCaption = iNum	  }
   } else {
      oSS.currentImage = (oSS.currentImage + 1) % oSS.imageCount
      if (oSS.gSupportCaptions) { oSS.currentCaption = (oSS.currentCaption + 1) % oSS.imageCount }
   }

   loadSlide(oSS)
}

function loadSlide(oSS) {
	if (gImageCapableBrowser) {
	    
	    if ($get(oSS.uniqueID)) 
	    {
	        //CR296918-040108
	        //Calling getElementById over and over makes no sense
	        var imgContainer = document.getElementById(oSS.uniqueID);
	        imgContainer.src = oSS.images[oSS.currentImage];
	        imgContainer.alt = oSS.captions[oSS.currentCaption];
	        
	        //Was actually returning undefined so added an additional check
	        if (imgContainer.alt == '' || imgContainer.alt == 'undefined') 
	        {
	            //Each image should have a unique alt
	            imgContainer.alt = 'Slideshow image ' + (oSS.currentImage+1);
	        }
	        
	        if (oSS.gSupportCaptions) 
	        {
	            $('#' + oSS.captionID).html(oSS.captions[oSS.currentCaption]);
	        }
	        return false
	    }else{
	        cancelTimer(oSS);
	    }
	} else {
	    return true
	}
}

function prevSlide(oSS) {
	if ((oSS.currentImage - 1) % oSS.imageCount < 0) {
	    oSS.currentImage = oSS.imageCount
	    if (oSS.gSupportCaptions) { oSS.currentCaption = oSS.imageCount }
	}
	clearInterval(oSS.intervalID)
	oSS.intervalID = ""
	document.getElementById(oSS.playPauseID).src = ROOT_PATH + 'images/button_play.gif'
	oSS.currentImage = (oSS.currentImage - 1) % oSS.imageCount
	if (oSS.gSupportCaptions) { oSS.currentCaption = (oSS.currentCaption - 1) % oSS.imageCount }
	loadSlide(oSS)
}

function stopSlide(oSS) {
	oSS.currentImage = -1
	if (oSS.gSupportCaptions) { oSS.currentCaption = -1	}
	clearInterval(oSS.intervalID)
	oSS.intervalID = ""
	document.getElementById(oSS.playPauseID).src = ROOT_PATH + 'images/button_play.gif'
}


function pauseSlide(oSS) {
	if (oSS.intervalID == '') {
		oSS.intervalID = eval('setInterval("nextSlide(SS' + oSS.uniqueID + ', false)", oSS.slideInterval)')
		document.getElementById(oSS.playPauseID).src = ROOT_PATH + "images/button_pause.gif"
	} else {
		clearInterval(oSS.intervalID)
		oSS.intervalID = ''
		document.getElementById(oSS.playPauseID).src = ROOT_PATH + "images/button_play.gif"
	}
}

function cancelTimer(oSS){
    clearInterval(oSS.intervalID)
    oSS.intervalID = ''
}

}
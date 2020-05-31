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


//function to rotate images
//currently used for a rotating image component
function ImgRotator()
{
	//props set on page
	this.ImageName		= null;
	this.RotateInterval	= null;
	this.ImagePath		= null;
	this.ImageIDList	= null;
	this.URLList		= null;
	this.URLTargetList	= null;
	
	//default props
	this.RestartDelay	= 500;
	this.ImageCounter	= 0;
	this.RotateTimer	= 0;
	this.RotatorReady	= false;
	
	//internal objects
	this.RotatorColumn		= [];
	this.RotatorImages		= [];
	this.RotatorUrls		= [];
	this.RotatorUrlTargets	= [];
	
	
	
	//load the rotator
	this.LoadRotator = function()
	{
		this.SetImages();
		this.SetUrls();
		this.SetUrlTargets();
		this.RotatorStatus();
		this.StartRotator();
	}
	
	
	
	//set rotator images
	this.SetImages = function()
	{
		//alert('ImgRotator.SetImages');
		var ImageIDArray = String(this.ImageIDList).split(",");
		var oImage;
		for(var i=0; i<ImageIDArray.length; i++)
		{
			oImage = new Image();
			oImage.src = this.ImagePath+ImageIDArray[i];
			this.RotatorImages[this.RotatorImages.length] = oImage;
		}
	}
	
	
	//set urls for each image
	this.SetUrls = function()
	{
		//alert('ImgRotator.SetUrls');
		var UrlArray = String(this.URLList).split("|");
		for(var i=0; i<UrlArray.length; i++)
		{
			this.RotatorUrls[this.RotatorUrls.length] = UrlArray[i];
		}
	}
	
	
	//set url targets for each image
	this.SetUrlTargets = function()
	{
		//alert('ImgRotator.SetUrlTargets');
		var UrlTargetArray = String(this.URLTargetList).split(",");
		for(var i=0; i<UrlTargetArray.length; i++)
		{
			this.RotatorUrlTargets[this.RotatorUrlTargets.length] = UrlTargetArray[i];
		}
	}
	
	
	//set rotator status
	this.RotatorStatus = function()
	{
		//alert('ImgRotator.RotatorStatus');
		this.RotatorReady = true;
	}
	
	
	//start image rotator
	this.StartRotator = function()
	{
		//alert('ImgRotator.StartRotator');
		if(this.ImageName)
		{
			this.RotateTimer = setTimeout("oImgRotator.RotateImages()",this.RotateInterval);
		}
	}
	
	
	//rotate the images
	this.RotateImages = function()
	{
		//alert('ImgRotator.RotateImages');
		clearTimeout(this.RotateTimer);
		this.RotateTimer = 0;
		
		if(this.ImageCounter < this.RotatorImages.length-1)
		{
			this.ImageCounter++;
		}
		else
		{
			this.ImageCounter = 0;
		}
		
		var oImage = document.images[this.ImageName];
		if(oImage && this.RotatorReady)
		{
			oImage.src = this.RotatorImages[this.ImageCounter].src;
			this.RotateTimer = setTimeout("oImgRotator.RotateImages()",this.RotateInterval);
		}
	}
	
	
	//handle clicks
	this.RotatorOnClick = function(iIndex)
	{
		//alert('ImgRotator.RotatorOnClick');
		if(!document.images)
		{
			return true;
		}
		
		if(this.RotatorUrls && this.RotatorUrls[this.ImageCounter])
		{
			if(typeof this.RotatorUrls[this.ImageCounter] == "string")
			{
				if(this.RotatorUrlTargets[this.ImageCounter] == "_blank")
				{
					var oWindow = window.open(this.RotatorUrls[this.ImageCounter],"");
					if(oWindow && !oWindow.closed)
					{
						oWindow.focus();
					}
				}
				else
				{
					location.href = this.RotatorUrls[this.ImageCounter];
				}
			}
		}
		
		return false;
	}
	
	
	//pause rotator on mouseover
	this.PauseRotation = function()
	{
		this.ClearTimers();
	}
	
	
	//clear out the timer
	this.ClearTimers = function()
	{
		clearTimeout(this.RotateTimer);
		this.RotateTimer = 0;
	}
	
	
	//resume rotation
	this.ResumeRotation = function()
	{
		this.ClearTimers();
		this.RotateTimer = setTimeout("oImgRotator.RotateImages()",this.RestartDelay);
	}
}

}
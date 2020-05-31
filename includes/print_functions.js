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

function doPrinterFriendly(aid,pid)
{
	var contentURL = '/content_display.html?print=1&ArticleID='+aid+'&page='+pid;
	var printContentWindow = self.open (contentURL, 'printContent', 'menubar=yes,resizable=yes,scrollbars=yes,status=yes,width=640,height=450');
}

function window.onbeforeprint()
{

	if (document.all && document.all.printhelp)
	{
		document.all.printhelp.style.display="none";
	}
	if (document.all && document.all.printer)
	{
 		document.all.printer.style.display="none";		
	}
}

function window.onafterprint()
{
	if (document.all && document.all.printhelp)
	{
		document.all.printhelp.style.display="block";
	}
	if (document.all && document.all.printer)
	{
 		document.all.printer.style.display="block";		
	}

}

}
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

Formstack.Analytics=function(a,b,c){var d=a+"/forms/analytics.php?f="+b;this.bottleneck=null,this.trackTouch=function(){var a=function(){if(!this.touched){this.touched=!0;var a=c.getIncompleteFields(!0),b=a.length>0?a[0].id:0,e=document.createElement("script");e.type="text/javascript",e.src=d+"&a=t&b="+b,document.getElementsByTagName("head")[0].appendChild(e)}};jQuery("input.fsField","#fsForm"+b).bind("focus",jQuery.proxy(a,this)),jQuery("textarea.fsField","#fsForm"+b).bind("focus",jQuery.proxy(a,this)),jQuery("select.fsField","#fsForm"+b).bind("focus",jQuery.proxy(a,this))},this.trackBottleneck=function(){jQuery(".fsField").bind("change",jQuery.proxy(function(a){var b;(null===this.bottleneck||c.checkRequired(this.bottleneck.field,!1,!0))&&(fields=c.getIncompleteFields(!0),fields.length>0?(this.bottleneck=fields[0],b=document.createElement("script"),b.type="text/javascript",b.src=d+"&a=b&b="+this.bottleneck.id,document.getElementsByTagName("head")[0].appendChild(b)):(null!==this.bottleneck&&(b=document.createElement("script"),b.type="text/javascript",b.src=d+"&a=b&b=0",document.getElementsByTagName("head")[0].appendChild(b)),this.bottleneck=null))},this))}};

}
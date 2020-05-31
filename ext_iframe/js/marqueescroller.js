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

var current_pos = 0;
var last_pos = 0;
var scroll_interval_id;
var marquee;

function scroll() {
  // No need to scroll if content is smaller than marquee div
  if (marquee.clientHeight < marquee.scrollHeight) {
    current_pos = current_pos + 1;
    // Reset the current_pos if the div has been scrolled manually
    if (marquee.scrollTop != last_pos) {
      current_pos = marquee.scrollTop;
    }
    if (current_pos < marquee.scrollHeight) {
      marquee.scrollTop = current_pos;
    } 
    else {
      marquee.scrollTop = 0;
      current_pos = 0;
    }
    last_pos = marquee.scrollTop;
  }
}

function start_scroll() {
  scroll_interval_id = setInterval("scroll()",30);
}

function stop_scroll() {
  clearInterval(scroll_interval_id);
}

function initializeMarquee(){
  marquee = document.getElementById("marquee");
  current_pos = marquee.scrollTop;
  start_scroll();
}

if (window.addEventListener) {
  window.addEventListener("load", initializeMarquee, false)
}
else if (window.attachEvent) {
  window.attachEvent("onload", initializeMarquee)
}
else if (document.getElementById) {
  window.onload=initializeMarquee;
}


}
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

/*jslint bitwise: false, browser: false, eqeqeq: false, onevar: false, passfail: false, undef: false, white: false, laxbreak: true */
/*global getElement*/

function recurButton_OnClick(r, ddlDayNumber2ID, ddlPositionID, ddlDayOfWeek2ID) {

    var ctlDay = getElement(ddlDayNumber2ID);
    var ctlPosition = getElement(ddlPositionID);
    var ctlDayOfWeek = getElement(ddlDayOfWeek2ID);
    switch (r.value)
    {
        case EMonthlyQuarterlyMethod_ByDay:
            ctlDay.disabled = false;
            ctlPosition.disabled = true;
            ctlDayOfWeek.disabled = true;
            break;
        case EMonthlyQuarterlyMethod_ByPosition:
            ctlDay.disabled = true;
            ctlPosition.disabled = false;
            ctlDayOfWeek.disabled = false;
            break;
    }
}

}
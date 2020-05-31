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

/*global BLACKBAUD, alert*/
(function () {
    "use strict";

    BLACKBAUD.netcommunity.ExtendedTextArea = function (serverVars) {
        var specialKeys = [38, 40, 37, 39, 8, 46, 36, 35, 33, 34, 16, 20];

        function onBlur() {
            var max = serverVars.maxLength,
                msg = serverVars.message,
                val = serverVars.$Me.val();

            if (val.length > serverVars.maxLength) {
                //Value is too long. Truncate and alert the user.
                serverVars.$Me.val(val.substring(0, serverVars.maxLength));
                if (msg && msg.length > 0) {
                    alert(msg);
                }
            }
        }

        function onKeyPress(event) {
            var charKeyStroke = true,
                code = event.which || event.keyCode, //In Firefox, control characters like up/down are giving 0 for which
                i,
                max = serverVars.maxLength,
                val = serverVars.$Me.val();

            if (val.length >= max) {
                for (i = 0; i < specialKeys.length; i++) {
                    if (code === specialKeys[i]) {
                        charKeyStroke = false;
                    }
                }
                if (charKeyStroke) {
                    event.preventDefault();
                }
            }
        }

        this.Init = function () {
            serverVars.$Me.blur(onBlur);
            serverVars.$Me.keypress(onKeyPress);
        };
    };
}());


}
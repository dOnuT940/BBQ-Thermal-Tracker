$(document).ready(function() {
     $.ajaxSetup({cache: false}); //Prevents getJSON request get from cache
});

function loadJSONFile() {
     setTimeStamp("footertime"); //SET TIMESTAMP OF JSON LOAD
     var req = $.getJSON("/arduino.js", function(data, status) {
          if (status === "success" && data) {
               //FAN
               if (data.fan === true) {
                    changeVal("fan", true);
               }
               else {
                    changeVal("fan", false);
               }
               //TEMP
               if (data.temp !== temp) {
                    changeVal("temp", data.temp);
               }
               //TARGET TEMP
               if (data.target !== targetTemp) {
                    changeVal("target", data.target);
               }
               //POWER
               if (data.power === true) {
                    changeVal("power", true);
               }
               else {
                    changeVal("power", false);
               }
          }
          else {
               console.error("Error loading JSON: " + status);
          }
     });
}

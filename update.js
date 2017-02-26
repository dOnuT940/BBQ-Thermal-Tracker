$(document).ready(function() {
     loadJSONFile();
});


function loadJSONFile() {
     $.getJSON("arduino.js", function(data, status) {
          if (status === "success" && data) {
               console.log("arduino.js load: " + status);
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
               //errorElem.innerHTML = "Error loading external JSON: " + status;
          }
     });
}

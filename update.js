$(document).ready(function() {
     loadJSON();
});


function loadJSON() {
     $.getJSON("arduino.js", function(data, status) {
          if (status !== 404) {
               //console.log(data); TROUBLESHOOTING

               // SET CONDITIONS
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
     });
}

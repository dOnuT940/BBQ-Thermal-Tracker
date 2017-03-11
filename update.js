$(document).ready(function() {
     $.ajaxSetup({cache: false}); //Prevents getJSON request get from cache

     $("#temp-value").hover(function() {
          $(this).css({'color': '#86A7D8', 'cursor': 'pointer'});
     }, function() {
          $(this).css({'color': '#5382C8', 'cursor': 'pointer'});
     })
     $("#temp-value").click(function() {
          showGraph();
     })
     $("#svg").hover(function() {
          //       get x val and show val                                3/10/2017
     }, function() {

     })
});

function loadJSONFile() {
     setTimeStamp("footertime"); //SET TIMESTAMP OF JSON LOAD
     if (graphStatus === true) {
          console.log("graphstatus");
          showGraph();
     }
     var req = $.getJSON("arduino.js", function(data, status) {
          if (status === "success" && data) {
               //FAN
               if (data.fan === true) {
                    changeVal("fan", true);
               }
               else {
                    changeVal("fan", false);
               }
               //TEMP
               if (data.temp) {
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

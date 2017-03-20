$(document).ready(function() {
     $.ajaxSetup({cache: false}); //Prevents getJSON request get from cache

     $("#temp-value").hover(function() {
          $(this).css({'color': '#86A7D8', 'cursor': 'pointer'});
     }, function() {
          $(this).css({'color': '#5382C8', 'cursor': 'pointer'});
     })
     $("#temp-value").click(function(e) {
          showGraph();
     })
     $("#svg").hover(function(eve) {
          $("#poly").css('strokeWidth', '2.75px');
          if (mouseGraph === false) {
               mouseGraph = true;
               trackXGraph(eve);
               $("#x-line").show();
          }
     }, function(eve) {
          $("#poly").css('strokeWidth', '2px');
          mouseGraph = false;
          trackXGraph(eve);
          $("#x-line").hide();
     })
     $("#svg").on('mousemove', function(event) {
          if (mouseGraph === true) {
               trackXGraph(event);
          }
     })
});

function loadJSONFile() {
     setTimeStamp("footertime"); //SET TIMESTAMP OF JSON LOAD
     if (graphStatus === true) {
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

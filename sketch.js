var power; //Arduino Power Status Boolean
var temp; //temperature reading
var fanStatus; //Fan Status Boolean
var targetTemp; //Target temperature
var countdown = 10; //Seconds before refresh
var i = 1; //Fan Rotate Counter
var timeStamp = new Date();

window.onload = function() { //WAIT FOR PAGE LOAD
     showCountdown(); //START REFRESH COUNTDOWN
     loadJSONFile(); //INITIAL JSON REQUEST
     setInterval(function() {loadJSONFile();}, 10000);
     setInterval(function() {rotateFan();}, 55.555);
}

function showCountdown() { //REFRESH COUNTDOWN IN HTML
     var elem = document.getElementById('refresh-value');
     countdown--; //Subtract 1 per
     if (countdown >= 0) {
          var countdownLoop = setTimeout(showCountdown, 1000);
          elem.innerHTML = countdown.toString();
     }
     else {
          countdown = 10; //RESET LOOP COUNTER
          window.clearTimeout(countdownLoop);
          showCountdown();
     }
}

function rotateFan() { //SPIN FAN ANIMATION IN HTML
     var fan = document.getElementById('fanpic');
     if (fanStatus === true && i < 18) {
          var degree = i * 20;
          var value = "rotate(" + degree + "deg)";
          fan.style.transform = value;
     }
     else if (fanStatus === false) {
          return false;
     }
     else if (i >= 19) {
          fan.style.transform = "rotate(0deg)";
          i = 1;
          return true;
     }
     i++;
}

function changeVal(t, v) {
     var strBuild = t + "-value";
     var targetID = document.getElementById(strBuild);
     if (t === "power") { //POWER VAL CHANGE
          if (v === true) {
               targetID.style.backgroundColor = "#1BA957";
               power = true;
          }
          else if (v === false) { //IF POWER OFF, ALL THINGS NULL
               targetID.style.backgroundColor = "#C3272B";
               power = false;
               fanStatus = false;
               document.getElementById("fan-value").innerHTML = "OFF";
               document.getElementById("fan-value").style.color = "#C3272B";
               temp = "0";
               document.getElementById("temp-value").innerHTML = "0";
               document.getElementById("temp-value").style.color = "#C3272B";
               targetTemp = "0";
               document.getElementById("target-value").innerHTML = "0";
               document.getElementById("target-value").style.color = "#C3272B";
          }
          else {
               console.error('Argument Error: power requires a boolean value');
               power = false;
          }
     }
     else if (t === "temp" && !(isNaN(v)) && v >= 0) { //TEMP VAL CHANGE
          targetID.innerHTML = v;
          temp = v;
     }
     else if (t === "fan") { //FAN VAL CHANGE
          if (v === true) {
               fanStatus = true;
               targetID.innerHTML = "ON";
               targetID.style.color = "#1BA957";
          }
          else if (v === false) {
               fanStatus = false;
               targetID.innerHTML = "OFF";
               targetID.style.color = "#C3272B";
          }
          else {
               console.error('Argument Error: fan requires a boolean value');
          }
     }
     else if (t === "target"  && !(isNaN(v)) && v >= 0) {
          targetID.innerHTML = v;
          targetTemp = v;
     }
     else {
          console.error('Incorrect input to changeVal()');
     }
}

function returnHome() {
     window.location.reload(true);
}

function setTimeStamp(elemId) {
     //SETS TIMESTAMP OFF PAGE LOAD
     var elem = document.getElementById(elemId);
     var time = new Date();
     timeStamp = time;
     if (elemId) {
          elem.innerHTML = "Load Stamp: " + timeStamp.toTimeString();
     }
}

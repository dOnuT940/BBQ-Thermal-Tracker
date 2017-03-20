const refreshTime = 3; //SECONDS ONLY
var power; //Arduino Power Status Boolean
var temp; //temperature reading
var fanStatus; //Fan Status Boolean
var targetTemp; //Target temperature
var countdown = refreshTime; //Seconds before refresh
var i = 1; //Fan Rotate Counter
var timeStamp = new Date();
var tempReads = [];
var graphStatus = false; //Graph Status boolean
var mouseGraph = false; //Mouse in/out of svg

window.onload = function() { //WAIT FOR PAGE LOAD
     showCountdown(); //START REFRESH COUNTDOWN
     loadJSONFile(); //INITIAL JSON REQUEST
     var loadJSONLoop = setInterval(function() {loadJSONFile();}, refreshTime * 1000);
     var fanLoop = setInterval(function() {rotateFan();}, 55.555);
     hideGraph(); //Hide SVG and Graph-Wrapper elements
}

function showCountdown() { //REFRESH COUNTDOWN IN HTML
     var elem = document.getElementById('refresh-value');
     countdown--; //Subtract 1 per
     if (countdown >= 0) {
          var countdownLoop = setTimeout(showCountdown, 1000);
          elem.innerHTML = countdown.toString();
     }
     else {
          countdown = refreshTime; //RESET LOOP COUNTER
          window.clearTimeout(countdownLoop); //RESET COUNTDOWN LOOP
          showCountdown();
     }
}

function rotateFan() { //SPIN FAN ANIMATION IN HTML
     var fan = document.getElementById('fanpic');
     if (fanStatus === true && i < 19) {
          var degree = i * 20;
          var value = "rotate(" + degree + "deg)";
          fan.style.transform = value;
     }
     else if (fanStatus === false) {
          return false;
     }
     else if (i >= 20) {
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
          if (tempReads.length <= 39) {
               tempReads.push(parseInt(v));
          }
          else if (tempReads.length = 40) {
               tempReads.splice(0, 0); //Remove element [0] if array full
          }

          targetID.innerHTML = v;
          document.getElementById("temp-value").style.color = "#4B77BE";
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
          document.getElementById("target-value").style.color = "#4B77BE";
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
     if (elemId) {
          var elem = document.getElementById(elemId);
          var time = new Date();
          timeStamp = time;
          elem.innerHTML = "Load Stamp: " + timeStamp.toTimeString();
     }
     else {
          return false;
     }
}

function showGraph() {
     document.getElementById("svg").hidden = false; //SHOW ELEMENTS
     document.getElementById("graph-wrapper").hidden = false;

     var targ = parseInt(targetTemp, 10);
     var e = document.getElementById("svg");
     var gw = document.getElementById("graph-wrapper");
     var pl = document.getElementById("poly");
     var wTitle = document.getElementById("page-title").offsetWidth;
     var gWidth = wTitle - 20;
     var gHeight = gWidth / 4.8; //Make graph like page-title size
     var spaceW = gWidth / 40; //40 Reads possible
     var max = targ * 1.2; //Allow 120% for overhead temp
     var spaceH = parseInt(gHeight, 10) / max; //x Degress Possible possible
     var points = new Array;

     if (graphStatus === false) {
          graphStatus = true;
          gw.style.height = gHeight;
          gw.style.width = gWidth;
          gw.style.textAlign = "center";

          e.style.height = gHeight; //Setup of svg
          e.style.width = gWidth;
     }

     for (i=0; i<tempReads.length; i++) { //Loop through all temps and push coords into polyline elem
          var x = spaceW * i;
          var y = gHeight - (spaceH * tempReads[i]);
          points.push(x, y);
     }
     pl.setAttribute('points', points);
}

function hideGraph() {
     document.getElementById("svg").hidden = true;
     document.getElementById("graph-wrapper").hidden = true;
}

function trackXGraph(event) {
     var xLine = document.getElementById("x-line");
     var l; //Timeout variable
     var heightGW = document.getElementById("graph-wrapper").offsetHeight;
     var point = new Array;
     var topLeft = document.getElementById("graph-wrapper").getBoundingClientRect().left;

     if (mouseGraph === true) {
          l = window.setTimeout(function() {
               var mX = (event.clientX) - topLeft;
               point.push(mX, 0);
               point.push(mX, heightGW);
               xLine.setAttribute('x1', mX);
               xLine.setAttribute('y1', 0);
               xLine.setAttribute('x2', mX);
               xLine.setAttribute('y2', heightGW);
          }, 60);
     }
     else {
          return false;
     }
}

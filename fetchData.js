function updatebyID(id,tag,data){
    document.getElementById(id).innerHTML += '<tr><td>'+tag+'</td><td>'+data+'</td></tr>';
}

function fetchbyID(id='place') {
    return(document.getElementById(id).value);
}

function clr(id='tble'){
    document.getElementById(id).innerHTML=null;
}

function getSelected() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var selectedValues = [];
    var selectedNames=[];
    for (var i = 0; i < checkboxes.length; i++) {
      selectedValues.push(checkboxes[i].value);
      selectedNames.push(checkboxes[i].parentElement.innerText);
    }
    return([selectedValues, selectedNames]);
  }

function printData(data){
    var CheckList=getSelected();
    var val=CheckList[0];
    var names=CheckList[1];
    for(var i=0; i<val.length; i++) {
        if(names[i]!="Weather Description"){
            updatebyID('tble', names[i],data[val[i]]);
        }
        else{
            updatebyID('tble', names[i],data[val[i]].description);
        }        
    }
 }

function addHeader(city, id='tble'){
    document.getElementById(id).innerHTML += '<tr><td>City</td><td>'+fetchbyID()+' ('+city+')</td></tr>';       
}

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (checkboxes.style.display === "none") {
       checkboxes.style.display = "inline-block";
    } 
    else {
      checkboxes.style.display = "none";
    }
}

/*
API Structure:

{"count":1,"data":[{"app_temp":25.7,"aqi":72,"city_name":"Raleigh","clouds":0,"country_code":"US",
"datetime":"2023-04-20:15","dewpt":12,"dhi":114.97,"dni":894.08,
"elev_angle":51.38,"ghi":806.18,"gust":2.2,"h_angle":-25.7,"lat":35.7796,"lon":-78.6382,
"ob_time":"2023-04-20 14:50","pod":"d","precip":0,"pres":1011.5,"rh":42,"slp":1024.4,"snow":0,
"solar_rad":806.2,"sources":["1327W"],"state_code":"NC","station":"1327W","sunrise":"10:34",
"sunset":"23:52","temp":25.9,"timezone":"America/New_York","ts":1682002200,"uv":6.9148207,
"vis":16,"weather":{"description":"Clear sky","code":800,"icon":"c01d"},
"wind_cdir":"W","wind_cdir_full":"west","wind_dir":264,"wind_spd":1.79}]}
*/

function fetchData() {
    place=fetchbyID("place");
    httpRequest= new XMLHttpRequest();
    yourAPIKey="811a4405919e442cb3b18145b4b80834";     //Place inside double quatesyour API key from OpenWeatherMap
    url="https://api.weatherbit.io/v2.0/current?city="+place+"&key="+yourAPIKey+"&include=minutely";

    httpRequest.open("GET", url);
    httpRequest.send();
    clr();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState==4 && httpRequest.status==200){
            data=JSON.parse(httpRequest.responseText);
            addHeader(data.data[0].city_name,'tble');
            printData(data.data[0]);
        }
    }
}

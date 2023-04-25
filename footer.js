var p  = document.getElementById("location"); 
function showPosition(position) {
    lat=position.coords.latitude;
    lng=position.coords.longitude;

    function fetchData() {
        place=fetchbyID("place");
        httpRequest= new XMLHttpRequest();
        url=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
    
        httpRequest.open("GET", url);
        httpRequest.send();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState==4 && httpRequest.status==200){
                data=JSON.parse(httpRequest.responseText);
                p.innerHTML=data.city+", "+data.locality+", "+data.principalSubdivision+", "+data.countryName;
                console.log(data);
            }
        }
    }

    fetchData();
}
function showError(error) {
    if(error.PERMISSION_DENIED){
        p.innerHTML = "The User have denied the request for Geolocation.";
    }
}            
navigator.geolocation.getCurrentPosition(showPosition, showError);
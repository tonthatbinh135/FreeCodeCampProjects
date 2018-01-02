var lat, lon;
var currentTempInCelsius;
var apiKey="e4838c32a937a1dfb2a9e0125850d81f";
var googleMapsAPIKey ="AIzaSyBpQy4ilm8TEOI-SUpKjTouSwjPvaK28-A";
var api= "https://api.openweathermap.org/data/2.5/weather?";
var hours= new Date().getHours();
$(document).ready(function(){
    if(hours>6&&hours<=17){
        $("#iconNight").css("display","none");
        $("#iconDay").children().css("display","none");
    }
    else{
        $("#iconDay").css("display","none");
        $("#iconNight").children().css("display","none");
    }
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var lat = "lat=" + position.coords.latitude;
            var lon = "lon="+ position.coords.longitude;
            getWeather(lat,lon);
        });
    }else{
        alert("Geolocation is not supported by this browser!");
    }
    $("#temp-unit").click(function(){
        var currentTempUnit=$("#temp-unit").text();
        var newTempUnit = currentTempUnit == " °C" ? " °F" : " °C";
        $("#temp-unit").text(newTempUnit);
        //Convert to Farrenheit
        if (newTempUnit == " °F") {
            var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
            //insert the temp
            $("#temp").text(fahTemp) ;
        }else{
            $("#temp").text(currentTempInCelsius) ;
        }
    });
    $('#searchbox').keydown(function(e){
        if(e.keyCode===13){
            $("#Search").click();
        }
    });
    $("#Search").click(function(){
        if(!$('#searchbox').val()){
            alert("Search box is empty!");
            window.location.reload();
        }
        var address = $('#searchbox').val();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address':address},function(results,status){
            if (status == google.maps.GeocoderStatus.OK){
                lat = "lat=" +results[0].geometry.location.lat();
                lon = "lon="+results[0].geometry.location.lng();
                getWeather(lat,lon);
            }else {
                alert("Something got wrong " + status);
            }

        });
    })
});
function getWeather(lat,lon){
    iconCleaner();
    var apiUrl = api + lat + "&" + lon + "&units=metric" + "&appid=" + apiKey;
    $.ajax({
        url:apiUrl, 
        method:"GET",
        success: function(result){
            currentTempInCelsius =Math.round(result.main.temp);
            var weather = result.weather[0].main;
            var city =result.name;
            var country= result.sys.country;
            var desc = result.weather[0].description;
            var windSpeed= result.wind.speed;
            var humidity = result.main.humidity;
            $('#city').text(city+", ");
            $('#country').text(country);
            $('#desc').text(desc);
            $('#temp').text(currentTempInCelsius);
            $('#humidity').text(humidity+"%");
            $('#wind').text(windSpeed+"m/s")
            iconCleaner();
            iconGenerator(weather);
        }
    });
}
function iconGenerator(weather){
    var val = weather.toLowerCase();
    switch (val){
        case 'clear':
            if(hours>6&&hours<=17){
                addIconDay(val);
                break;
            }
            else{
                addIconNight(val);
                break;
            }
        case 'clouds':
            if(hours>6&&hours<=17){
                addIconDay(val);
                break;
            }
            else{
                addIconNight(val);
                break;
            }
        case 'overcast':
            if(hours>6&&hours<=17){
                addIconDay(val);
                break;
            }
            else{
                addIconNight(val);
                break;
            }
        case 'thunderstorm':
            if(hours>6&&hours<=17){
                addIconDay(val);
                break;
            }
            else{
                addIconNight(val);
                break;
            }
        case 'showers':
            if(hours>6&&hours<=17){
                addIconDay(val);
                break;
            }
            else{
                addIconNight(val);
                break;
            }
        case 'rain':
            if(hours>6&&hours<=17){
                addIconDay(val);
                break;
            }
            else{
                addIconNight(val);
                break;
            }
        case 'snow':
            if(hours>6&&hours<=17){
                addIconDay(val);
                break;
            }
            else{
                addIconNight(val);
                break;
            }
        case 'haze':
            if(hours>6&&hours<=17){
                addIconDay(val);
                break;
            }
            else{
                addIconNight(val);
                break;
            }
        case 'mist':
            if(hours>6&&hours<=17){
                addIconDay(val);
                break;
            }
            else{
                addIconNight(val);
                break;
            }
    }
}
function addIconDay(weather){
    $('span.day'+weather).css("display","block");
}
function addIconNight(weather){
    $('span.night'+weather).css("display","block");
}
function iconCleaner(){
    $("#iconDay").children().css("display","none");
    $("#iconNight").children().css("display","none");

}
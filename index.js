window.addEventListener('load', ()=>{
    let long;
    let lat;
    let changeTemp = document.querySelector(".degree-section");
    let changeUnit = document.querySelector(".degree-section span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=7f2251d34c3ac46b0e478c50b5c4618a`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data=>{
                  console.log(data);
                    const { main, weather}=data;
                  console.log(Math.round(main.temp));
                    console.log(data.weather[0].description);
                    console.log(data.name);
                    document.getElementById("degree").innerHTML = main.temp;
                    const desc = capital_letter(weather[0].description) 
                    document.getElementById("temperature-description").innerHTML = desc;
                    document.getElementById("location-timezone").innerHTML = data.sys.country + " / " + data.name;
                    //convert celsius to fahrenheit
                    let fahren = ((9 / 5) * (main.temp)) + 32;
                    console.log(Math.round(fahren));
                    // icons
                    const i = weather[0].icon;
                    console.log(i)
                    // converting code to string for skycons
                    const icon= change(i);
                    var skycons = new Skycons({ "color": "white" });
                    skycons.add(document.getElementById("icon"), Skycons[icon]);
                    console.log(icon);
                    skycons.play();
                    console.log(changeUnit.textContent);
                    // change temp
                    changeTemp.addEventListener('click', ()=>{
                        if (changeUnit.textContent=="C"){
                            changeUnit.textContent = "F"
                            document.getElementById("degree").innerHTML = Math.round(fahren);
                        }else{
                            changeUnit.textContent = "C";
                            document.getElementById("degree").innerHTML = main.temp;
                        }
                    });
                });
        });
       
    }
    function change(icon){
        switch(icon){
            case "01d": return "CLEAR_DAY";
            break;
            case "01n": return "CLEAR_NIGHT";
                break;
            case "02d": return "PARTLY_CLOUDY_DAY";
                break;
            case "02n": return "PARTLY_CLOUDY_NIGHT";
                break;
            case "04d": return "PARTLY_CLOUDY_DAY";
                break;
            case "04n": return "PARTLY_CLOUDY_NIGHT";
                break;
            case "03d": return "CLOUDY";
                break;
            case "03n": return "CLOUDY";
                break;
            case "09d": return "RAIN";
                break;
            case "09n": return "RAIN";
                break;
            case "10d": return "RAIN";
                break;
            case "10n": return "RAIN";
                break;
            case "11d": return "SLEET";
                break;
            case "11n": return "SLEET";
                break;
            case "13d": return "SNOW";
                break;
            case "13n": return "SNOW";
                break;
            case "50d": return "FOG";
                break;
            case "50n": return "FOG";
                break;
            default: return "CLEAR_DAY";
                break;
        }
        
    }
    function capital_letter(str) {
        str = str.split(" ");

        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }

        return str.join(" ");
    }
});

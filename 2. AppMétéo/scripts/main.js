import tableauJours from "./Utilitaire/gestionTemps.js";

const apiKey = "a4e94d99a3e94162b19123117220306";
const image = document.querySelector(".logo-meteo");
const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heures = document.querySelectorAll(".heure-nom-prevision");
const heuresTemp = document.querySelectorAll(".heure-prevision-valeur");
const jours = document.querySelectorAll(".jour-prevision-nom");
const joursIcon = document.querySelectorAll(".jour-prevision-icon");
const jourTemp = document.querySelectorAll(".jour-prevision-temp");
const chargementContainer = document.querySelector(".overlay-icone-chargement");


if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        //console.log(position);
        let longitude   = position.coords.longitude;
        let latitude    = position.coords.latitude;
        appelApi(longitude, latitude);

    }, () => {
        alert(`Vous avez refusé la géolocalisation. La ville sera séléctionnée par défaut.`)
        let ville = "paris";
        let latitude = 48.856614;
        let longitude = 2.3522219;
        appelApi(longitude, latitude);
    })
}

function appelApi(long, lat){
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}&days=7&lang=fr`;
    
    fetch(url).then(reponse => {
        return reponse.json();
    }).then(data => {
        temps.innerText = data.current.condition.text;
        temperature.innerText = data.current.temp_c + "°C";
        localisation.innerText = data.location.name;

        let iconTable = data.current.condition.icon.split("/");
        let period = iconTable[iconTable.length - 2];
        let icon = iconTable[iconTable.length -1];
        image.src = `ressources/icons/${period}/${icon}`;

        let heureActuelle = new Date().getHours();

        for (let i = 0; i < heures.length; i++){
            if (heureActuelle + i * 3 > 24){
                heures[i].innerText = (heureActuelle + i * 3) - 24 + "h";
            }
            else if (heureActuelle + i * 3 === 24){
                heures[i].innerText = 0 + "h";
            }
            else {
                heures[i].innerText = heureActuelle + i * 3 + "h";
            }
            
        }

        for (let i = 0; i < heuresTemp.length; i++){
            heuresTemp[i].innerText = data.forecast.forecastday[0].hour[i*3].temp_c + "°C";
        }
        for (let i = 0; i < jours.length ; i++){
            jours[i].innerText = tableauJours[i].substring(0,3);
        }

        for (let i = 0; i < joursIcon.length; i++){
            let iconTable = data.forecast.forecastday[i].day.condition.icon.split("/");
            let period = iconTable[iconTable.length - 2];
            let icon = iconTable[iconTable.length -1];
            joursIcon[i].src = `ressources/icons/${period}/${icon}`;
            jourTemp[i].innerText = data.forecast.forecastday[i].day.avgtemp_c + "°C";
        }

        chargementContainer.classList.add("disparition");
    });
}
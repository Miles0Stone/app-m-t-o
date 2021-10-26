const API_URL = "https://www.prevision-meteo.ch/services/json/Bordeaux";
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const Localisation = document.querySelector('.Localisation');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const imgIcone = document.querySelector('.logo-meteo');
const joursPrev = document.querySelectorAll('.jour-prevision-temperature');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

function AppelAPI(){

//APPEL DE L'API et CONVERTION AU FORMAT JSON
fetch(API_URL).then((response) => {
    return response.json()
}).then(responsFormat =>{
 console.log(responsFormat);

// RECUPERATION DES DONNEES DE L'API:

temps.innerText = responsFormat.current_condition.condition;
temperature.innerText = responsFormat.current_condition.tmp + "°";
Localisation.innerText = responsFormat.city_info.name;


// JOURS
    for (let index = 0; index < 5; index++) {
       
        joursDiv[index].innerText= responsFormat[`fcst_day_${index}`].day_long;
     }

// TEMPERATURE     

     for (let index = 0; index < 5; index++) {
            
            joursPrev[index].innerText= responsFormat[`fcst_day_${index}`].tmax + "°";
       

     }

// CHARGEMENT

     chargementContainer.classList.add('disparition');


     


})

}


// POUR AVOIR LES JOURS DE LA SEMAINE DANS LE BON ORDRE EN FONCTION DU JOUR QUE L'ON EST.
const joursSemaine = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
let ajd = new Date ();
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
//console.log(jourActuel, ajd);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1); //Premiere lettre en maujucule et on lui met le reste du mot

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat
(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
//console.log(tabJoursEnOrdre);



AppelAPI();


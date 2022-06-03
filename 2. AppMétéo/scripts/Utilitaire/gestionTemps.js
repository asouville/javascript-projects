const jours = document.querySelectorAll(".jour-prevision-nom");
let joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
let ajd = new Date().getDay();

let tableauJours = joursSemaine.slice(ajd).concat(joursSemaine.slice(0, ajd));


export default tableauJours;
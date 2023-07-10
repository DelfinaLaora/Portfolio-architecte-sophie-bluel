import {genererFilter, genererWorks, isLog} from "./fonction.js";
// Récupération des données dans l'API
let workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on l'analyse en json*/
let categoryGallery = await fetch("http://localhost:5678/api/categories").then(categories => categories.json()) 
// console.log(workGallery)

// Gallery
// Récupération de l'élément du DOM qui accueillera les porfolios
const portfolio = document.querySelector("#portfolio");
console.log(portfolio)

// Création de l'élément div qui acceuillera les filtres
const divFilters = document.createElement("div");
divFilters.classList.add("button_filter");
portfolio.appendChild(divFilters);

// Création du bouton "Tous"
const buttonWorks = document.createElement("button");
buttonWorks.classList.add("filter");
buttonWorks.innerText = "Tous";
divFilters.appendChild(buttonWorks);
// creatGallery()

// Création de l'élément div qui acceuillera les travaux
const div = document.createElement("div");
div.classList.add("gallery");
portfolio.appendChild(div);

genererFilter(categoryGallery);
genererWorks(workGallery);
isLog();

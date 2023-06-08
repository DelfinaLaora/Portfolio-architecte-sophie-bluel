// const { categories } = require("../models");


// const { works } = require("../models");

const workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on la transforme en json*/
const categoryGallery = await fetch("http://localhost:5678/api/categories").then(categories => categories.json()) 
// Appel des balises
// Récupération de l'élément du DOM qui accueillera les porfolio
const portfolio = document.querySelector("#portfolio");
// on crée l'élément div qui acceuillera les travaux
const div = document.createElement("div");
div.classList.add("gallery");
portfolio.appendChild(div);

let travaux = 0
/*faire une boucle pour tous les id*/
function genererWorks(workGallery){
    
        for (travaux = 0; travaux < workGallery.length; travaux++) {
        // on crée l'élément qui acceuillera les images et les titre
        const figure = document.createElement("figure");
        div.appendChild(figure);
        // on crée l'élément image
        const img = document.createElement("img");
        img.src = workGallery[travaux].imageUrl;
        figure.appendChild(img);
            // on crée l'élément titre
        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = workGallery[travaux].title;
        figure.appendChild(figcaption);
        }
}

genererWorks(workGallery);

const buttonWorks = document.querySelector(".tous");

buttonWorks.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(workGallery);  
});

const buttonObjet = document.querySelector(".objet");

buttonObjet.addEventListener("click", function(){

        const objetFiltrees = workGallery.filter(function(work){
            return work.categoryId == 1;
            });   
    
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(objetFiltrees)    
});

const buttonAppart = document.querySelector(".appart");

buttonAppart.addEventListener("click", function(){

        const appartFiltrees = workGallery.filter(function(work){
            return work.categoryId == 2;
            });   
    
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(appartFiltrees)    
});

const buttonHotel = document.querySelector(".hotel");

buttonHotel.addEventListener("click", function(){

        const hotelFiltrees = workGallery.filter(function(work){
            return work.categoryId == 3;
            });   
    
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(hotelFiltrees)    
});


console.log(workGallery)
console.log(categoryGallery)
console.log(workGallery[0].categoryId)


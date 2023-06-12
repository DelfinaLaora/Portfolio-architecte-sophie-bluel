// récupération des données dans l'API
const workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on la transforme en json*/
const categoryGallery = await fetch("http://localhost:5678/api/categories").then(categories => categories.json()) 

// Récupération de l'élément du DOM qui accueillera les porfolios
const portfolio = document.querySelector("#portfolio");

//On crée l'élément div qui acceuillera les filtres
const divFiltres = document.createElement("div");
divFiltres.classList.add("bouton_filtre");
portfolio.appendChild(divFiltres);

// Création du bouton "Tous"
const buttonWorks = document.createElement("button");
buttonWorks.classList.add("filtre")
buttonWorks.innerText = "Tous"
divFiltres.appendChild(buttonWorks)

// Ajout listener pour le bouton "Tous"
buttonWorks.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(workGallery);  
});

// Création des boutons "filtre"
function genererFiltre(categoryGallery){
    for (let i = 0; i < categoryGallery.length; i++){
        const buttonFiltre = document.createElement("button");
        buttonFiltre.classList.add("filtre")
        buttonFiltre.textContent = categoryGallery[i].name
        divFiltres.appendChild(buttonFiltre)        
    
// Ajout listener pour les boutons filtre
        buttonFiltre.addEventListener("click", function(){
            const objetFiltres = workGallery.filter(function(work){
                return work.categoryId === categoryGallery[i].id;                
            });                 
            console.log(objetFiltres)
            document.querySelector(".gallery").innerHTML = "";
            genererWorks(objetFiltres);  
        });
    }
}

genererFiltre(categoryGallery)

//On crée l'élément div qui acceuillera les travaux
const div = document.createElement("div");
div.classList.add("gallery");
portfolio.appendChild(div);

let travaux = 0
// Création de la gallery
function genererWorks(workGallery){
    document.querySelector(".gallery").innerHTML = "";
    
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

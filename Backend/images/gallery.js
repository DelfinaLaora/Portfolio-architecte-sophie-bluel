

const workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on la transforme en json*/

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







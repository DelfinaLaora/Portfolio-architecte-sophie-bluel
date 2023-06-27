
//Récupération des données dans l'API
const workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on l'analyse en json*/
const categoryGallery = await fetch("http://localhost:5678/api/categories").then(categories => categories.json()) 

// Gallery
//Récupération de l'élément du DOM qui accueillera les porfolios
const portfolio = document.querySelector("#portfolio");
console.log(portfolio)

//Création de l'élément div qui acceuillera les filtres
const divFiltres = document.createElement("div");
divFiltres.classList.add("button_filtre");
portfolio.appendChild(divFiltres);

//Création du bouton "Tous"
const buttonWorks = document.createElement("button");
buttonWorks.classList.add("filtre");
buttonWorks.innerText = "Tous";
divFiltres.appendChild(buttonWorks);

//Ajout listener pour le bouton "Tous"
buttonWorks.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(workGallery);  
});

//Création des boutons "filtre"
function genererFiltre(categoryGallery){
    for (let i = 0; i < categoryGallery.length; i++){
        const buttonFiltre = document.createElement("button");
        buttonFiltre.classList.add("filtre");
        buttonFiltre.textContent = categoryGallery[i].name;
        divFiltres.appendChild(buttonFiltre);      
    
//Ajout listener pour les boutons "filtre"
        buttonFiltre.addEventListener("click", function(){
            const objetFiltres = workGallery.filter(function(work){
                return work.categoryId === categoryGallery[i].id;                
            });                 
            // console.log(objetFiltres)
         
            genererWorks(objetFiltres);  
        });
    }
}

genererFiltre(categoryGallery)

//Création de l'élément div qui acceuillera les travaux
const div = document.createElement("div");
div.classList.add("gallery");
portfolio.appendChild(div);

let travaux = 0
//Création de la gallery
function genererWorks(workGallery){
    document.querySelector(".gallery").innerHTML = "";
    
    for (travaux = 0; travaux < workGallery.length; travaux++) {
        //Création de l'élément qui acceuillera les images et les titre
        const figure = document.createElement("figure");
        div.appendChild(figure);
        //Création del'élément image
        const img = document.createElement("img");
        img.src = workGallery[travaux].imageUrl;
        figure.appendChild(img);
        //Création de l'élément titre
        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = workGallery[travaux].title;
        figure.appendChild(figcaption);
    }
}

genererWorks(workGallery);


isLog()

//Connexion verifier pour le mode edition
function isLog(){     
    let userId = window.localStorage.getItem("userId");
    console.log(userId)
    
    if (userId !== null){
        editModEdition();        
    }
}

// création du bandeau
function editModEdition(){
    
    // recuperation du body
    const body = document.querySelector("body");
    // creation div bandeau
    const divModeEdition = document.createElement("div");
    divModeEdition.classList.add("bandeau_mode_edition");
    body.prepend(divModeEdition);/*L'ajoute comme premier enfant de body */
    // creation texte 
    const pModeEdition = document.createElement("p");
    divModeEdition.appendChild(pModeEdition);
    pModeEdition.innerText = " Mode edition";
    // création icone
    const iconeEdit = document.createElement("i");
    iconeEdit.classList.add("fa-regular", "fa-pen-to-square");
    pModeEdition.prepend(iconeEdit);
    // création boutton
    const ButtonPublierChangement = document.createElement("button");
    ButtonPublierChangement.classList.add("publier_changement");
    divModeEdition.appendChild(ButtonPublierChangement);
    ButtonPublierChangement.innerText = "Publier changement";

    // // Création du lien modifier
    const hPortfolio = document.querySelector("#portfolio h2") ;

    const modalEdit = document.createElement("a")   ;
    modalEdit.classList.add("modal_edit");
    hPortfolio.appendChild(modalEdit);
    modalEdit.innerText = " Modifier";
    

    const iconeEdit2 = document.createElement("i") ;
    iconeEdit2.classList.add("fa-regular", "fa-pen-to-square");
    modalEdit.prepend(iconeEdit2);

    // modification du nav pour Logout

    const logOut = document.getElementById("log_out");
    logOut.innerText = "Logout";
    logOut.href = "#";

    logOut.addEventListener("click", function(){
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("userId")
        document.location.href = "index.html";   
    })    
    
// modal
// création modal

    const modal = document.createElement("div");
    modal.classList.add("modal");
    body.appendChild(modal);

    const contentModal = document.createElement("div");
    contentModal.classList.add("content_modal");
    modal.appendChild(contentModal);

    const closeModal = document.createElement("a");
    closeModal.href = "#";
    closeModal.classList.add("close_modal"); 
    closeModal.innerHTML = `&#10006`;
    contentModal.appendChild(closeModal);

    // création de la modal gallery

    const modalGallery = document.createElement("div");
    modalGallery.classList.add("modal_gallery", "show");
    contentModal.appendChild(modalGallery);

    const titreModalGallery = document.createElement("h2");
    titreModalGallery.innerText = `Galerie photos`;
    modalGallery.appendChild(titreModalGallery);

    const goForm = document.createElement("button");
    goForm.classList.add("go_form");
    goForm.innerText = `Ajouter une photo`;
    modalGallery.appendChild(goForm);

    const deleteButton = document.createElement("button");/*aussi dans fonction delete */
    deleteButton.classList.add("delete");
    deleteButton.innerText = `Supprimer la galerie`;
    modalGallery.appendChild(deleteButton);    

    // création modal formulaire

    const modalForm = document.createElement("div");
    modalForm.classList.add("modal_form");
    contentModal.appendChild(modalForm);     

    // Permet de fermer la modale en cliquant sur modalContent
    const stopPropagation = function(event){
        event.stopPropagation()/*permet d'enlever la propagation de l'evenement vers les parents qui enlèvera le problème de clic à l'interieur de la modale qui la fait se fermer */
    }

    modalEdit.addEventListener("click", function(){
        modal.classList.add("open");
        modalGallery.classList.add("show");
        modalForm.classList.remove("show");
        
        contentModal.addEventListener("click", stopPropagation);
    }) 

    closeModal.addEventListener("click", function(){
        modal.classList.remove("open");
        modalGallery.classList.remove("show");
        // modalForm.classList.remove("show");
    })
    
    modal.addEventListener("click", function(){
        modal.classList.remove("open");
    })

    const arrowRetour = document.createElement("a");
    arrowRetour.href = "#";
    arrowRetour.classList.add("arrow_retour");    
    arrowRetour.innerHTML = `&#x2190`;
    modalForm.appendChild(arrowRetour);

    const titreModalForm = document.createElement("h2");
    titreModalForm.innerText = `Ajout photos`;
    modalForm.appendChild(titreModalForm);

    // création formulaire

    const formulaire = document.createElement("form");
    formulaire.action = "#";
    formulaire.method = "POST";
    formulaire.id = "loginForm";
    modalForm.appendChild(formulaire);

    // formulaire ajout photo

    const divAjoutPhoto = document.createElement("div");
    divAjoutPhoto.classList.add("ajout_photo");
    formulaire.appendChild(divAjoutPhoto);

    const iconeImage = document.createElement("i");
    iconeImage.classList.add("fa-regular", "fa-image");
    divAjoutPhoto.appendChild(iconeImage);
    
    const labelFile = document.createElement("label");
    labelFile.setAttribut = "input_ajout_photo";
    divAjoutPhoto.appendChild(labelFile);

    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.name = "file";
    inputFile.id = "input_ajout_photo";
    inputFile.accept = "image/*";
    inputFile.required = "required";
    divAjoutPhoto.appendChild(inputFile);

    const buttonAjoutPhoto = document.createElement("button");
    buttonAjoutPhoto.id = "button_ajout_photo";
    buttonAjoutPhoto.innerText = `+ Ajouter photo`;
    // buttonAjoutPhoto.required = "required";
    divAjoutPhoto.appendChild(buttonAjoutPhoto);

    const pAjoutPhoto = document.createElement("p");
    pAjoutPhoto.innerText = `jpg, png : 4mo max`;
    divAjoutPhoto.appendChild(pAjoutPhoto)

    // création formulaire description photo

    const formPhoto = document.createElement("div");
    formPhoto.classList.add("form_photo");
    formulaire.appendChild(formPhoto);

    const labelTitre = document.createElement("label");
    labelTitre.classList.add("label_titre");
    // labelTitre.setAttribut = "titre";
    labelTitre.innerText = "Titre";
    formPhoto.appendChild(labelTitre);

    const inputTitre = document.createElement("input");
    inputTitre.type = "titre";
    inputTitre.name = "titre";
    inputTitre.id = "titre";
    inputTitre.required = "required";
    formPhoto.appendChild(inputTitre);

    const labelCategorie = document.createElement("label");
    labelCategorie.classList.add("label_categorie");
    // labelCategorie.setAttribut = "categorie";
    labelCategorie.innerText = "Categorie";
    formPhoto.appendChild(labelCategorie);

    const categories = ["Hôtels & Restaurants", "Appartements", "Objets", ""];
    const selectCategorie = document.createElement("select");
    selectCategorie.name = "categorie";
    selectCategorie.id = "categorie";
    selectCategorie.required = "required";
    while(categories.length){
        const categorie = categories.pop();
        const opt = new Option(categorie, categorie);
        selectCategorie.options[selectCategorie.options.length] = opt;
    }        
    formPhoto.appendChild(selectCategorie);

    const divTraitDeco = document.createElement("div");
    divTraitDeco.classList.add("trait_deco");
    formPhoto.appendChild(divTraitDeco);
    
    const buttonValidAjoutPhoto = document.createElement("button");
    buttonValidAjoutPhoto.type = "submit";
    buttonValidAjoutPhoto.id = "valider_ajout_photo";    
    buttonValidAjoutPhoto.innerText ="Valider"
    formPhoto.appendChild(buttonValidAjoutPhoto);  

    goForm.addEventListener("click", function(){
    modalGallery.classList.toggle("show");
    modalForm.classList.toggle("show");
    })

    arrowRetour.addEventListener("click", function(){
    modalGallery.classList.toggle("show");
    modalForm.classList.toggle("show");
    })

    // modal gallery

    //Création de l'élément div qui acceuillera l'edition des travaux
    const divModalGallery = document.createElement("div")
    divModalGallery.classList.add("edit_gallery")
    modalGallery.insertBefore(divModalGallery, goForm)

//Création de la gallery
    function editWorks(workGallery){
    document.querySelector(".edit_gallery").innerHTML = "";
    
        for (travaux = 0; travaux < workGallery.length; travaux++) {       
            //Création de l'élément qui acceuillera les images et les titre
            const figure = document.createElement("figure");
            divModalGallery.appendChild(figure);
            figure.dataset.id = [travaux];/*recupère id (0.1.2...) du tableau des photos dans figure */
            console.log(figure)
            //Création de l'élément image
            const img = document.createElement("img");
            img.src = workGallery[travaux].imageUrl;
            figure.appendChild(img);
            // création de l'icone flèche
            const iconeSize = document.createElement("i")
            iconeSize.classList.add("fa-solid", "fa-maximize")
            figure.appendChild(iconeSize);
            // création de l'icone poubelle
            const iconeTrash = document.createElement("i")
            iconeTrash.classList.add("fa-regular", "fa-trash-can", "visible")
            figure.appendChild(iconeTrash);
            // création de la case à cocher
            const inputCheck = document.createElement("input")
            inputCheck.classList.add("check", "invisible")
            inputCheck.type = "checkbox"
            inputCheck.name = "work_delete"
            figure.appendChild(inputCheck);
            // Création de l'élément titre
            const figcaption = document.createElement("figcaption");
            figcaption.innerText = "éditer";
            figure.appendChild(figcaption);

            const work = workGallery[travaux]
                
            //Fonction pour checker les photos à supprimer
            inputCheck.addEventListener("click", function checkDelete(){
        
                if(inputCheck.checked){
                    iconeTrash.classList.add("invisible")
                    iconeTrash.classList.remove("visible")
                    inputCheck.classList.add("visible")
                    inputCheck.classList.remove("invisible")
                    inputCheck.value = "delete"
                    inputCheck.classList.add("work_delete")
                }else{
                    iconeTrash.classList.add("visible")
                    iconeTrash.classList.remove("invisible")
                    inputCheck.classList.add("invisible")
                    inputCheck.classList.remove("visible")
                    inputCheck.classList.remove("work_delete")
                    inputCheck.value = null
                }  

                const deleteButton = document.querySelector(".delete");

                // Fonction pour supprimer les photos
                deleteButton.addEventListener("click", async function(event){
                    event.preventDefault()   
                    let user = window.localStorage.getItem("user");
                    console.log(user)//1
                    console.log(work)
                    const idWork = work.id /*récupère les id des photos (1.2.3...)*/
                    console.log(idWork)
                        
                        let response = await fetch(`http://localhost:5678/api/works/${idWork}`, {
                                method :"DELETE",
                                headers: {
                                    "Accept": "*/*",
                                    "Authorization": `Bearer ${user}`
                                },
                        });
                        if (response.ok) {                                
                            // if HTTP-status is 200-299
                            alert("Photo supprimé avec succes");
                            
                        } else {
                            alert("Echec de suppression");
                        }                
                })    
        })       
    }
    }
editWorks(workGallery)
}



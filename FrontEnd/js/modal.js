import {editWorks, previewPicture, validFormFields, addFile} from "./fonction.js"
let workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on l'analyse en json*/

export function modEdit(){ 
    const body = document.querySelector("body");
   
// ------Création des boutons modifier

// Mode édition 1
    // Creation div bandeau 
    const divModeEdit = document.createElement("div");
    divModeEdit.classList.add("banner_mode_edit");
    body.prepend(divModeEdit);/*L'ajoute comme premier enfant de body */
    // Création texte 
    const pModeEdit = document.createElement("p");
    divModeEdit.appendChild(pModeEdit);
    pModeEdit.innerText = " Mode edition";
    // Création icone
    const iconeEdit = document.createElement("i");
    iconeEdit.classList.add("fa-regular", "fa-pen-to-square");
    pModeEdit.prepend(iconeEdit);
    // Création boutton
    const ButtonPostChange = document.createElement("button");
    ButtonPostChange.classList.add("post_change");
    divModeEdit.appendChild(ButtonPostChange);
    ButtonPostChange.innerText = "Publier changement";    

// Mode édition 2
    // Création du lien modifier sous la photo Sophie Bluel
    const sectionIntroFigure = document.querySelector("#introduction figure");

    const pModeEdit2 = document.createElement("p");
    pModeEdit2.innerText = " Modifier";
    sectionIntroFigure.appendChild(pModeEdit2)

    const iconeEdit2 = document.createElement("i") ;
    iconeEdit2.classList.add("fa-regular", "fa-pen-to-square");
    pModeEdit2.prepend(iconeEdit2);
    
// Mode edition3
    // Création du lien modifié à côté du titre "Designer d'espace" 
    const articleIntro = document.querySelector("#introduction article");

    const pModeEdit3 = document.createElement("p");
    pModeEdit3.innerText = " Modifier";
    articleIntro.prepend(pModeEdit3);

    const iconeEdit3 = document.createElement("i") ;
    iconeEdit3.classList.add("fa-regular", "fa-pen-to-square");
    pModeEdit3.prepend(iconeEdit3);

// Mode édition 4
    // Création du lien modifié à côté du titre "Mes projets"
    const hPortfolio = document.querySelector("#portfolio h2") ;

    const modalEdit = document.createElement("a")   ;
    modalEdit.classList.add("modal_edit");
    hPortfolio.appendChild(modalEdit);
    modalEdit.innerText = " Modifier";    

    const iconeEdit4 = document.createElement("i") ;
    iconeEdit4.classList.add("fa-regular", "fa-pen-to-square");
    modalEdit.prepend(iconeEdit4);

// Modification du nav pour Logout

    const logOut = document.getElementById("log_out");
    logOut.innerText = "Logout";
    logOut.href = "#";

    logOut.addEventListener("click", function(){
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("userId")
        document.location.href = "index.html";   
    })    
    
//------------ modal

    // Création de la div pour acceuillir la modal
    const modal = document.createElement("div");
    modal.classList.add("modal");
    body.appendChild(modal);

    // Création du contener pour la modal permettra de la fermer en cliquant dessus
    const contentModal = document.createElement("div");
    contentModal.classList.add("content_modal");
    modal.appendChild(contentModal);

// -------- modal gallery

    // Création de la div qui acceuillera la première modal
    const modalGallery = document.createElement("div");
    modalGallery.classList.add("modal_gallery", "show");
    contentModal.appendChild(modalGallery);

    // Création du titre de la première modal
    const titleModalGallery = document.createElement("h2");
    titleModalGallery.innerText = `Galerie photos`;
    modalGallery.appendChild(titleModalGallery);

    // Création de la div qui acceuillera les travaux à modifier
    const divModalGallery = document.createElement("div");
    divModalGallery.classList.add("edit_gallery");
    modalGallery.appendChild(divModalGallery);

    // Message de réussite  pour effacer
    const divValidMessageDelete = document.createElement("div");
    divValidMessageDelete.id = ("div_valid_message_delete")
    modalGallery.appendChild(divValidMessageDelete);
    const validMessageDelete = document.createElement("span");
    validMessageDelete.id = ("valid_message_delete");
    // validMessageDelete.innerText = "Réussi";
    divValidMessageDelete.appendChild(validMessageDelete);

    // Création du boutton pour aller sur le formulaire ajout photo
    const goForm = document.createElement("button");
    goForm.classList.add("go_form");
    goForm.innerText = `Ajouter une photo`;
    modalGallery.appendChild(goForm);

    // Création du bouton pour supprimer la gallery
    const deleteButton = document.createElement("button");/*aussi dans fonction delete */
    deleteButton.classList.add("delete");
    deleteButton.innerText = `Supprimer la galerie`;
    modalGallery.appendChild(deleteButton);    

// -------- modal formulaire

    // Création de la div qui accueillera le formulaire
    const modalForm = document.createElement("div");
    modalForm.classList.add("modal_form");
    contentModal.appendChild(modalForm);        

    // Création du titre de la modal formulaire
    const titleModalForm = document.createElement("h2");
    titleModalForm.innerText = `Ajout photo`;
    modalForm.appendChild(titleModalForm);

    // Création du formulaire
    const form = document.createElement("form");
    // form.action = "#";    
    form.method = "POST";
    form.id = "form";
    // form.setAttribute("url",`/upload-picture`)
    form.enctype = "multipart/form-data";
    modalForm.appendChild(form);

    // Création 1er module div pour télécharger la photo
    const divAjoutPhoto = document.createElement("div");
    divAjoutPhoto.classList.add("add_photo")
    form.appendChild(divAjoutPhoto);

    // Création de l'icone
    const iconeImage = document.createElement("i");
    iconeImage.classList.add("fa-regular", "fa-image");
    divAjoutPhoto.appendChild(iconeImage);

    // Création du label
    const labelFile = document.createElement("label");
    labelFile.setAttribute("for", "input_add_photo");
    divAjoutPhoto.appendChild(labelFile);

    // Création  de l'input file 
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.name = "filename";
    inputFile.id = "input_add_photo";
    inputFile.accept = ".jpg, .png";
    inputFile.required = "required";
    // inputFile.setAttribute("onchange", "previewPicture(this)")
    divAjoutPhoto.appendChild(inputFile);

    // Message erreur Fichier
    const errorFile = document.createElement("span");
    errorFile.id = "error_file";
    divAjoutPhoto.appendChild(errorFile);

    // Création du bouton qui se mettra au-dessus de l'input File
    const buttonAjoutPhoto = document.createElement("button");
    buttonAjoutPhoto.id = "button_add_photo";
    buttonAjoutPhoto.innerText = `+ Ajouter photo`;
    divAjoutPhoto.appendChild(buttonAjoutPhoto);

    // Création du texte en dessous de buttonAjoutPhoto
    const pAddPhoto = document.createElement("p");
    pAddPhoto.innerText = `jpg, png : 4mo max`;
    divAjoutPhoto.appendChild(pAddPhoto)

    // Création 2em module Div de la prévisualisation de la photo
    const picturePreview = document.createElement("div");
    picturePreview.classList.add("preview");
    // picturePreview.src = "#";
    // picturePreview.alt = "upload image";
    // picturePreview.id = "picture";
    form.appendChild(picturePreview)

    const imagePreview = document.createElement("img");
    imagePreview.id = "image_preview";
    imagePreview.src = "#";
    imagePreview.alt = "Photo à télécharger";    
    picturePreview.appendChild(imagePreview);  

    // Création 3em module Div description photo
    const formPhoto = document.createElement("div");
    formPhoto.classList.add("form_photo");
    form.appendChild(formPhoto);

    // Création du label pour Titre
    const labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "title");
    labelTitle.innerText = "Titre";
    formPhoto.appendChild(labelTitle);

    // Création du input pour Titre
    const inputTitle = document.createElement("input");
    inputTitle.type = "title";
    inputTitle.name = "title";
    inputTitle.id = "title";
    inputTitle.required = "required";
    formPhoto.appendChild(inputTitle);

    // Création du Message erreur Titre
    const errorTitle = document.createElement("span");
    errorTitle.id = "error_title";
    formPhoto.appendChild(errorTitle);

    // Création du label pour Category
    const labelCategory = document.createElement("label");
    labelCategory.setAttribute("for", "category");
    labelCategory.innerText = "Catégorie";
    formPhoto.appendChild(labelCategory);

    // Création du select option pour Category
    const categorys = ["Hôtels & Restaurants", "Appartements", "Objets", ""];
    const values = [3, 2, 1, 0]
    const selectCategory = document.createElement("select");
    selectCategory.name = "category";
    selectCategory.id = "category";
    selectCategory.required = "required";
    while(categorys.length){
        const category = categorys.pop();
        const value = values.pop();
        const opt = new Option(category, value);        
        selectCategory.options[selectCategory.options.length] = opt;        
    }            
    formPhoto.appendChild(selectCategory);

    // Création du Message erreur pour Category
    const errorCategory = document.createElement("span");
    errorCategory.id = "error_category";
    formPhoto.appendChild(errorCategory);

    // Message de réussite  
    const diValidMessageAjout = document.createElement("div");
    diValidMessageAjout.id = ("div_valid_message_ajout")
    formPhoto.appendChild(diValidMessageAjout);
    const validMessageAjout = document.createElement("span");
    validMessageAjout.id = ("valid_message_ajout");
    // validMessageAjout.innerText = "Réussi";
    diValidMessageAjout.appendChild(validMessageAjout);

    // Création de ligne déco
    const divLineDeco = document.createElement("div");
    divLineDeco.classList.add("line_deco");
    formPhoto.appendChild(divLineDeco);

    // Création du bouton pour valider la création du nouvel objet
    const buttonValidAddPhoto = document.createElement("button");
    // buttonValidAddPhoto.type = "submit";
    buttonValidAddPhoto.id = "valid_add_photo";    
    buttonValidAddPhoto.innerText = "Valider";
    formPhoto.appendChild(buttonValidAddPhoto);  
    

    // Création evenement pour aller dans le formulaire ajout photo
    goForm.addEventListener("click", function(){
        modalGallery.classList.toggle("show");
        modalForm.classList.toggle("show");
        form.reset() 
        // Permet de réinitialier le 1er module du formulaire
        divAjoutPhoto.classList.add("visibility");
        picturePreview.classList.remove("visibility");
        errorCategory.innerHTML = "";
        errorTitle.innerHTML = "";
        errorFile.innerHTML = "";
    })

// -------- modal fermeture
    
    // Permet de fermer la modal en cliquant dessus. 
    // A l'aide de stopPropagation on empêchera que ce clic se propage sur modal form et gallery
    modal.addEventListener("click", function(){
        modal.classList.remove("open");
    })

    // Permet de fermer la modale en cliquant sur modalContent
    const stopPropagation = function(event){/*Prend en parametre l'evenement */
        event.stopPropagation()
    /*permet d'enlever la propagation de l'evenement vers les parents qui enlèvera le problème 
    de clic à l'interieur de la modale qui la fait se fermer */
    }

    // Evenement sur "modifier" du Mode édition 4 à côté du titre "Mes projets" 
    modalEdit.addEventListener("click", function(){
        modal.classList.add("open");
        modalGallery.classList.add("show");
        modalForm.classList.remove("show");
    }) 

    // Permet de fermer la modale en cliquant sur modalContent
    contentModal.addEventListener("click", stopPropagation);

     // Création de la croix pour fermer la modal
     const closeModal = document.createElement("a");
     closeModal.href = "#";
     closeModal.classList.add("close_modal"); 
     closeModal.innerHTML = `&#10006;`;
     contentModal.appendChild(closeModal);

    // Evenement sur la croix de fermeture
    closeModal.addEventListener("click", function(){
        modal.classList.remove("open");
        modalGallery.classList.remove("show");         
    })    

    // Création de la flèche de retour
    const arrowBack = document.createElement("a");
    arrowBack.href = "#";
    arrowBack.classList.add("arrow_back");    
    arrowBack.innerHTML = `&#x2190;`;
    modalForm.appendChild(arrowBack);

    // Evenement flèche de retour dans la modal formulaire
    arrowBack.addEventListener("click", function(){
        modalGallery.classList.toggle("show");
        modalForm.classList.toggle("show");
        // Modifie l'affichage de la div preview dans la modal formulaire
        form.reset()   
        divAjoutPhoto.classList.toggle("visibility");
        picturePreview.classList.toggle("visibility");
    })

    // Evenement pour visualiser la photo à télécharger
    inputFile.addEventListener("change", previewPicture);

    // Evenement pour appeler la fonction valider formulaire
    buttonValidAddPhoto.addEventListener("click", validFormFields); 

    // Evenement pour la fonction ajout un élément        
    form.addEventListener("submit", function(event){
        event.preventDefault();              
        addFile();
        
        form.reset(); 
    });

    editWorks(workGallery);
    
}

  



// Récupération des données dans l'API
let workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on l'analyse en json*/
let categoryGallery = await fetch("http://localhost:5678/api/categories").then(categories => categories.json()) 
console.log(workGallery)


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

// Ajout listener pour le bouton "Tous"
buttonWorks.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(workGallery);  
});

// Création des boutons "filtre"
function genererFilter(categoryGallery){
    for (let i = 0; i < categoryGallery.length; i++){
        const buttonFilter = document.createElement("button");
        buttonFilter.classList.add("filter");
        buttonFilter.textContent = categoryGallery[i].name;
        divFilters.appendChild(buttonFilter);      
    
// Ajout listener pour les boutons "filtre"
        buttonFilter.addEventListener("click", function(){
            const objetFilters = workGallery.filter(function(work){
                return work.categoryId === categoryGallery[i].id;                
            });        
         
            genererWorks(objetFilters);  
        });
    }
}

genererFilter(categoryGallery)

// Création de l'élément div qui acceuillera les travaux
const div = document.createElement("div");
div.classList.add("gallery");
portfolio.appendChild(div);

let travaux = 0
// Création de la gallery
function genererWorks(workGallery){
    document.querySelector(".gallery").innerHTML = "";
    
    for (travaux = 0; travaux < workGallery.length; travaux++) {
        // Création de l'élément qui acceuillera les images et les titres
        const figure = document.createElement("figure");
        div.appendChild(figure);
        // Création de l'élément image
        const img = document.createElement("img");
        img.src = workGallery[travaux].imageUrl;
        figure.appendChild(img);
        // Création de l'élément titre
        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = workGallery[travaux].title;
        figure.appendChild(figcaption);
    }
}

genererWorks(workGallery);

// Connexion verifié pour le mode edition
function isLog(){     
    let userId = window.localStorage.getItem("userId");
    console.log(userId)
    // Affichera le mode edition seulement si userId est différent de null
    if (userId !== null){
        modEdit(workGallery);  
    }
}

isLog()

// Création du mode édition
function modEdit(){    
    // Récupération du body
    const body = document.querySelector("body");
    document.querySelector(".button_filter").innerHTML = "";
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

    const titleModalGallery = document.createElement("h2");
    titleModalGallery.innerText = `Galerie photos`;
    modalGallery.appendChild(titleModalGallery);

    // Création de la div qui acceuillera les travaux à modifier
    const divModalGallery = document.createElement("div");
    divModalGallery.classList.add("edit_gallery");
    modalGallery.appendChild(divModalGallery);

     // Message de réussite  pour effacer
    const divValidMessageDelete = document.createElement("div");
    divValidMessageDelete.id = ("div_valid_message_delete");
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
    titleModalForm.innerText = `Ajout photos`;
    modalForm.appendChild(titleModalForm);

    // Création du formulaire
    const form = document.createElement("form");
    // form.action = "#";    
    form.method = "POST";
    form.id = "form";
    form.setAttribute("name", "form");
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

     // Message erreur type Fichier
     const errorTypeFile = document.createElement("span");
     errorTypeFile.id = "error_type_file";
     divAjoutPhoto.appendChild(errorTypeFile);

    // Message erreur upload Fichier
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
    labelCategory.innerText = "Category";
    formPhoto.appendChild(labelCategory);

    // Création du select option pour Category
    const categorys = ["Hôtels & Restaurants", "Appartements", "Objets"];
    const values = [3, 2, 1];
    const selectCategory = document.createElement("select");
    const option = document.createElement("option");
    option.id = "opt_default";
    option.selected = "selected";
    selectCategory.appendChild(option);
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
    diValidMessageAjout.id = ("div_valid_message_ajout");
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
        // Permet de réinitialier le 1er module du formulaire ainsi que les messages d'erreur
        divAjoutPhoto.classList.add("visibility");
        picturePreview.classList.remove("visibility");
        errorCategory.innerHTML = "";
        errorTitle.innerHTML = "";
        errorFile.innerHTML = "";
        errorTypeFile.innerHTML = "";
    })

// -------- modal fermeture
    
    // Permet de fermer la modal en cliquant dessus. 
    // A l'aide de stopPropagation on empêchera que ce clic se propage sur modal content
    modal.addEventListener("click", function(){
        modal.classList.remove("open");
    })

    // Permet de fermer la modale en cliquant sur modal
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

    // Permet que l'évènement attribué à modal ne se propage pas sur contentModal
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
    })
    
// -------- modal gallery
// const workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on l'analyse en json*/

    //Création de la gallery + fonction delete
function editWorks(){         
       
        document.querySelector(".edit_gallery").innerHTML = ""; 
        
        for (travaux = 0; travaux < workGallery.length; travaux++) {       

            // Création de l'élément qui acceuillera les images et les titre
            const figure = document.createElement("figure");
            divModalGallery.appendChild(figure);
            figure.dataset.id = [travaux];/*recupère id (0.1.2...) du tableau des photos dans figure */
            // console.log(figure)
            
            // Création de l'élément image
            const img = document.createElement("img");
            img.src = workGallery[travaux].imageUrl;
            figure.appendChild(img);
            // Création de l'icone flèche
            const iconSize = document.createElement("i")
            iconSize.classList.add("fa-solid", "fa-maximize")
            figure.appendChild(iconSize);
            // Création de l'icone poubelle
            const iconTrash = document.createElement("i")
            iconTrash.classList.add("fa-regular", "fa-trash-can")
            figure.appendChild(iconTrash);
            // Création de l'élément titre
            const figcaption = document.createElement("figcaption");
            figcaption.innerText = "éditer";
            figure.appendChild(figcaption);

            const workId = workGallery[travaux].id
            // console.log(workId)/*id */ 
            
            // Evenement pour supprimer un élément
            iconTrash.addEventListener("click", async function (){      
            
                let user = window.localStorage.getItem("user");
                console.log(user)//1   

                let response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                    method :"DELETE",
                    headers: {
                        "Accept": "*/*",
                        "Authorization": `Bearer ${user}`
                    },
                });    

                if(response.status == 204){
                    // alert("Photo supprimée avec succés"); 
                    
                    workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json())
                    console.log(response)     
                    // Met à jour la gallery
                    document.querySelector(".gallery").innerHTML = "";
                    genererWorks(workGallery); 
                    // Met à jour la modal gallery
                    document.querySelector(".edit_gallery").innerHTML = "";
                    editWorks(workGallery)          
                    
                    const validMessageDelete = document.querySelector("#valid_message_delete")
                    validMessageDelete.innerText = "Projet supprimé";
                    // Permet d'attendre avant de supprimer le message de réussite
                    setTimeout(() => {
                        validMessageDelete.innerHTML = "";
                    }, 1000); 
                    return; 
                }else{
                    alert("Echec de suppression");
                }                    
            })      
        }   

        //  Ajout de travaux    

        // fonction pour voir l'image à charger        
        function previewPicture(){
            let i = 0;
            // On récupère l'objet FileList qui contient les informations sur le fichier sélectionné       
            let files = inputFile.files;
           
            for(i = 0; i < files.length; i++) {
                if(validFileType(files[i])){     
                    // On génère un aperçu de l'image en appelant la méthode window.URL.createObjectURL(files[i])
                    imagePreview.src = window.URL.createObjectURL(files[i]);  

                    picturePreview.classList.add("visibility")  
                    divAjoutPhoto.classList.remove("visibility")   
                }else{
                    errorTypeFile.innerHTML = "Veuillez télécharger une image en jpeg ou png";
                    picturePreview.classList.remove("visibility")  
                    divAjoutPhoto.classList.add("visibility") 
                }  
            }
        }
        // Tableau des fichiers autorisés
        let fileTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png'
        ]

        // La fonction validFileType() prend un objet File en entrée puis parcourt la liste des types de 
        // fichier autorisés pour les comparer à la propriété type du fichier
        function validFileType(file){
            for (let i = 0; i < fileTypes.length; i++){            
                if(file.type === fileTypes[i]){
                    // si le type est bien autorisé, la fonction renvoie true
                    return true;
                }                              
            }
            // sinon, elle renvoie false.
            return false;                      
        }
            
        // Evenement pour visualiser la photo à télécharger       
        inputFile.addEventListener("change", previewPicture);

        // Fonction pour afficher erreur formulaire
        function validFormFields(){ 
            // Erreur photo chargement
            // let fileError = document.forms["form"]["filename"];          
            let fileError = document.getElementById("input_add_photo"); 
            if(fileError.value == false){
                errorFile.innerHTML = "Veuillez télécharger une image";
                errorFile.classList.remove("valid");
                errorFile.classList.add("noValid");
            }
            // Erreur Titre
            // let titleError = document.forms["form"]["title"]; 
            let titleError = document.getElementById("title");  
            if(titleError.value == ""){
                errorTitle.innerHTML = "Veuillez remplir le champs titre";
                errorTitle.classList.remove("valid");
                errorTitle.classList.add("noValid");
            }
            // Erreur category
            // let categoryError = document.forms["form"]["category"];          
            let categoryError = document.getElementById("category"); 
            if(categoryError.value == false ){                   
                errorCategory.innerHTML = "Veuillez remplir le champs category";
                errorCategory.classList.remove("valid");
                errorCategory.classList.add("noValid");
            }
        };      

        function changeValidFormFields(){
            let fileError = document.getElementById("input_add_photo");            
            if(fileError.value  != false){
                    errorFile.innerHTML = "";
                    errorFile.classList.add("valid");
                    errorFile.classList.remove("noValid");                
            }

            let titleError = document.getElementById("title"); 
            if(titleError.value != ""){
                errorTitle.innerHTML = "";
                errorTitle.classList.add("valid");
                errorTitle.classList.remove("noValid");
            }

            let categoryError = document.getElementById("category");             
            if(categoryError.value != false ){                   
                errorCategory.innerHTML = "";
                errorCategory.classList.add("valid");
                errorCategory.classList.remove("noValid");
            }
        };
        
        // Evenement pour appeler la fonction valider formulaire
        buttonValidAddPhoto.addEventListener("click", validFormFields); 
        contentModal.addEventListener("change", changeValidFormFields)

        // fonction pour ajouter un élément
        
        async function addFile(){
            let userId = window.localStorage.getItem("user");           
            console.log(userId)//1
            
            let imageUrl = document.getElementById("input_add_photo").files[0];
            console.log(imageUrl);           
            let title = document.getElementById("title").value;
            console.log(title);
            let categoryId = document.getElementById("category").value;
            console.log(categoryId);
            let formData = new FormData();
                        
            formData.append("title", title);
            formData.append("image", imageUrl);
            formData.append("category", categoryId);

            const response = await fetch(`http://localhost:5678/api/works/`,{
            // options de requête :
            // method a été utilisé pour spécifier le type de requête
                method : "POST",
                
                headers: {
                    // "Accept": `application/json`,
                    // "Content-Type": `multipart/form-data`,
                    "Authorization": `Bearer ${userId}`
                },
                // body a spécifié les données à envoyer au serveur
                body: formData,
                
            })
        
            if(response.status == 201){
                // alert("Photo ajoutée avec succés");                 
                workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on l'analyse en json*/
                
                console.log(response)     
                // Met à jour la gallery
                // document.querySelector(".gallery").innerHTML = "";
                genererWorks(workGallery); 
                // Met à jour la modal gallery               
                editWorks(workGallery) 
            
                            
                divAjoutPhoto.classList.toggle("visibility");
                picturePreview.classList.toggle("visibility");   

                validMessageAjout.innerHTML = "Projet ajouté";
                // Permet d'attendre avant de supprimer le message de réussite
                setTimeout(() => {
                    validMessageAjout.innerHTML = "";
                }, 1000);

                return false;
            }
            if(response.status == 400){
                alert("erreur requête");         
                form.reset()   
                errorCategory.innerHTML = "";
                // Modifie l'affichage de la div preview dans la modal formulaire
                divAjoutPhoto.classList.toggle("visibility");
                picturePreview.classList.toggle("visibility");
            } 
            if(response.status == 401){
                alert("Vous n'êtes pas authorisés"); 
                form.reset() 
            } 
        };
    
        // Evenement pour la fonction ajout un élément        
        form.addEventListener("submit", function(event){
            event.preventDefault();  
            addFile();
            form.reset(); 
        });
}
    
editWorks();

}

    
    





// Si ajout de checkbox pour selectionner plusieurs photos à supprimer +CSS

// function editWorks(workGallery){
//     document.querySelector(".edit_gallery").innerHTML = "";
    
//         for (travaux = 0; travaux < workGallery.length; travaux++) {       
//             //Création de l'élément qui acceuillera les images et les titre
//             const figure = document.createElement("figure");
//             divModalGallery.appendChild(figure);
//             figure.dataset.id = [travaux];/*recupère id (0.1.2...) du tableau des photos dans figure */
//             console.log(figure)
//             //Création de l'élément image
//             const img = document.createElement("img");
//             img.src = workGallery[travaux].imageUrl;
//             figure.appendChild(img);
//             // création de l'icone flèche
//             const iconSize = document.createElement("i")
//             iconSize.classList.add("fa-solid", "fa-maximize")
//             figure.appendChild(iconSize);
//             // création de l'icone poubelle
//             const iconTrash = document.createElement("i")
//             iconTrash.classList.add("fa-regular", "fa-trash-can", "visible")
//             figure.appendChild(iconTrash);
//             // création de la case à cocher
//             const inputCheck = document.createElement("input")
//             inputCheck.classList.add("check", "invisible")
//             inputCheck.type = "checkbox"
//             inputCheck.name = "work_delete"
//             figure.appendChild(inputCheck);
//             // Création de l'élément titre
//             const figcaption = document.createElement("figcaption");
//             figcaption.innerText = "éditer";
//             figure.appendChild(figcaption);

//             const work = workGallery[travaux]
                
//             //Fonction pour checker les photos à supprimer
//             inputCheck.addEventListener("click", function checkDelete(){
        
//                 if(inputCheck.checked){
//                     iconTrash.classList.add("invisible")
//                     iconTrash.classList.remove("visible")
//                     inputCheck.classList.add("visible")
//                     inputCheck.classList.remove("invisible")
//                     inputCheck.value = "delete"
//                     inputCheck.classList.add("work_delete")
//                 }else{
//                     iconTrash.classList.add("visible")
//                     iconTrash.classList.remove("invisible")
//                     inputCheck.classList.add("invisible")
//                     inputCheck.classList.remove("visible")
//                     inputCheck.classList.remove("work_delete")
//                     inputCheck.value = null
//                 }  

//                 const deleteButton = document.querySelector(".delete");

//                 // Fonction pour supprimer les photos
//                 deleteButton.addEventListener("click", async function(event){
//                     event.preventDefault()   
//                     let user = window.localStorage.getItem("user");
//                     console.log(user)//1
//                     console.log(work)
//                     const idWork = work.id /*récupère les id des photos (1.2.3...)*/
//                     console.log(idWork)
                        
//                         let response = await fetch(`http://localhost:5678/api/works/${idWork}`, {
//                                 method :"DELETE",
//                                 headers: {
//                                     "Accept": "*/*",
//                                     "Authorization": `Bearer ${user}`
//                                 },
//                         });
//                         if (response.ok) {                            
//                             alert("Photo supprimé avec succes");
                            
//                         } else {
//                             alert("Echec de suppression");
//                         }                
//                 })    
//         })       
//     }
//     }
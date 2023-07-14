import {modEdit} from "./modal.js"

let workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()); /*on récupère l'API puis on l'analyse en json*/
// console.log(workGallery)

// Création des boutons "filtre"
export async function genererFilter(categoryGallery){
   
    
    for (let i = 0; i < categoryGallery.length; i++){
        
        const divFilters = document.querySelector(".button_filter");
        const buttonFilter = document.createElement("button");
        buttonFilter.classList.add("filter");
        buttonFilter.textContent = categoryGallery[i].name;
        divFilters.appendChild(buttonFilter);      
    
    // Ajout listener pour les boutons "filtre"
        buttonFilter.addEventListener("click", async function(){

            workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on l'analyse en json*/
            
            const objetFilters = workGallery.filter(function(work){
                return work.categoryId === categoryGallery[i].id;                
            });    
            genererWorks(objetFilters);  
        });     

        // Ajout listener pour le bouton "Tous"
        const buttonWorks = document.querySelector(".filter");
        buttonWorks.addEventListener("click", function(){
            document.querySelector(".gallery").innerHTML = "";
            genererWorks(workGallery);  
        });   
    }    
}

// Création de la gallery
export function genererWorks(workGallery){
    // workGallery = fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on l'analyse en json*/

    const div = document.querySelector(".gallery");
    document.querySelector(".gallery").innerHTML = "";
    
    for (let travaux = 0; travaux < workGallery.length; travaux++) {
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

// Vérification connexion pour le mode edition
export async function isLog(){  
    
    let userId = window.localStorage.getItem("userId");
    console.log(userId)
    // Affichera le mode edition seulement si userId est différent de null
    if (userId !== null){
        modEdit(workGallery);  
    }
}

/*------------------Fonctions modal------------------------ */

// Fonction pour créer la gallery de la modal + fonction delete
export async function editWorks(){  
    // workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on l'analyse en json*/

    const divModalGallery = document.querySelector(".edit_gallery")
    document.querySelector(".edit_gallery").innerHTML = ""; 
        
    function creatDeleteGalleryModal(){    
        for (let travaux = 0; travaux < workGallery.length; travaux++) {       

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
            
            // Fonction pour supprimer un élément   
            async function workTrash (){ 
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
                    console.log(response) 
                    // alert("Photo supprimée avec succés"); 
                    workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on l'analyse en json*/
                    
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
            } 
            // Evenement pour supprimer un élément 
            iconTrash.addEventListener("click", workTrash)
        }   
    } 
    creatDeleteGalleryModal()
}
    
// Fonction pour visualiser l'image à charger
export function previewPicture(){
    let i = 0;
    const inputFile = document.querySelector("#input_add_photo")
    const imagePreview = document.querySelector("#image_preview")
    const picturePreview = document.querySelector(".preview")
    const divAjoutPhoto = document.querySelector(".add_photo")

    const files = inputFile.files;                     
    // On génère un aperçu de l'image en appelant la méthode window.URL.createObjectURL(files[i])
    // On insère cette image dans la liste.
    imagePreview.src = window.URL.createObjectURL(files[i]);            

    picturePreview.classList.add("visibility")  
    divAjoutPhoto.classList.remove("visibility")   
}

// Fonction pour afficher erreur formulaire
export function validFormFields(){ 
    const errorFile = document.querySelector("#error_file")
    const errorTitle = document.querySelector("#error_title")
    const errorCategory = document.querySelector("#error_category")

    // Erreur photo chargement
    let fileError = document.forms["form"]["filename"];          

    if(fileError.value == false){
        errorFile.innerHTML = "Veuillez télécharger une image";
        errorFile.classList.remove("valid");
        errorFile.classList.add("noValid");
    }else{
        errorFile.innerHTML = "";
        errorFile.classList.add("valid");
        errorFile.classList.remove("noValid");                
    }
    // Erreur Titre
    let titleError = document.forms["form"]["title"];          

    if(titleError.value == ""){
        errorTitle.innerHTML = "Veuillez remplir le champs titre";
        errorTitle.classList.remove("valid");
        errorTitle.classList.add("noValid");
    }else{
        errorTitle.innerHTML = "";
        errorTitle.classList.add("valid");
        errorTitle.classList.remove("noValid");
    }
    // Erreur category
    // let categoryError = document.forms["form"]["category"];          
    let categoryError = document.getElementById("category"); 

    if((categoryError.value <= 0 ) || (categoryError.value > 3)){
        errorCategory.innerHTML = "Veuillez remplir le champs category";
        errorCategory.classList.remove("valid");
        errorCategory.classList.add("noValid");
    }else{
        errorCategory.innerHTML = "";
        errorCategory.classList.add("valid");
        errorCategory.classList.remove("noValid");
    }            
}

// Fonction pour ajouter un projet           
export async function addFile(){
    
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

    const picturePreview = document.querySelector(".preview")
    const divAjoutPhoto = document.querySelector(".add_photo")
    const errorCategory = document.querySelector("#error_category")

    if(response.status == 201){
        // alert("Photo ajoutée avec succés");    
        workGallery = await fetch("http://localhost:5678/api/works").then(works => works.json()) /*on récupère l'API puis on l'analyse en json*/

        const validMessageAjout = document.querySelector("#valid_message_ajout")

        validMessageAjout.innerHTML = "Projet ajouté";
        
        console.log(response)     
        // Met à jour la gallery
        genererWorks(workGallery); 
        // Met à jour la modal gallery               
        editWorks(workGallery) 
                    
        divAjoutPhoto.classList.toggle("visibility");
        picturePreview.classList.toggle("visibility");   
        
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
        alert("Vous n'êtes pas authorisé"); 
        form.reset() 
    } 
}

// Permet de fermer la modale en cliquant sur modalContent
export const stopPropagation = function(event){/*Prend en parametre l'evenement */
        event.stopPropagation()
    /*permet d'enlever la propagation de l'evenement vers les parents qui enlèvera le problème 
    de clic à l'interieur de la modale qui la fait se fermer */
    }
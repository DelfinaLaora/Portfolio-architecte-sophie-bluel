
// Récupération du formulaire
let form = document.querySelector("#loginForm");
console.log(form)

// Récupération message erreur submit
const errorSubmit = document.getElementById("errorSubmit");
console.log(errorSubmit)

//Creation addEventListener pour l'email
form.email.addEventListener("change", function(){ /*change = lorsque la case a changé et que l'on a perdu le focus(click en dehors du input), la case se modifie*/
    validerEmail(this);/*this = on passe l'événement que l'on écoute le input form.email*/
})

function validerEmail(email){
    
    //Création de la reg exp pour validation email
    let emailRegExp = new RegExp("^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$", 'g')/*entre accolade désigne le nombre de fois on doit trouver cet élément. Le flag 'marqueur' 'g' indique comment on doit lire cette regExp ici de façon globale*/

    // Récupération message erreur
    const errorMail = document.getElementById("errorMail");
    console.log(errorMail)
    
    // On test l'expression regulière
    if(emailRegExp.test(email.value)) {
        errorMail.innerHTML = "Adresse valide"
        errorMail.classList.remove("noValid")
        errorMail.classList.add("valid")           
    }else{
        errorMail.innerHTML = "Adresse non valide"
        errorMail.classList.remove("valid")
        errorMail.classList.add("noValid")        
    }      
};

//Creation addEventListener pour le mot de passe
form.password.addEventListener("change", function(){ /*change = lorsque la case a changé et que l'on a perdu le focus(click en dehors du input), la case se modifie*/
    validerPassword(this);/*this = on passe l'événement que l'on écoute le input form.password*/
})

function validerPassword(password){      
    // Récupération message erreur
    const errorPassword = document.getElementById("errorPassword");
    // console.log(errorPassword)
    let errorMessage;
    let passwordValide = false;
        
    // On test l'expression regulière

    //Il faut minimum 5 caractères
    if(form.password.value.length < 5){
        errorMessage = "Le mot de passe doit contenir plus de 5 caractères"        
    //Il faut des majuscule
    }else if(!/[A-Z]+/.test(password.value)){/*on dit si il n'y a pas donc on met le point d'exclamation avant la regExp*/
        errorMessage = "Le mot de passe doit contenir des majuscules"        
    //Il faut des minuscule
    }else if(!/[a-z]+/.test(password.value)){/*on dit si il n'y a pas donc on met le point d'exclamation avant la regExp*/
        errorMessage = "Le mot de passe doit contenir des minuscules"        
    //Mot de passe valide
    }else{        
        passwordValide = true;
    }

    // Message de validation on test l'expression reg
    if(passwordValide){
        errorPassword.innerHTML = "Le mot de passe est valide"
        errorPassword.classList.remove("noValid")
        errorPassword.classList.add("valid")
    }else{
        errorPassword.innerHTML = errorMessage
        errorPassword.classList.remove("valid")
        errorPassword.classList.add("noValid")
    }
}

// Soumission du formulaire
function gererForm(event){
    event.preventDefault();/*empêche l'envoie de données*/
   
    let userEmail = form.email.value;
    let userPass = form.password.value;
    getUserToken(userEmail, userPass)
   
    // window.localStorage.setItem("users", token)
    let token = window.localStorage.getItem("users");
    console.log(token)
    console.log("users", token)
    
    if(token == undefined){             
        errorSubmit.innerText = "Erreur mail ou mot de passe";
        errorSubmit.classList.remove("valid")
        errorSubmit.classList.add("noValid")
        // window.localStorage.removeItem("users")
        console.log(errorSubmit)       
    }else{
        document.location.href = "index.html";
        errorSubmit.innerText = "ok"
        errorSubmit.classList.remove("noValid")
        errorSubmit.classList.add("valid")        
    }
    
};

// Recherche des utilisateurs
async function getUserToken(email, password){
   
    let users = { 
        "email": email,
        "password": password
    };

    const response = await fetch("http://localhost:5678/api/users/login", {
    method :"POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=utf-8"
    },
    // Users est converti en une chaine de caractère au format JSON avec stringify
    body: JSON.stringify(users)
    })

    let token = await response.json();

    window.localStorage.setItem("users", token.token)
    // window.localStorage.setItem("users", token)
    console.log(token.token)
    console.log(email)
    console.log(password)
    
// return await response.json();
};

// let token = window.localStorage.getItem("users");
form.addEventListener("submit", gererForm)
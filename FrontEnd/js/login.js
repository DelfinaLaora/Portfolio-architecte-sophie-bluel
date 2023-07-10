

// Récupération du formulaire
let form = document.querySelector("#loginForm");
console.log(form)

// Récupération message erreur submit
const errorSubmit = document.getElementById("errorSubmit");
console.log(errorSubmit)

// Recherche des utilisateurs
async function getUserToken(email, password){
   
    let user = { 
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
        body: JSON.stringify(user)
    })

    if (response.ok){
        let token = await response.json();
        window.localStorage.setItem("user", token.token);
        window.localStorage.setItem("userId", token.userId);
        document.location.href = "index.html"     
    }else if(response.status == 401){
        window.localStorage.removeItem("user");
        errorSubmit.innerText = "Accés non autorisé" ;
        errorSubmit.classList.remove("valid");
        errorSubmit.classList.add("noValid")     
    }else{
        window.localStorage.removeItem("user");
        errorSubmit.innerText = "Veuillez créer un compte";
        errorSubmit.classList.remove("valid");
        errorSubmit.classList.add("noValid")        
    }       
// return await response.json();
};

// let token = window.localStorage.getItem("users");

form.addEventListener("submit", function(event){
    event.preventDefault()
    let userEmail = form.email.value;
    let userPass = form.password.value;
    getUserToken(userEmail, userPass)
})

const usuarios = [
    {
        email: "diego@gmail.com",
        password: "password1",
    },
    {
        email: "juan@gmail.com",
        password: "password2",
    },
    {
        email: "luis@gmail.com",
        password: "password3",
    }
];


function auth(){
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');

    if(emailInput.value && passwordInput.value){ 
        for (let user of usuarios){
            if(user.email == emailInput.value && user.password == passwordInput.value){
                console.log("nice auth");
                sessionStorage.setItem("auth", true);
                window.location = "../pages/home.html";
                return;
            }else{
                console.log("no nice");
            }
        }
    }else{
        console.log("no hay alguna de las 2");
    }
}

function logout(){
    sessionStorage.setItem("auth", false);
    window.location = "../index.html";
}
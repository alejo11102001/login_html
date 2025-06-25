const usuarios = [
    {  
        nombre: "Robinson",  
        apellido: "Cortes",  
        correo: "robinson@riwi.io",  
        contraseña: "password1", 
    },
    {
        nombre: "Antony",  
        apellido: "Martinez",  
        correo: "antorny@riwi.io",  
        contraseña: "password2", 
    }
];


function auth(){
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');

    if(emailInput.value && passwordInput.value){ 
        for (let user of usuarios){
            if(user.correo == emailInput.value && user.contraseña == passwordInput.value){
                console.log("nice auth");
                sessionStorage.setItem("auth", true);
                sessionStorage.setItem("nombreCompleto", user.nombre + " " + user.apellido);
                sessionStorage.setItem("correo", user.correo);
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

window.addEventListener('DOMContentLoaded', () => {
    let nombre = sessionStorage.getItem("nombreCompleto");
    document.getElementById("bienvenida").innerText = `Bienvenido/a, ${nombre}`;
    mostrarProductos();
});


function guardarProductos(productos) {
    let correo = sessionStorage.getItem("correo");
    localStorage.setItem("productos_" + correo, JSON.stringify(productos));
}

function obtenerProductos() {
    let correo = sessionStorage.getItem("correo");
    let clave = "productos_" + correo; 
    let productosTexto = localStorage.getItem(clave);

    if (productosTexto) {
        return JSON.parse(productosTexto);        
    } else {
        return [];                   
    }
}

function mostrarProductos() {
    let productos = obtenerProductos();
    let tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = ""; 

    productos.forEach((producto, i) => {
        tabla.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.descripcion}</td>
            <td><button onclick="eliminarProducto(${i})" class="btn btn-sm btn-danger">Eliminar</button></td>
        </tr>
        `;
    });
}

document.getElementById("formProducto").addEventListener("submit", function(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;

    let nuevo = { nombre, precio, descripcion };

    let productos = obtenerProductos();
    productos.push(nuevo);
    guardarProductos(productos);
    mostrarProductos();

    this.reset();
});

function eliminarProducto(indice) {
    let productos = obtenerProductos();
    productos.splice(indice, 1);
    guardarProductos(productos);
    mostrarProductos();
}


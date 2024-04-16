window.onload = function() {
    var tituloPagina = document.title;
    if (tituloPagina === "Panel de administrador") {
        paginaAdministrador();
    } else if (tituloPagina === "Negocio") {
        paginaNegocio();
    } else if (tituloPagina === "Inicio"){
        paginaIndex();
    }
};

function paginaIndex(){
    //alert("Hola! \n 1- Se debe ingresar a Panel de adminstrador para cargar listado en el Panel de Usuario (Se puede crear un producto) \n 2- Ingresar al Panel de usuario y realizar la compra de los items.");

    validacionStorageJSON = localStorage.getItem("productos");

    if(validacionStorageJSON === null || validacionStorageJSON === undefined || validacionStorageJSON === "{}"){
        console.log("Esta vacio");

        let productos = {
            perfumes: {
                maracuya: {
                    id: 0,
                    nombre: "Kit Maracuya",
                    descripcion: "Perfume con aroma sad as dasd  e tewcsfsedsd sdf sd ",
                    stock: 100,
                    precio: 13500,            
                },
                castanha: {
                    id: 1,
                    nombre: "Kit Castanha",
                    descripcion: "Perfume con aroma sad as dasd  e tewcsfsedsd sdf sd ",
                    stock: 100,
                    precio: 11000,            
                },
                faces: {
                    id: 2,
                    nombre: "Delin. Faces",
                    descripcion: "Perfume con aroma sad as dasd  e tewcsfsedsd sdf sd ",
                    stock: 100,
                    precio: 7500,            
                },
                facesDos: {
                    id: 3,
                    nombre: "Labial Faces",
                    descripcion: "Perfume con aroma sad as dasd  e tewcsfsedsd sdf sd ",
                    stock: 100,
                    precio: 4500,            
                },
                tododia: {
                    id: 4,
                    nombre: "Kit Tododía",
                    descripcion: "Perfume con aroma sad as dasd  e tewcsfsedsd sdf sd ",
                    stock: 100,
                    precio: 4800,            
                },
                erio: {
                    id: 5,
                    nombre: "Perfume Erio",
                    descripcion: "Perfume con aroma sad as dasd  e tewcsfsedsd sdf sd ",
                    stock: 100,
                    precio: 4800,            
                },
                arto: {
                    id: 6,
                    nombre: "Perfume Arto",
                    descripcion: "Perfume con aroma sad as dasd  e tewcsfsedsd sdf sd ",
                    stock: 100,
                    precio: 4800,            
                }
            }
        }
        let productosJSON = JSON.stringify(productos);
                localStorage.setItem("productos",productosJSON);
                console.log(productosJSON);





        console.log("Se lleno de informacion.");

    }else{
        console.log("Ya tenia informacion");
    }

}

function paginaAdministrador(){
    
    mostarProductos();
    
    function mostarProductos(){
        let mostrarInfo = document.getElementById("listado-productos");
        mostrarInfo.innerHTML = "<div><h2>Listado de productos creados</h2></div>";
    
        productosStorageJSON = localStorage.getItem("productos");
        productosStorage = JSON.parse(productosStorageJSON);

        productos = productosStorage;
    
        for(let perfume in productos.perfumes){
            mostrarInfo.innerHTML += 
            `<div class="listado-productos-item">
                <div class="productos-item">
                    <h4>ID</h4>
                    <div>${productos.perfumes[perfume].id}</div>
                </div>
                <div class="productos-item">
                    <h4>Nombre</h4>
                    <div>${productos.perfumes[perfume].nombre}</div>
                </div>
                <div class="productos-item">
                    <h4>Descripcion</h4>
                    <div>${productos.perfumes[perfume].descripcion}</div>
                </div>
                <div class="productos-item">
                    <h4>Sotck</h4>
                    <div>${productos.perfumes[perfume].stock}</div>
                </div >
                <div class="productos-item">
                    <h4>Precio</h4>
                    <div>${productos.perfumes[perfume].precio}</div>
                </div>
                <div class="productos-item">
                    <button type="button" name="${productos.perfumes[perfume].id}" class="borrar-item">Eliminar</button>
                </div>
            </div>`;
        };
    
        const eliminarRegistro = document.querySelectorAll(".borrar-item");
        eliminarRegistro.forEach(function(boton){
        boton.addEventListener("click", function(){
            let idBoton = parseInt(event.target.name);
            excluirRegistro(idBoton);
            mostarProductos();
        })
    }); 
    };
    
    const guardarRegistro = document.querySelector("#guardar-registro");
    guardarRegistro.addEventListener('click', function(){crearRegistro();});
    
    function crearRegistro(){
    
        let valorNombre = document.getElementById("valorNombre");    
        let valorDescripcion = document.getElementById("valorDescripcion");
        let valorStock = document.getElementById("valorStock");
        let valorPrecio = document.getElementById("valorPrecio");
        let mensaje = document.getElementById("registro-mensaje");
    
        let vNombre = (valorNombre.value);
        let vDescripcion = (valorDescripcion.value);
        let vStock = parseInt(valorStock.value);
        let vPrecio = parseInt(valorPrecio.value);
      
    
        if (vNombre.toString() === "") {
            mensaje.innerHTML =  `<h4>Campo nombre sin completar.</h4>`;
        } else if (vDescripcion.toString() === "") {
            mensaje.innerHTML =  `<h4>Campo Descripción sin completar.</h4>`;
        } else if (isNaN(vStock) || vStock <= 0) {
            mensaje.innerHTML =  `<h4>El valor del stock debe ser un número entero mayor o igual a 0.</h4>`
        } else if (isNaN(vPrecio) || vPrecio <= 0) {
            mensaje.innerHTML =  `<h4>El valor del precio debe ser un número entero mayor que 0.</h4>`
        } else {
    
            let idsOcupados = Object.values(productos.perfumes).map(perfume => perfume.id);
            let maxID = Math.max(...idsOcupados);
            let idDisponible = maxID+1;
            // console.log(maxID + 1);
    
    
            nuevoPerfume ={
                id: idDisponible,
                nombre: vNombre,
                descripcion: vDescripcion,
                stock: vStock,
                precio: vPrecio
            }
            productos.perfumes[vNombre] = nuevoPerfume;
    
            console.log(productos);
            
            valorNombre.value = "";
            valorDescripcion.value = "";
            valorStock.value = 0;
            valorPrecio.value = 0;
    
            let productosJSON = JSON.stringify(productos);
            localStorage.setItem("productos",productosJSON);
            console.log(productosJSON);
    
            mostarProductos();
        }
    }
    
    function excluirRegistro(idBoton){
        for(item in productos.perfumes){
            if(productos.perfumes[item].id == idBoton){
                delete productos.perfumes[item];
                console.log(productos);
            }
        }
    
        let productosJSON = JSON.stringify(productos);
        localStorage.setItem("productos",productosJSON);
        console.log(productosJSON);
    
        return;
    }
}

function paginaNegocio(){

    mostrarProductosUsuario();

    function mostrarProductosUsuario(){
    
        let mostrarInfoListado = document.getElementById("listado-productos-compra");
        // mostrarInfoListado.innerHTML = "<div><h2>Listado de productos creados</h2></div>";   

        productosStorageJSON = localStorage.getItem("productos");
        productosStorage = JSON.parse(productosStorageJSON);
        // console.log(productosStorage);
        productos = productosStorage;
    
        for(let perfume in productos.perfumes){
            mostrarInfoListado.innerHTML += 
            `
            <div class="card">
                <img src="../images/${productos.perfumes[perfume].id}.jpg" alt="Logo" class="card-imagen">
                <div class="card-titulo">${productos.perfumes[perfume].nombre}</div>
                <div class="card-precio">$ ${productos.perfumes[perfume].precio}</div>
                <div class="card-cantidad-seleccionada">
                    <button class="card-cantidad-seleccionada-menos boton-modificacion" type="button" name="${productos.perfumes[perfume].id}">-</button>
                    <input class="card-cantidad-seleccionada-cantidad" id="cantidad-${productos.perfumes[perfume].id}" type="number" value="0" min="0" readonly>                   
                    <button class="card-cantidad-seleccionada-mas boton-modificacion" name="${productos.perfumes[perfume].id}" type="button">+</button>
                </div>                
            </div> 
            `;
        };
}

    const botonMas = document.querySelectorAll(".card-cantidad-seleccionada-mas");
    botonMas.forEach(function(botonMas){
        botonMas.addEventListener("click", function(){
            let botonMasInfo = event.target.name.toString();
            let campoCantidad = document.getElementById("cantidad-"+botonMasInfo);
            let valorCantidad = parseInt(campoCantidad.value);
            valorCantidad++

            campoCantidad.value = valorCantidad;         
            sumatoria();

        })
    });

    const botonMenos = document.querySelectorAll(".card-cantidad-seleccionada-menos");
    botonMenos.forEach(function(botonMenos){
        botonMenos.addEventListener("click", function(){
            let botonMenosInfo = event.target.name.toString();
            
            let campoCantidad = document.getElementById("cantidad-"+botonMenosInfo);
            let valorCantidad = parseInt(campoCantidad.value);

            if(valorCantidad === 0){

            }else{
                valorCantidad--;
                campoCantidad.value = valorCantidad;
                sumatoria();                
            }             
        })
    });

    function sumatoria(){
        const idSumatoria = document.querySelectorAll(".card-cantidad-seleccionada-cantidad");
        let identificador, valorCantidad,sumaVariable;
        let unidades = 0;
        let total = 0;
        let mostrarCarritoInfo = document.querySelector("#carrito-mostrar");
        mostrarCarritoInfo.innerHTML = '';

        idSumatoria.forEach(function(cantidad){           
            identificador = cantidad.getAttribute("id");
            let cortarCadena = identificador.split("-");
            identificador = parseInt(cortarCadena[1]);
            valorCantidad = parseInt(cantidad.value);           

            for(let perfum in productos.perfumes){
                if (productos.perfumes[perfum].id == identificador){
                    sumaVariable =(valorCantidad * productos.perfumes[perfum].precio);
                    
                    carrito(identificador,productos.perfumes[perfum].nombre,productos.perfumes[perfum].precio, parseInt(valorCantidad));               
                }
            }
            unidades = parseInt(unidades + valorCantidad);
            total = parseInt(total + sumaVariable);
            
        }
        )
        let mostrarCantidad = document.getElementById("mostrarCantidad");
        mostrarCantidad.innerText = unidades;
        let mostrarTotal = document.getElementById("mostrarTotal");
        mostrarTotal.innerText = total;    
        let mostrarCarritoCantidad = document.querySelector("#carrito-mostrar-cantidad");
        mostrarCarritoCantidad.innerHTML = mostrarCarritoCantidad.innerHTML = "Carrito ("+unidades+")";
        let carritoModo = document.querySelector("#carrito");
        if (unidades > 0){
            carritoModo.classList.remove("carrito-sin-materiales");
            carritoModo.classList.add("carrito-con-materiales");
        } else {
            carritoModo.classList.remove("carrito-con-materiales");
            carritoModo.classList.add("carrito-sin-materiales");
        }
    }
}

function carrito (id, nombre, precio, cantidad){
        let idE = parseInt(id);
        let nombreProducto = nombre.toString();
        let precioProducto = parseInt(precio);
        let cantidadProducto = parseInt(cantidad);
        let mostrarCarritoInfo = document.querySelector("#carrito-mostrar");
        

        let matriz = [
            [idE, nombreProducto, precioProducto, cantidadProducto]
        ];
        
        // localStorage.setItem("carrito",carritoJSON);

        for (let i = 0; i < matriz.length; i++) {
            if (matriz[i][3] > 0){   
                mostrarCarritoInfo.innerHTML += 
                `<li class="carrito-item">
                    <img src="../images/${matriz[i][0]}.jpg" alt="Logo" class="card-imagen">
                    <div class="carrito-titulo">
                        <div>${matriz[i][1]}</div>
                        <div>Precio: ${matriz[i][2]}</div>    
                    </div>                   
                    <div class="carrito-precio">Cant:${matriz[i][3]}</div>       
                </li>`;
                
                // let carritoJSON = JSON.stringify(matriz[i][1]);
                // localStorage.setItem("carrito", carritoJSON);              
                
            }                
        }
        // console.log(carritoJSON);
    }


    informacionFecth();

    function informacionFecth(){

        let url = "https://api.github.com/users/";
        let usuario = "MgabrielM";

        fetch(url + usuario)
        .then(response => response.json())
        .then(data => mostrarUsuarioGit(data));
        
} 

function mostrarUsuarioGit(info){
    let contenedorAdmin = document.querySelector(".admin-informacion");
    contenedorAdmin.innerHTML = `
        <div>
            <img src="${info.avatar_url}" alt="Logo de perfil" class="imagen-perfil">
        </div>
        <div class="contenido-perfil">
            <h3>${info.name}</h3>
            <h4>GITHUB creado el día ${info.created_at}</h4>
            <h4>Repositorios creados: ${info.public_repos}</h4>
            <h4>Seguidores: ${info.followers}</h4>
            <h4>Siguiendo: ${info.following}</h4>
            <p>Ésta información está siendo traía desde GitHub, ¡inclusive la imagen!</p>
        </div>
    `;
    //console.log(info);
}




   

    
let carritoDeCompras = [];

const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonTerminar = document.getElementById('terminar')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

const seleccionTipo = document.getElementById('seleccionTipo')
const buscador = document.getElementById('search')

//stockProductos = (JSON.stringify('http://127.0.0.1:5500/archivos%20JS/Carrito/data.json'));
//mostrarProducto(stockProductos);

//Filtro por tipo de producto
seleccionTipo.addEventListener('change', () => {
    if (seleccionTipo.value == "todos"){
        mostrarProducto (stockProductos)
    } else {
        mostrarProducto( 
            stockProductos.filter((elemento) => elemento.tipo == seleccionTipo.value)
        )
    }
});
buscador.addEventListener('keypress', () =>{
    if (buscador.value == "todos"){
        mostrarProducto(stockProductos)
    } else {
        mostrarProducto(
            stockProductos.filter((elemento) => elemento.tipo == buscador.value)
        )
    }
})
contadorCarrito.addEventListener('click', () =>{
    mostrarProducto(stockProductos);
    console.log(contadorCarrito);
})

//Muestro los productos

//stockProductos = (JSON.stringify('http://127.0.0.1:5500/archivos%20JS/Carrito/data.json'));  
//console.log(stockProductos);
mostrarProducto(stockProductos);


//Logica e-commerce
function mostrarProducto(array){ 
    contenedorProductos.innerHTML = '';
    /* fetch('http://127.0.0.1:5500/archivos%20JS/Carrito/data.json')
        .then(resp => resp.json())
        .then(array => {
            item = ``
            array.forEach (item => {
                let div = document.createElement("div")
                div.classList.add("producto")
                div.innerHTML +=`
                <div class= "card">
                <div class = "card-img">
                    <img src=${item.img}>
                    <span class= "card-title">${item.name}</span>
                    <a  id="agregar${item.id}" class="btnAgregar">Agregar</i></a>
                </div>
                <div class="card-content">
                    
                    <p>Tipo: ${item.tipo}</p>
                    <p>$${item.price}</p>
                </div>
            </div>
        `;
                
           // })
       // })
        
    //*/
    array.forEach((item) =>{
        
    let div = document.createElement("div")
    div.classList.add("producto")
    div.innerHTML += `
        <div class= "card">
            <div class = "card-img">
                <img src=${item.img}>
                <span class= "card-title">${item.name}</span>
                <a  id="agregar${item.id}" class="btnAgregar">Agregar</i></a>
            </div>
            <div class="card-content">
                
                <p>Tipo: ${item.tipo}</p>
                <p>$${item.price}</p>
            </div>
        </div>
    `;
        contenedorProductos.appendChild(div);
        
        let btnAgregar = document.getElementById(`agregar${item.id}`)

        btnAgregar.addEventListener('click', () =>{
            agregarAlCarrito(item.id)
            let productoAgregar = stockProductos.find(
                (elemento) => elemento.id == item.id
            )
            localStorage.setItem('producto', JSON.stringify(productoAgregar))
            
            Toastify({
                text: "Agregado al carrito",
                className: "info",
                position: 'center',
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        })
    })
}


//Agregamos producto cliqueando al carrito
function agregarAlCarrito(id){
    let yaEsta = carritoDeCompras.find((item) => item.id == id)
    
    if (yaEsta){
        yaEsta.cantidad = yaEsta.cantidad + 1;
        document.getElementById(`und${yaEsta.id}`).innerHTML = `<p id=und${yaEsta.id}>Und: ${yaEsta.cantidad}</p>`;
        actualizarCarrito();
        setTimeout(() => {
            Toastify({
                text: "Este producto ya se encuentra en el carrito",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #fffff,#48c1e9, #add8e6)",
                }
            }).showToast();
        }, 500);
    } else {
        let productoAgregar = stockProductos.find((item) => item.id == id);             
        productoAgregar.cantidad = 1;
        carritoDeCompras.push(productoAgregar);
        actualizarCarrito();
        mostrarCarrito(productoAgregar);
    }
}

//Muestro productos agregads al carrito
function mostrarCarrito(productoAgregar){
    let div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
        <p>${productoAgregar.name}</p>
        <p>Precio: $${productoAgregar.price}</p>
        <p id= "und${productoAgregar.id}">Und: ${productoAgregar.cantidad}</p>
        <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i>X</button>
        `;
    contenedorModal.appendChild(div);

    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`);
    btnEliminar.classList.add("btnEliminar");

    btnEliminar.addEventListener('click', () => {
        if (productoAgregar.cantidad == 1){
            btnEliminar.parentElement.remove();
            carritoDeCompras = carritoDeCompras.filter(
                (item) => item.id != productoAgregar.id
            );

            Toastify({
                text: "Este producto fue removido del carrito",
                className: "info",
                position: 'center',
                style: {
                    background: "linear-gradient(to right, #010405, #ff0000)",
                }
            }).showToast();

            actualizarCarrito();
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
        } else {
            productoAgregar.cantidad = productoAgregar.cantidad - 1;
            document.getElementById(
                `und${productoAgregar.id}`
            ).innerHTML = `<p id=und${productoAgregar.id}>Und:${productoAgregar.cantidad}</p>`;
            actualizarCarrito();
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
        }
    });
}


//Actualizacion de "CANTIDAD" y "PRECIO"
function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce(
        (acc, el) => acc + el.cantidad, 0
    );
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) =>
    acc + el.price * el.cantidad, 0);
}

/*function recuperar(){*/
    let recuperarLS = JSON.parse(localStorage.getItem('carrito')) || []

    /*
    if (recuperarLS){
        recuperarLS.forEach((el) =>{
            mostrarCarrito(el);
            carritoDeCompras.push(el);
        actualizarCarrito();
        });
    }    
}

recuperar(); */
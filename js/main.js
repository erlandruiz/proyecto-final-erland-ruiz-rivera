// PRODUCTOS
const productos = [
    // Tuberias
    {
        id: "tuberia-01",
        titulo: "Tuberia 01",
        imagen: "./img/tuberias/01.jpg",
        categoria: {
            nombre: "Tuberias",
            id: "tuberias"
        },
        precio: 1000
    },
    {
        id: "tuberia-02",
        titulo: "Tuberia 02",
        imagen: "./img/tuberias/02.jpg",
        categoria: {
            nombre: "Tuberias",
            id: "tuberias"
        },
        precio: 1000
    },
    {
        id: "tuberia-03",
        titulo: "Tuberia 03",
        imagen: "./img/tuberias/03.jpg",
        categoria: {
            nombre: "Tuberias",
            id: "tuberias"
        },
        precio: 1000
    },
    {
        id: "tuberia-04",
        titulo: "Tuberia 04",
        imagen: "./img/tuberias/04.jpg",
        categoria: {
            nombre: "Tuberias",
            id: "tuberias"
        },
        precio: 1000
    },
    {
        id: "tuberia-05",
        titulo: "Tuberia 05",
        imagen: "./img/tuberias/05.jpg",
        categoria: {
            nombre: "Tuberias",
            id: "tuberias"
        },
        precio: 1000
    },
    // Grilletes
    {
        id: "grillete-01",
        titulo: "Grillete 01",
        imagen: "./img/grilletes/01.jpg",
        categoria: {
            nombre: "Grilletes",
            id: "grilletes"
        },
        precio: 1000
    },
    {
        id: "grillete-02",
        titulo: "Grillete 02",
        imagen: "./img/grilletes/02.jpg",
        categoria: {
            nombre: "Grilletes",
            id: "grilletes"
        },
        precio: 1000
    },
    {
        id: "grillete-03",
        titulo: "Grillete 03",
        imagen: "./img/grilletes/03.jpg",
        categoria: {
            nombre: "Grilletes",
            id: "grilletes"
        },
        precio: 1000
    },
    {
        id: "grillete-04",
        titulo: "Grillete 04",
        imagen: "./img/grilletes/04.jpg",
        categoria: {
            nombre: "Grilletes",
            id: "grilletes"
        },
        precio: 1000
    },
    {
        id: "grillete-05",
        titulo: "Grillete 05",
        imagen: "./img/grilletes/05.jpg",
        categoria: {
            nombre: "Grilletes",
            id: "grilletes"
        },
        precio: 1000
    },
    {
        id: "grillete-06",
        titulo: "Grillete 06",
        imagen: "./img/grilletes/06.jpg",
        categoria: {
            nombre: "Grilletes",
            id: "grilletes"
        },
        precio: 1000
    },
    {
        id: "grillete-07",
        titulo: "Grillete 07",
        imagen: "./img/grilletes/07.jpg",
        categoria: {
            nombre: "Grilletes",
            id: "grilletes"
        },
        precio: 1000
    },
    {
        id: "grillete-08",
        titulo: "Grillete 08",
        imagen: "./img/grilletes/08.jpg",
        categoria: {
            nombre: "Grilletes",
            id: "grilletes"
        },
        precio: 1000
    },
    // Cables
    {
        id: "cable-01",
        titulo: "Cable 01",
        imagen: "./img/cables/01.jpg",
        categoria: {
            nombre: "Cables",
            id: "cables"
        },
        precio: 1000
    },
    {
        id: "cable-02",
        titulo: "Cable 02",
        imagen: "./img/cables/02.jpg",
        categoria: {
            nombre: "Cables",
            id: "cables"
        },
        precio: 1000
    },
    {
        id: "cable-03",
        titulo: "Cable 03",
        imagen: "./img/cables/03.jpg",
        categoria: {
            nombre: "Cables",
            id: "cables"
        },
        precio: 1000
    },
    {
        id: "cable-04",
        titulo: "Cable 04",
        imagen: "./img/cables/04.jpg",
        categoria: {
            nombre: "Cables",
            id: "cables"
        },
        precio: 1000
    },
    {
        id: "cable-05",
        titulo: "Cable 05",
        imagen: "./img/cables/05.jpg",
        categoria: {
            nombre: "Cables",
            id: "cables"
        },
        precio: 1000
    }
];


/**Traendo las variables del DOM */

const contenedorProductos = document.querySelector('#contenedor-productos')

const botonesCategorias = document.querySelectorAll('.boton-categoria')

const tituloPrincipal = document.querySelector('#titulo-principal')


let botonesAgregar = document.querySelectorAll('.producto-agregar')

const numerito = document.querySelector('#numerito')


/**Mostrar todos los productos*/
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = ''
    
    productosElegidos.forEach((producto)=>{
        
       
        const div = document.createElement('div')
       

        div.classList.add('producto')
       
        div.innerHTML = ` 
        <img class="producto-imagen" src="${producto.imagen}" alt= '${producto.titulo}'>
        <div class="producto-detalles" >
            <h3 class="producto-titulo" >${producto.titulo}</h3>
            <p class="producto-precio" >$${producto.precio}</p>
            <button class="producto-agregar" id = '${producto.id}'>Agregar</button>
        </div>
    `
    actualizarBotonesAgregar()
        contenedorProductos.append(div)
   

    })
    actualizarBotonesAgregar()
}

cargarProductos(productos)

// haciendo el addEventListener para todos los botones 

botonesCategorias.forEach((boton)=>{

    boton.addEventListener('click', (e)=>{
        botonesCategorias.forEach(boton => boton.classList.remove('active'))

        e.currentTarget.classList.add('active')

        if (e.currentTarget.id != 'todos') {
            
        
        const productoCategoria = productos.find((producto)=> producto.categoria.id === e.currentTarget.id)

        
        tituloPrincipal.innerText = productoCategoria.categoria.nombre
        

        /**filter crea un array de los productos que coincidan con esta condicion */
        const productosBoton = productos.filter((producto)=> producto.categoria.id === e.currentTarget.id)


        cargarProductos(productosBoton)
        } else {
            tituloPrincipal.innerText = 'Todos los productos'
            cargarProductos(productos)
        }
    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll('.producto-agregar')

    botonesAgregar.forEach((boton)=>{
        boton.addEventListener('click', agregarAlCarrito)

        
  
    })

}






let productosEnCarrito

/**Trayendo  del local storage la data */
let productosEnCarritoLS = localStorage.getItem('productos-en-carrito')


/**Verificando si hay algo en productos en carrito */

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS)
    actualizarNumerito()
} else {
    productosEnCarrito = []
}





function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find( producto=> producto.id === idBoton)

    /**Comprobar si existe el producto en productosEncarrito con some*/
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {

        /**Comprueba en que indice esta el producto */
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++
    } else {

        /**Asignamos una propiedad nueva cantidad ****/
        productoAgregado.cantidad = 1
        productosEnCarrito.push(productoAgregado)
    }

    actualizarNumerito()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

    /**Agregando verificacion Sweet Alert */
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `El producto ${productoAgregado.titulo} fue agregado con éxito`,
        showConfirmButton: false,
        timer: 1500
      })

}

function actualizarNumerito() {

    /*Utilizamos la funcion reduce para acular el numero de compras*/
    let  nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)

    numerito.innerText = nuevoNumerito
}
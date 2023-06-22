const urlProducts = "https://64937e8a0da866a953667548.mockapi.io/api/v1/productos2"

const contenedorProductosMockapi = document.querySelector('#contenedor-productos-mockapi')
const productos2 =[]

const formulario = document.querySelector('#formulario')


// Datos que se subiran al mockapi

const idMockpi = document.querySelector('#id-mockapi')
const tituloMockapi = document.querySelector('#titulo-mockapi')

const imagenMockapi = document.querySelector('#imagen-mockapi')
const categoriaNombreMockapi = document.querySelector('#categoria-nombre-mockapi')
const categoriaIdMockapi = document.querySelector('#categoria-id-mockapi')
const precioMockapi = document.querySelector('#precio-mockapi')


formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    const producto3 = {
        id: idMockpi.value,
        titulo: tituloMockapi.value,
        imagen: imagenMockapi.value,
        categoria:{
            nombre: categoriaNombreMockapi.value,
            id: categoriaIdMockapi.value
        },
        precio: parseInt(precioMockapi.value)
    }
    crearProductoAsync(producto3)
    

})



// Traendo los productos de mockApi
function traerProductos() {
    fetch(urlProducts)
    .then((res)=> res.json())
    .then((data)=>{
        productos2.push(...data)

        // console.log(productos2)
        // console.log(data)
        cargarProductosMockapi()
    });
}

traerProductos()

// Cargando los productos del mockapi
function cargarProductosMockapi() {
    contenedorProductosMockapi.innerHTML= ''

    productos2.forEach(producto=>{
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles" >
                    <h3 class="producto-titulo" >${producto.titulo}</h3>
                    <p class="producto-precio" >$${producto.precio}</p>
            </div>`

            contenedorProductosMockapi.append(div)

           
    })
    
}

// Creando un producto para subir al mockapi

async function crearProductoAsync(producto){
    const resp = await fetch(urlProducts, {
        method: "POST",
        body: JSON.stringify(producto),
        headers:{
            "Content-Type": "application/json"
        }

    })

    const data = await resp.json()
    traerProductos()

    console.log(data)
}


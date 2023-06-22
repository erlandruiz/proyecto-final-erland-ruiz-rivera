let productosEnCarrito = localStorage.getItem('productos-en-carrito')
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector('#carrito-vacio')
const contenedorCarritoProductos = document.querySelector('#carrito-productos')
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones')
const contenedorCarritoComprado = document.querySelector('#carrito-comprado')

/**Este variable se captura del innerHTML que se crea con el nuevo div**/

let botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar')


const botonVaciar = document.querySelector('#carrito-acciones-vaciar')

const total = document.querySelector('#total')

const botonComprar = document.querySelector('#carrito-acciones-comprar')

function cagarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        

        contenedorCarritoVacio.classList.add('disabled')
        contenedorCarritoProductos.classList.remove('disabled')
        contenedorCarritoAcciones.classList.remove('disabled')
        contenedorCarritoComprado.classList.add('disabled')
    
        contenedorCarritoProductos.innerHTML = ''
    
        productosEnCarrito.forEach((producto)=>{
            const div = document.createElement('div')
            div.classList.add('carrito-producto')
    
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
    
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
            </div>
    
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
    
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
    
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
    
            <button class="carrito-producto-eliminar" id= '${producto.id}'>
                <i class="bi bi-trash-fill"></i>
            </button>
            `
    
            contenedorCarritoProductos.append(div)
    
        })
    
    } else {
        contenedorCarritoVacio.classList.remove('disabled')
        contenedorCarritoProductos.classList.add('disabled')
        contenedorCarritoAcciones.classList.add('disabled')
        contenedorCarritoComprado.classList.add('disabled')
    }

    actualizarBotonesEliminar()
    actualizarTotal()




}

cagarProductosCarrito()

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar')

    botonesEliminar.forEach((boton)=>{


        boton.addEventListener('click', elminarDelCarrito)


    })
}


function elminarDelCarrito(e) {
    const idBoton = e.currentTarget.id
    const productoEliminado = productosEnCarrito.find((producto)=> producto.id === idBoton)
    const index = productosEnCarrito.findIndex((producto)=> producto.id === idBoton)
    
    productosEnCarrito.splice(index, 1)
    cagarProductosCarrito()
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito))


         /**Agregando  Toastify */

      Toastify({

        text: `El producto ${productoEliminado.titulo} fue eliminado (☹) `,
        
        duration: 3000
        
        }).showToast();
      


   






}

botonVaciar.addEventListener('click', vaciarCarrito)

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito))
    cagarProductosCarrito()

    /**Agregando  Toastify */
    Toastify({

        text: "Carrito fue vaciado (☹)",
        
        duration: 2000,

        close: true,
        
        }).showToast();


        /**Agregando  SetTimeOut */
        setTimeout(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: `Si desea seguir comprando puede dar click en Seguir comprando`,
                showConfirmButton: false,
                timer: 5000
              })



        }, 2100);
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}

botonComprar.addEventListener('click', comprarCarrito)

function comprarCarrito() {
    productosEnCarrito.length = 0
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito))

    

// Utilizando then y cath con promesas para esperar el pago exitoso, se hardcodea para ser pago exitoso
    articulosPagados()
        .then((res)=>{

               /**Agregando  SetTimeOut */
            setTimeout(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${res}`,
                    showConfirmButton: false,
                    timer: 1500
                  }),

                contenedorCarritoVacio.classList.add('disabled')
                contenedorCarritoProductos.classList.add('disabled')
                contenedorCarritoAcciones.classList.add('disabled')
                contenedorCarritoComprado.classList.remove('disabled')
            


                
            }, 3000);

        })
        .catch((err)=>{})
   

}


// Simulación con promesas para esperar el pago exitoso

function articulosPagados() {
    return new Promise ((resolve, reject)=>{


        Toastify({

            text: "Esperando el pago.....",
            
            duration: 2500,
    
            

            position: "center"
            
            }).showToast();


            resolve('El pago fue exitoso')

       
    })
}



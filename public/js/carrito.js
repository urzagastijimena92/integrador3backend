import { mostrarMensaje } from './inicio.js';
import servicioCarrito from './servicioCarrito.js';

let refBotonBorrar
let refBotonPedir
let subtotal

var carrito = []

function guardar() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function leer() {
    try {
        return JSON.parse(localStorage.getItem('carrito'))
    }
    catch {
        return []
    }  
}

function agregar(producto) {
    let pC = carrito.find(prodC => prodC.id == producto.id)

    if(!pC) {
        producto.cantidad = 1
        carrito.push(producto)
    }
    else {
        pC.cantidad++
    }
    guardar()
}

function borrarID(id){
    const index = carrito.findIndex(p => p.id == id)
    carrito.splice(index,1)
    guardar()
}

function incrementarCantID(id) {
    const producto = carrito.find(p => p.id == id)
    if(producto.cantidad < producto.vacantes) {
        producto.cantidad++
        guardar()
    }
}

function decrementarCantID(id) {
    const producto = carrito.find(p => p.id == id)
    if(producto.cantidad > 1) {
        producto.cantidad--
        guardar()
    }
}

function borrar() {
        carrito = []
        guardar()
        render()
        mostrarMensaje('¡Carrito eliminado correctamente!')

}

async function pedir() {
    await servicioCarrito.enviar({pedido: carrito})

    carrito = []
    guardar()
    mostrarMensaje('¡Su pedido se realizó con éxito!')
    render()
}

// -----------------------------RENDER DE CARRITO EN TABLA--------------------------

function render() {

    var filasTabla = `<tr>
                        <th>foto</th>
                        <th>nombre del curso</th>
                        <th>precio</th>
                        <th>vacantes disponibles</th>
                        <th>vacantes solicitadas</th>
                        <th>acciones</th>
                        <th>subtotal</th>
                    </tr>`


    if(carrito && carrito.length) {
        for(var i=0; i<carrito.length; i++) {
            filasTabla += 
                `<tr> 
                    <td><img width="100%" src=" ${carrito[i].foto}" alt="foto de ${carrito[i].nombre}"></td>
                    <td>${carrito[i].nombre} </td>
                    <td> $${carrito[i].precio}</td>
                    <td>${carrito[i].vacantes}</td>
                    <td style="min-width:115px;">
                        <button id="btnDecrementar-${carrito[i].id}">-</button>
                        &nbsp${subtotal = carrito[i].vacantes >= carrito[i].cantidad ? carrito[i].cantidad : carrito[i].vacantes}&nbsp
                        <button id="btnIncrementar-${carrito[i].id}">+</button>
                    </td>
                    <td>
                        <button id="btnBorrar-${carrito[i].id}">Borrar</button>
                    </td>
                    <td id="total"> $${subtotal * carrito[i].precio}</td>
                </tr>`  
        }

        if(true){
            filasTabla +=
            `<tr> 
                <th style="border: none;"></th>
                <th style="border: none;"></th>
                <th style="border: none;"></th>
                <th style="border: none;"></th>
                <th style="border: none;"></th>
                <th style="color:#FBD63D; border: none;">Total:</th>
                <th style="border: none; min-width: 130px;">$ ${carrito.reduce((acc, p) => acc + p.precio*p.cantidad, 0).toFixed(2)}</th>
            </tr>`
        }

        refBotonBorrar.style.display = 'block'
        refBotonPedir.style.display = 'block'
    }
    else {
        filasTabla = '<h2>No se encontraron pedidos para mostrar</h2>'
        refBotonBorrar.style.display = 'none'
        refBotonPedir.style.display = 'none'
    }

    document.querySelector('table').innerHTML = filasTabla
   
    setListeners()

}

// ------------------------------LISTENERS DE BOTONES EN CARRITO------------------------------
    
function setListeners() {
    const botonesEliminar = document.querySelectorAll('.carrito table button[id*="btnBorrar-"]')
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', async e => {
            const id = e.target.id.split('-')[1]

            borrarID(id)
            render()
            mostrarMensaje('¡Curso eliminado del carrito!')
        })
    })

    const botonesIncrementar = document.querySelectorAll('.carrito table button[id*="btnIncrementar-"]')
    botonesIncrementar.forEach(boton => {
        boton.addEventListener('click', async e => {
            const id = e.target.id.split('-')[1]
    
            incrementarCantID(id)
            render()
        })
    })

    const botonesDecrementar = document.querySelectorAll('.carrito table button[id*="btnDecrementar-"]')
    botonesDecrementar.forEach(boton => {
        boton.addEventListener('click', async e => {
            const id = e.target.id.split('-')[1]
            decrementarCantID(id)
            render()
        })
    })

    refBotonBorrar.addEventListener('click', borrar)
    refBotonPedir.addEventListener('click', pedir)

}


function start(){

    refBotonBorrar = document.querySelector('.carrito .btn-borrar')
    refBotonPedir = document.querySelector('.carrito .btn-pedir')

    carrito = leer()
    render()
}

export default{
    start, 
    agregar
}


import { mostrarMensaje } from './inicio.js';
import productosMem from './productosMem.js';
import servicioProductos from './servicioProductos.js';

let editarID = null

let refBtnAgregarActualizar

let refCodigo 
let refNombre 
let refPrecio 
let refVacantes
let refDuracion
let refCategoria
let refDetalles
let refFoto
let refCuotas

let refErrorCodigo
let refErrorNombre 
let refErrorPrecio
let refErrorVacantes   
let refErrorDuracion
let refErrorDetalles
let refErrorFoto



async function agregarActualizar(e) {
    e.preventDefault()

   
    const codigo = refCodigo.value
    const nombre = refNombre.value
    const precio = refPrecio.value
    const vacantes = refVacantes.value
    const duracion = refDuracion.value
    const categoria = refCategoria.value
    const detalles = refDetalles.value
    const foto = refFoto.value
    const cuotas = refCuotas.checked

    const producto = {
        codigo : codigo,
        nombre : nombre,
        precio : precio,
        vacantes : vacantes,
        duracion : duracion,
        categoria : categoria,
        detalles : detalles,
        foto : foto,
        cuotas : cuotas

    }
    
    if(editarID) {
        producto.id = editarID
        const productoActualizado = await servicioProductos.actualizar(editarID,producto)
        productosMem.actualizar(productoActualizado.id, producto)
        editarID = null
        ponerBotonAgregar() 
    }
    else {
        let productoGuardado = await servicioProductos.guardar(producto)
        productosMem.guardar(productoGuardado)
    }

    render()
    borrarForm()
    mostrarMensaje('¡Curso agregado/actualizado con éxito!')
}


function borrarForm() {
    refCodigo.value = ''
    refNombre.value = ''
    refPrecio.value = ''
    refVacantes.value = ''
    refDuracion.value = ''
    refCategoria.value = ''
    refDetalles.value = ''
    refFoto.value = ''
    refCuotas.checked = false
}

function copiarProductoEnForm(producto) {

    for(let campo in producto) {
        const ref = document.getElementById(campo)
        if(ref) ref[ref.id == 'cuotas' ? 'checked' : 'value'] = producto[campo]
        
    }
}

function ponerBotonAgregar() {
    refBtnAgregarActualizar.classList.remove('btn-actualizar')
    refBtnAgregarActualizar.classList.add('btn-agregar')
    refBtnAgregarActualizar.innerText= 'Agregar Curso'
}

function ponerBotonActualizar() {
    refBtnAgregarActualizar.classList.remove('btn-agregar')
    refBtnAgregarActualizar.classList.add('btn-actualizar')
    refBtnAgregarActualizar.innerText= 'Actualizar Curso'
}

// --------------------------------  RENDER DE TABLA DE ALTA  ----------------------------------
function render() {
    
    let productos = productosMem.getAll()

    var filasTabla = `<tr>
                        <th>código</th>
                        <th>nombre</th>
                        <th>precio</th>
                        <th>vacantes</th>
                        <th>duración</th>
                        <th>categorías</th>
                        <th>detalles</th>
                        <th>foto</th>
                        <th> 6 Cuotas sin interés</th>
                        <th>acciones</th>
                    </tr>`

    if(productos.length) {
        for(var i=0; i<productos.length; i++) {
            filasTabla += 
                `<tr>
                    <td style="background:#FBD63D;"><b>${productos[i].codigo}</b></td>
                    <td>${productos[i].nombre} </td>
                    <td> $${productos[i].precio}</td>
                    <td> ${productos[i].vacantes}</td>
                    <td> ${productos[i].duracion}</td>
                    <td style="min-width:90px;"> ${productos[i].categoria}</td>
                    <td style="min-width:100px;"> ${productos[i].detalles}</td>
                    <td><img width="100%" src=" ${productos[i].foto}" alt="foto de ${productos[i].nombre}"></td>
                    <td>${productos[i].cuotas? 'Si':'No'}</td>
                    <td>
                        ${ editarID && editarID == productos[i].id
                            ? `<button id="btnCancelar-${productos[i].id}">Cancelar</button>` 
                            : `<button id="btnEditar-${productos[i].id}">Editar</button>`
                        }
                        <button ${editarID? 'disabled' : ''} id="btnBorrar-${productos[i].id}">Borrar</button>
                        </td>

                </tr>`
        }
           
    }
    else filasTabla = '<h2>No se encontraron productos para mostrar</h2>'

    document.querySelector('table').innerHTML = filasTabla
    setListeners()
}
// ----------------------------LISTENERS DE BOTONES EN TABLA DE ALTA-----------------------------

function setListeners() {
    const botonesEliminar = document.querySelectorAll('.alta button[id*="btnBorrar-"]')
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', async e => {
            const id = e.target.id.split('-')[1]
            
                const productoEliminado = await servicioProductos.eliminar(id)
                productosMem.eliminar(productoEliminado.id)
     
                if(editarID) {
                     editarID = null
                     ponerBotonAgregar()
                     borrarForm()
                }
               
                render()
                mostrarMensaje('Curso eliminado correctamente')
        })
    })

    const botonesEditar = document.querySelectorAll('.alta button[id*="btnEditar-"]')
    botonesEditar.forEach(boton => {
        boton.addEventListener('click', e => {
            const id = e.target.id.split('-')[1]
            
            editarID = id
            ponerBotonActualizar()

            let producto = productosMem.get(id)
            copiarProductoEnForm(producto)

            render()
            
        })
    })
    const botonesCancelar = document.querySelectorAll('.alta button[id*="btnCancelar-"]')
    botonesCancelar.forEach(boton => {
        boton.addEventListener('click', e => {
            const id = e.target.id.split('-')[1]
            
            editarID = null

            ponerBotonAgregar()
            borrarForm()
            render()         
        })
    })
}


// ----------------------------  VALIDACIÓN DE INPUTS EN FORMULARIO  ------------------------------------

function activarBtnAgregar(){
    refBtnAgregarActualizar.disabled = false;
    refBtnAgregarActualizar.style.opacity = 1;
}

function desactivarBtnAgregar(){
    refBtnAgregarActualizar.disabled = true;
    refBtnAgregarActualizar.style.opacity = 0.5;
}

function validarCodigo() {
    if (refCodigo.value.trim() === '') {
        refErrorCodigo.style.display = 'block';
        refErrorCodigo.textContent = 'El código del curso es obligatorio';
        return false;
    } else if (Number(refCodigo.value) < 0) {
        refErrorCodigo.style.display = 'block';
        refErrorCodigo.textContent = '¡El código debe ser un número positivo!';
        return false;
    } else if (Number(refCodigo.value) > 999) {
        refErrorCodigo.style.display = 'block';
        refErrorCodigo.textContent = '¡El código no debe superar 3 cifras!';
        return false;    
    } else {
        activarBtnAgregar()
        refErrorCodigo.textContent = '';
        refErrorCodigo.style.display = 'none';
        return true;
    }
}

function validarNombre() {
    const validadorNombre = /^[A-Z][\s\S]{1,46}$/
    if (refNombre.value.trim() === '') {
        refErrorNombre.style.display = 'block';
        refErrorNombre.textContent = 'El nombre del curso es obligatorio';
        return false;
    }else if (!validadorNombre.test(refNombre.value)) {
        refErrorNombre.style.display = 'block';
        refErrorNombre.textContent = 'El nombre debe comenzar con mayúscula y tener entre 2 y 45 caracteres';
        return false;
    } else {
        activarBtnAgregar()
        refErrorNombre.textContent = '';
        refErrorNombre.style.display = 'none';        
        return true;
    }
}

function validarPrecio() {
    if (refPrecio.value.trim() === '') {
        refErrorPrecio.style.display = 'block';
        refErrorPrecio.textContent = 'El precio del curso es obligatorio';
        return false;
    } else if (Number(refPrecio.value) < 0) {
        refErrorPrecio.style.display = 'block';
        refErrorPrecio.textContent = '¡El precio debe ser un número positivo!';
        return false;
    } else {
        activarBtnAgregar()
        refErrorPrecio.textContent = '';
        refErrorPrecio.style.display = 'none';
        return true;
    }
}

function validarVacantes() {
    if (refVacantes.value.trim() === '') {
        refErrorVacantes.style.display = 'block';
        refErrorVacantes.textContent = 'Vacantes es obligatorio';
        return false;
    } else if (Number(refVacantes.value) <= 0) {
        refErrorVacantes.style.display = 'block';
        refErrorVacantes.textContent = '¡Vacantes debe ser mayor o igual a 1!';
        return false;
    } else {
        activarBtnAgregar()
        refErrorVacantes.textContent = '';
        refErrorVacantes.style.display = 'none';        
        return true;
    }
}

function validarDuracion() {
    const validadorDuracion = /^[A-Za-z0-9\s]{4,20}$/
    if (refDuracion.value.trim() === '') {
        refErrorDuracion.style.display = 'block';
        refErrorDuracion.textContent = 'La duración es obligatoria';
        return false;
    } else if (!validadorDuracion.test(refDuracion.value)) {
        refErrorDuracion.style.display = 'block';
        refErrorDuracion.textContent = 'Debe tener entre 4 y 20 caracteres, solo alfanuméricos';
        return false;
    } else {
        activarBtnAgregar()
        refErrorDuracion.textContent = '';
        refErrorDuracion.style.display = 'none';
        return true;
    }
}


function validarDetalles() {
    if (refDetalles.value.trim() === '') {
        refErrorDetalles.style.display = 'block';
        refErrorDetalles.textContent = 'Detalles es obligatorio';
        return false;
    } else {
        activarBtnAgregar()
        refErrorDetalles.textContent = '';
        refErrorDetalles.style.display = 'none';
        return true;
    }
}

function validarFoto() {
    if (refFoto.value.trim() === '') {
        refErrorFoto.style.display = 'block';
        refErrorFoto.textContent = 'La Foto es obligatoria';
        return false;
    } else {
        activarBtnAgregar()
        refErrorFoto.textContent = '';
        refErrorFoto.style.display = 'none';
        return true;
    }
}


function formValidar(){

    refCodigo.addEventListener('blur', validarCodigo);
    refNombre.addEventListener('blur', validarNombre);
    refPrecio.addEventListener('blur', validarPrecio);
    refVacantes.addEventListener('blur', validarVacantes);
    refDuracion.addEventListener('blur', validarDuracion);
    refDetalles.addEventListener('blur', validarDetalles);
    refFoto.addEventListener('blur', validarFoto);

    const formularioEsValido = validarCodigo() && validarNombre() && validarPrecio() && validarVacantes() && validarDuracion() && validarDetalles() && validarFoto();

    if (!formularioEsValido) {
        desactivarBtnAgregar();
    } else {
        activarBtnAgregar()
    }
    return formularioEsValido;

  }
  

// ----------------------------------------  START  --------------------------------------------------------

async function start() { 

    refCodigo = document.getElementById('codigo')
    refNombre = document.getElementById('nombre')
    refPrecio = document.getElementById('precio')
    refVacantes = document.getElementById('vacantes')
    refDuracion = document.getElementById('duracion')
    refCategoria = document.getElementById('categoria')
    refDetalles = document.getElementById('detalles')
    refFoto = document.getElementById('foto')
    refCuotas = document.getElementById('cuotas')

    refBtnAgregarActualizar = document.querySelector('.alta .alta-form button')
    
    refErrorCodigo = document.getElementById('errorCodigo');
    refErrorNombre = document.getElementById('errorNombre');
    refErrorPrecio = document.getElementById('errorPrecio');
    refErrorVacantes = document.getElementById('errorVacantes');
    refErrorDuracion = document.getElementById('errorDuracion');
    refErrorDetalles = document.getElementById('errorDetalles');
    refErrorFoto = document.getElementById('errorFoto');
    
    const formAlta = document.querySelector('.alta-form')
    formAlta.addEventListener('submit', agregarActualizar)

    refBtnAgregarActualizar.addEventListener('click', formValidar)

    let productos = await servicioProductos.getAll()
    productosMem.set(productos)

    render()
}


export default {
    start
}

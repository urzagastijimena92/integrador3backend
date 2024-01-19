import { mostrarMensaje } from './inicio.js';

function start(){

let refNombreContacto = document.getElementById('nombre')
let refEmail = document.getElementById('email')
let refMensaje = document.getElementById('mensaje')

let refErrorNombreContacto = document.getElementById('errorNombreContacto')
let refErrorEmail = document.getElementById('errorEmail')
let refErrorMensaje = document.getElementById('errorMensaje')

let refBtnEnviar = document.getElementById('enviar')
let refBtnRestablecer = document.getElementById('restablecer')

let formContacto = document.querySelector('.contacto-form')


function limpiarForm(){
    refNombreContacto.value = '';
    refEmail.value = '';
    refMensaje.value = '';
}

function activarBtnEnviar(){
    refBtnEnviar.disabled = false;
    refBtnEnviar.style.opacity = 1;
}

function desactivarBtnEnviar(){
    refBtnEnviar.disabled = true;
    refBtnEnviar.style.opacity = 0.5;
}

// -----------------------------VALIDACIÓN DE INPUTS DE CONTACTO------------------------

function validarNombreContacto(){
    const validadorNombreContacto = /^[a-zA-Z\s]{3,20}$/
    if (refNombreContacto.value.trim() === '') {
        refErrorNombreContacto.style.display = 'block';
        refErrorNombreContacto.textContent = 'El nombre es obligatorio';
        return false;
    } else if (!validadorNombreContacto.test(refNombreContacto.value)) {
        refErrorNombreContacto.style.display = 'block';
        refErrorNombreContacto.textContent = 'Debe tener entre 3 y 20 caracteres, solo alfabéticos';
        return false;
    } else {
        activarBtnEnviar()
        refErrorNombreContacto.textContent = '';
        refErrorNombreContacto.style.display = 'none';
        return true;
    }
}

function validarEmail(){
    const validadorEmail = /^\w+@\w+\.\w{2,3}(\.[a-z]{2,3})?$/
    if (refEmail.value.trim() === '') {
        refErrorEmail.style.display = 'block';
        refErrorEmail.textContent = 'El email es obligatorio';
        return false;
    } else if (!validadorEmail.test(refEmail.value)) {
        refErrorEmail.style.display = 'block';
        refErrorEmail.textContent = 'Debe ser un email válido';
        return false;
    } else {
        activarBtnEnviar()
        refErrorEmail.textContent = '';
        refErrorEmail.style.display = 'none';
        return true;
    }
}

function validarMensaje(){
    const validadorMensaje = /.{5,}/
    if (refMensaje.value.trim() === '') {
        refErrorMensaje.style.display = 'block';
        refErrorMensaje.textContent = 'Debe escribir su mensaje';
        return false;
    } else if (!validadorMensaje.test(refMensaje.value)) {
        refErrorMensaje.style.display = 'block';
        refErrorMensaje.textContent = 'Debe tener al menos 5 caracteres';
        return false;
    } else {
        activarBtnEnviar()
        refErrorMensaje.textContent = '';
        refErrorMensaje.style.display = 'none';
        return true;
    }
}

// ----------------------------VALIDACIÓN GENERAL DE FORMULARIO DE CONTACTO------------------

function formValido(){
    refNombreContacto.addEventListener('input', validarNombreContacto);
    refEmail.addEventListener('input', validarEmail);
    refMensaje.addEventListener('input', validarMensaje);

    const formularioEsValido = validarNombreContacto() && validarEmail() && validarMensaje();

    if (!formularioEsValido) {
        desactivarBtnEnviar();
    } else {
        activarBtnEnviar()
        limpiarForm()
        mostrarMensaje('¡Mensaje enviado!')
      
    }
    return formularioEsValido;

}


formContacto.addEventListener('submit', e => {
        e.preventDefault()

        formValido()

        refBtnRestablecer.addEventListener("click", function() {
            refErrorNombreContacto.style.display = 'none';
            refErrorEmail.style.display = 'none';
            refErrorMensaje.style.display = 'none';
        });
    }
)}


export default{
    start
}
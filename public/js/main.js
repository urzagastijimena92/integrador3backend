import alta from './alta.js';
import carrito from './carrito.js';
import contacto from './contacto.js';
import cursos from './cursos.js';
import inicio from './inicio.js';
import nosotros from './nosotros.js';
import { volverArriba } from './volver-arriba.js';

/* ----------------------------  CARGA DE MAIN/PLANTILLAS  ----------------------------------- */
window.onload = startMain

function cargarPlantilla(id){

    id = id || 'inicio'

    const main = document.querySelector('main')
    const start = {
        inicio : inicio.start,
        alta : alta.start,
        nosotros : nosotros.start,
        carrito : carrito.start,
        contacto : contacto.start,
        cursos : cursos.start
    }

    const url = './plantillas/' + id + '.html'

    const xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.addEventListener('load', ()=> {
        if(xhr.status == 200) {
            let plantilla = xhr.response
            
            main.innerHTML = plantilla
   
            start[id]()
          
        }
    })
    xhr.send()

}

function cargarPlantillas() {

    const links = document.querySelectorAll('header nav a')

      // --------------carga vista inicial---------
      const id = location.hash.slice(1)
      cargarPlantilla(id)
     
      // ------------carga vistas de navegación----
      links.forEach( link =>{
          
          link.addEventListener('click', e => {
              e.preventDefault()
  
              let id = link.id
              location.hash = id
              
          })
      })
      
      window.addEventListener('hashchange', () => {

        const id = location.hash.slice(1)
        cargarPlantilla(id)
      })

}

function startMain() {

    cargarPlantillas() 
    volverArriba();
}
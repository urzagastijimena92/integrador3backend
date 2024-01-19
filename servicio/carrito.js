import config from '../config.js';
import ModelFactory from '../model/DAO/carrito/carritoFactory.js';

class Servicio {

    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    obtenerCarrito = async _ => {
            const carrito = await this.model.obtenerCarrito()
            return carrito
    }

    guardarCarrito = async carrito => {
            const carritoGuardado = await this.model.guardarCarrito(carrito)
            return carritoGuardado
    }
     
}

export default Servicio


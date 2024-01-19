import Servicio from '../servicio/carrito.js';

class Controlador {

    constructor() {
        this.servicio = new Servicio()
    }

    obtenerCarrito = async (req,res) => {
        const {id} = req.params
        const carrito = await this.servicio.obtenerCarrito(id)
        res.json(carrito)
    }

    guardarCarrito = async (req,res) => {
        try {
            const carrito = req.body
            const carritoGuardado = await this.servicio.guardarCarrito(carrito)
            res.json(carritoGuardado)
        }
        catch(error) {
            res.json({ errMsg: error.message })
        }
    }

}


export default Controlador
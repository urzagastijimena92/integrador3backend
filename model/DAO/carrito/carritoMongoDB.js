import CnxMongoDB from '../../DBMongo.js';

class ModelMongoDB {

    obtenerCarrito = async () => {
        if(!CnxMongoDB.connection) return []
        const carrito = await CnxMongoDB.db.collection('carrito').find({}).toArray()
        return carrito
    }

    guardarCarrito = async carrito => {
        if(!CnxMongoDB.connection) return {}
        await CnxMongoDB.db.collection('carrito').insertOne(carrito)
        return carrito
    }

}

export default ModelMongoDB
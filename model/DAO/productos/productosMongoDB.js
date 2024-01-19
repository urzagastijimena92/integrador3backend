import { ObjectId } from 'mongodb';

import CnxMongoDB from '../../DBMongo.js';

class ModelMongoDB {

    obtenerProductos = async () => {
        if(!CnxMongoDB.connection) return []
        const productos = await CnxMongoDB.db.collection('productos').find({}).toArray()
        return productos
    }

    obtenerProducto = async id => {
        if(!CnxMongoDB.connection) return {}
        const producto = await CnxMongoDB.db.collection('productos').findOne({_id: new ObjectId(id)})
        return producto
    }

    guardarProducto = async producto => {
        if(!CnxMongoDB.connection) return {}
        await CnxMongoDB.db.collection('productos').insertOne(producto)
        return producto
    }

    actualizarProducto = async (id, producto) => {
        if(!CnxMongoDB.connection) return {}
        await CnxMongoDB.db.collection('productos').updateOne({_id: new ObjectId(id)},{$set: producto})

        const productoActualizado = await this.obtenerProducto(id)
        return productoActualizado
    }

    borrarProducto = async id => {
        if(!CnxMongoDB.connection) return {}

        const productoEliminado = await this.obtenerProducto(id)
        await CnxMongoDB.db.collection('productos').deleteOne({_id: new ObjectId(id)})

        return productoEliminado
    }
}

export default ModelMongoDB
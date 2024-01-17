import { MongoClient } from "mongodb"
import config from '../config.js'

class CnxMongoDB {
    static client = null
    static db = null
    static connection = false

    static conectar = async _ => {
        try {
            console.log('Conectando a la base de datos...')
            CnxMongoDB.client = new MongoClient(config.STRCNX)
            
            await CnxMongoDB.client.connect()
            console.log('Base de datos conectada')

            CnxMongoDB.db = CnxMongoDB.client.db(config.BASE)
            CnxMongoDB.connection = true
        }
        catch(error) {
            console.log(`Error en conexión de base de datos: ${error.message}`)
        }
    }
}

export default CnxMongoDB
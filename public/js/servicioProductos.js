const url = '/api/productos/'

const proxyProducto = producto => {

    const handler = {
        get: function (target, prop, receiver) {

            if (prop === 'id') {
                const id = target._id
                target.id = id
                return id
            }
            return Reflect.get(...arguments)
        }
    }
    return new Proxy(producto, handler)
}

const eliminarPropiedad = (obj, prop) => {
    const objClon = {...obj}
    delete objClon[prop]
    return objClon
}

async function getAll() {
    const productosLeidos = await fetch(url).then(r => r.json())
    const productosLeidosProxy = productosLeidos.map(producto => proxyProducto(producto))
    console.log(productosLeidosProxy)
    return productosLeidosProxy;
}

async function get(id){
    const productoLeido =  await fetch(url+id).then(r => r.json())
    const productoLeidoProxy = proxyProducto(productoLeido)
    console.log(productoLeidoProxy)
    return productoLeidoProxy;
}

async function guardar(producto) {
    const productoLeido = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(producto)
    }).then(r => r.json())

    const productoLeidoProxy = proxyProducto(productoLeido)
    return productoLeidoProxy;
}

async function actualizar(id, producto) {
    try {
        const productoSin_ID = eliminarPropiedad(eliminarPropiedad(producto, '_id'), 'id');

        const response = await fetch(url + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoSin_ID)
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar producto: ${response.status}`);
        }

        const productoActualizado = await response.json();
        console.log(productoActualizado)
        return proxyProducto(productoActualizado);

    } catch (error) {
        console.error('ERROR ACTUALIZAR:', error.message);
        return {};
    }
}


async function eliminar(id) {
    try {
        console.log(`Eliminando producto con ID: ${id}`);
        const response = await fetch(url + id, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el producto con ID ${id}`);
        }

        const productoEliminado = { id: id };
        const productoEliminadoProxy = proxyProducto(productoEliminado);

        console.log('Producto eliminado exitosamente.');
        return productoEliminadoProxy;
    } catch (error) {
        console.error(`Error al eliminar el producto con ID ${id}:`, error);
        throw error;
    }
}

export default {
    getAll,
    get,
    guardar,
    actualizar,
    eliminar,
    proxyProducto
}
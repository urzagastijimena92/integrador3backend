const url = '/api/carrito/'

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


async function enviar(carrito) {
    const productoLeido = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(carrito)
    }).then(r => r.json())
    const productoLeidoProxy = proxyProducto(productoLeido)
    return productoLeidoProxy;
}


export default {
    enviar,
}
    
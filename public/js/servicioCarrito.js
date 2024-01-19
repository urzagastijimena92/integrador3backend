const url = '/api/carrito/'

const proxyCarrito = carrito => {

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
    return new Proxy(carrito, handler)
}


async function enviar(carrito) {
    const carritoLeido = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(carrito)
    }).then(r => r.json())
    console.log(carrito)
    const carritoLeidoProxy = proxyCarrito(carritoLeido)
    return carritoLeidoProxy;
}


export default {
    enviar,
    proxyCarrito
}
    
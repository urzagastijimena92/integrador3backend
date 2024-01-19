const url = '/api/carrito/'


async function enviar(carrito) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(carrito)
    }).then(r => r.json())
}


export default {
    enviar,
}
    
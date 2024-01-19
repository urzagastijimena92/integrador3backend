var productos = []


const getAll = _ => productos
const get = id => productos.find(p => p.id == id)
const set = prods => productos = prods
const guardar = prod => productos.push(prod)

const actualizar = (id, producto) => {
    const index = productos.findIndex(p => p.id == id)
    productos.splice(index,1,producto)
}

const eliminar = (id) => {
    const index = productos.findIndex(p => p.id == id)
    productos.splice(index,1)
}

export default {
    getAll,
    get,
    set,
    guardar,
    actualizar,
    eliminar
}
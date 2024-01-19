class ModelMem {

    constructor() {
        this.productos = [
            { id: 1, codigo: 155, nombre: 'Maquetado con HTML5 y CSS3', precio: 24000, vacantes: 35, categoria: 'Maquetación', duracion:'9 semanas' , detalles: 'Aprende a crear sitios web visualmente atractivos y responsivos utilizando HTML y CSS.', cuotas: false, foto:'../img/Curso-html-css.jpg'},
            { id: 2, codigo: 233, nombre: 'JavaScript Inicial', precio: 18000, vacantes: 42, categoria: 'Programación',duracion:'6 semanas' , detalles: 'Comienza tu viaje en la programación web aprendiendo los conceptos básicos de JavaScript.', cuotas: false, foto: '../img/Curso-js-inicial.jpg'},
            { id: 3, codigo: 256, nombre: 'JavaScript Avanzado', precio: 38000, vacantes: 45, categoria: 'Programación',duracion:'15 semanas' , detalles: ' Profundiza en JavaScript con temas avanzados como programación orientada a objetos y manipulación del DOM.', cuotas: true, foto: '../img/Curso-js-avanzado.jpg'},
            { id: 4, codigo: 245, nombre: 'React JS', precio: 36000, vacantes: 23, categoria: 'Programación',duracion:'14 semanas' , detalles: 'Crea interfaces de usuario modernas y dinámicas con la biblioteca React.js.', cuotas: true, foto: '../img/Curso-react-js.jpg'},
            { id: 5, codigo: 378, nombre: 'Base de Datos SQL', precio: 15000, vacantes: 36, categoria: 'Base de datos',duracion:'10 semanas' , detalles: 'Aprende a diseñar y gestionar bases de datos relacionales utilizando SQL.', cuotas: false, foto: '../img/Curso-SQL.jpg'},
            { id: 5, codigo: 365, nombre: 'MongoDB', precio: 15000, vacantes: 25, categoria: 'Base de datos', duracion:'9 semanas' ,detalles: 'Explora bases de datos NoSQL y cómo trabajar con documentos JSON en MongoDB.', cuotas: false, foto: '../img/Curso-mongoDB.jpg'},
            { id: 6, codigo: 215, nombre: 'Node JS', precio: 16000, vacantes: 28, categoria: 'Programación', duracion:'10 semanas' ,detalles: 'Construye aplicaciones del lado del servidor eficientes y escalables con Node.js.', cuotas: false, foto: '../img/Curso-node-js.jpg'},
            { id: 7, codigo: 299, nombre: 'PHP y MySQL', precio: 44000, vacantes: 26, categoria: 'Programación/Base de datos', duracion:'24 semanas' ,detalles:'Desarrolla aplicaciones web dinámicas y conecta con bases de datos MySQL utilizando PHP.' , cuotas: true, foto: '../img/Curso-php-mysql.jpg'},
            { id: 8, codigo: 231, nombre: 'Python desde cero', precio: 40000, vacantes: 38, categoria: 'Programación', duracion:'20 semanas' ,detalles: 'Inicia tu viaje en Python, uno de los lenguajes más versátiles y utilizados en el mundo.', cuotas: true, foto: '../img/Curso-Python.jpg'} 
        ]
    }

    obtenerProductos = async () => this.productos

    obtenerProducto = async id => this.productos.find(p => p.id == id) || {}

    guardarProducto = async producto => {
        producto.id = String(parseInt(this.productos[this.productos.length-1]?.id || 0) + 1)
        if(producto.precio) producto.precio = Number(producto.precio)
        if(producto.stock) producto.stock = parseInt(producto.stock)
        this.productos.push(producto)
        return producto
    }

    actualizarProducto = async (id, producto) => {
        producto.id = id

        const index = this.productos.findIndex(p => p.id == id)

        if(index != -1) {
            const productoAnt = this.productos[index]
            
            const productoNuevo = { ...productoAnt, ...producto }
            this.productos.splice(index, 1, productoNuevo)
            return productoNuevo
        }
        else {
            return {}
        }    
    }

    borrarProducto = async id => {
        let producto = {}

        const index = this.productos.findIndex(p => p.id == id)
        if(index != -1) {
            producto = this.productos.splice(index, 1)[0]
        }
        return producto    
    }
}

export default ModelMem
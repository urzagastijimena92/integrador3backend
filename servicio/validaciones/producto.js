import Joi from 'joi';

//https://joi.dev/api/?v=17.9.1

const validar = producto => {
    const productoSchema = Joi.object({
        codigo: Joi.number().required(),
        nombre: Joi.string().min(2).max(45).required(),
        precio: Joi.number().required(),
        vacantes: Joi.number().required(),
        duracion: Joi.string().min(4).max(45).required(),
        categoria: Joi.required(),
        detalles: Joi.required(),
        foto: Joi.string().required(),
        cuotas: Joi.required()

    })

    const { error } = productoSchema.validate(producto)
    return error
}

export default validar
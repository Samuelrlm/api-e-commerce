const productsModel = require("../models/products");

function validadeCreateProduct(req, res, next) {
    const { name, price, category_id } = req.body

    if (!name || !price || !category_id) {
        return res.status(400).send({ error: "Nome, preço e categoria_id são obrigatórios." })
    }

    next()
}

async function validateDeleteProduct(req, res, next) {
    const { id } = req.params

    const product = await productsModel.findByPk(id)

    if(!product) {
        return res.status(404).send({ message: `Produto com Id ${id} não encontrado.` })
    }

    next()
}

function validadeProductNoId(req, res, next) {

    const { id } = req.params

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" })
    }

    if(!id) {
        return res.status(400).send({ error: "ID do produto é obrigatório." })
    }

    next()
}

async function validateUpdateProduct(req, res, next) {
    const { id } = req.params
    const { name, price, category_id } = req.body

    if (!id || !name || !price || !category_id) {
        return res.status(400).send({ error: "id, nome, preço e categoria_id são obrigatórios." })
    }

    const produto = await validateExisteIdProduct(id)

    if(!produto) {
        return res.status(404).send({ message: `Produto com Id ${id} não encontrado.` })
    }

    next()
}

async function validateUpdateProductPrice(req, res, next) {
    const {id} = req.params
    const {price} = req.body

    if (!price) {
        return res.status(400).send({ error: "price campo obrigatorio" })
    }

    const produto = await validateExisteIdProduct(id)

    if(!produto) {
        return res.status(404).send({ message: `Produto com Id ${id} não encontrado.` })
    }

    next()
}

async function validatGetProductById(req, res, next) {
    const { id } = req.params

    const produto = await validateExisteIdProduct(id)

    if(!produto) {
        return res.status(404).send({ message: `Produto com Id ${id} não encontrado.` })
    }

    next()
}

function validateGetProductByName(req, res, next) {
    const { name } = req.params

    if(!name) {
        return res.status(400).send({ error: "Nome do produto é obrigatório." })
    }

    next()
}

async function validateExisteIdProduct(id) {

    const product = await productsModel.findByPk(id)

    return product

}

module.exports = {
    validadeCreateProduct,
    validateDeleteProduct,
    validadeProductNoId,
    validateUpdateProduct,
    validateUpdateProductPrice,
    validatGetProductById,
    validateGetProductByName
}
function validadeCreateProduct(req, res, next) {
    const { name, price, category_id } = req.body

    if (!name || !price || !category_id) {
        return res.status(400).send({ error: "Nome, preço e categoria_id são obrigatórios." })
    }

    next()
}

function validateDeleteProduct(req, res, next) {
    const { id } = req.params

    if(!id) {
        return res.status(400).send({ error: "ID do produto é obrigatório." })
    }

    next()
}

function validateUpdateProduct(req, res, next) {
    const { id } = req.params
    const { name, price, category_id } = req.body

    if (!id || !name || !price || !category_id) {
        return res.status(400).send({ error: "id, nome, preço e categoria_id são obrigatórios." })
    }

    next()
}

function validateUpdateProductPrice(req, res, next) {
    const {id} = req.params
    const {price} = req.body

    if (!id || !price) {
        return res.status(400).send({ error: "id e preço são obrigatórios." })
    }

    next()
}

function validatGetProductById(req, res, next) {
    const { id } = req.params

    if (!id) {
        return res.status(400).send({ error: "ID do produto é obrigatório." })
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

module.exports = {
    validadeCreateProduct,
    validateDeleteProduct,
    validateUpdateProduct,
    validateUpdateProductPrice,
    validatGetProductById,
    validateGetProductByName
}
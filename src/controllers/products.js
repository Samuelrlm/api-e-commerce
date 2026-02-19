const productsModel = require("../models/products");
const { Op } = require("sequelize");

async function getAllProducts(req, res) {
    try {
        const result = await productsModel.findAll({
                order: [['id', 'DESC']]
        })

        if(!result) {
            return res.status(404).send({ message: "Nenhum produto encontrado." })
        }

        res.status(200).send(result)
    } catch (error) {
        console.error("Erro ao buscar produtos:", error)
        res.status(500).send({ error: "Erro ao buscar produtos" })
    }
}

async function createProduct(req, res) {
     const { name, price, category_id } = req.body

     try {     
        const result = await productsModel.create({ name, price, category_id })

        res.status(201).send(result)
    } catch (error) {
        console.error("Erro ao criar produto:", error)
        res.status(500).send({ error: "Erro ao criar produto" })
    }
}

async function deleteProduct(req, res) {
    const { id } = req.params

    console.log(id)

    try {
        await productsModel.destroy({ where: { id }})

        res.status(200).send({ message: `Produto com Id ${id} deletado com sucesso.`})
    } catch (error) {
        console.error("Erro ao deletar produto:", error)
        res.status(500).send({ error: "Erro ao deletar produto" })
    }
}

async function updateProduct(req, res) {
    const { id } = req.params
    const { name, price, category_id } = req.body

    try {      
        const result = await productsModel.update({name, price, category_id}, { where: { id }})

        if(!result[0]) {
            return res.status(404).send({ message: `Produto com Id ${id} não encontrado.` })
        }

        res.status(200).send(result[0])
    } catch (error) {
        console.error("erro ao atualizar produto:", error)
        res.status(500).send({ error: "Erro ao atualizar produto" })
    }
}

async function updateProductPrice(req, res) {
    const {id} = req.params
    const {price} = req.body

     try {     
        await productsModel.update({ price }, { where: { id }})
        res.status(200).send({ message: `Preço do produto com Id ${id} atualizado com sucesso.` })
    } catch (error) {
        console.error("Erro ao atualizar preço do produto:", error)
        res.status(500).send({ error: "Erro ao atualizar preço do produto" })
    }
}

async function getProductById(req, res) {
    const { id } = req.params

    try {
        const result = await productsModel.findByPk(id)

        if(!result) {
            return res.status(404).send({ message: `Produto com Id ${id} não encontrado.` })
        }

        res.status(200).send(result)
    } catch (error) {
        console.error("Erro ao buscar produto por ID:", error)
        res.status(500).send({ error: "Erro ao buscar produto por ID" })
    }
}

async function getProductByName(req, res) {
    const { name } = req.params

    if(!name) {
        return res.status(400).send({ error: "Nome do produto é obrigatório." })
    }

     try {
        const result = await productsModel.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })

        if(result.length === 0) {
            return res.status(404).send({ message: `Produto com nome ${name} não encontrado.` })
        }
        res.status(200).send(result)
    } catch (error) {
        console.error("Erro ao buscar produto por nome:", error)
        res.status(500).send({ error: "Erro ao buscar produto por nome", error})
    }
}

async function getProductName(req, res) {
    const { name } = req.params

    try {
        // const result = await productsModel.query(`SELECT * FROM products WHERE name = $1;`, [name])
        const result = await productsModel.findAll({ where: { name } })
        res.send(result)
    } catch (error) {
        console.error('Erro ao buscar o produto pelo nome:', error)
        res.status(500).send({ error: 'Erro ao buscar o produto pelo nome'})
    }
    
}

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    updateProductPrice,
    getProductById,
    getProductByName,
    getProductName
}
const productsModel = require("../models/products");

async function getAllProducts(req, res) {
    try {
        const result = await productsModel.query(`SELECT * FROM products ORDER BY id DESC;`)

        if(result.rows.length === 0) {
            return res.status(404).send({ message: "Nenhum produto encontrado." })
        }

        res.status(200).send(result.rows)
    } catch (error) {
        console.error("Erro ao buscar produtos:", error)
        res.status(500).send({ error: "Erro ao buscar produtos" })
    }
}

async function createProduct(req, res) {
     const { name, price, category_id } = req.body

     try {     
        const result = await productsModel.query(`INSERT INTO products (name, price, category_id)
             VALUES ($1, $2, $3) RETURNING *;`, [name, price, category_id])

        res.status(201).send(result.rows[0])
    } catch (error) {
        console.error("Erro ao criar produto:", error)
        res.status(500).send({ error: "Erro ao criar produto" })
    }
}

async function deleteProduct(req, res) {
    const { id } = req.params

    try {
        const result = await productsModel.query(`DELETE FROM products WHERE id = $1 RETURNING *;`, [id])
        res.status(200).send(result.rows[0])
    } catch (error) {
        console.error("Erro ao deletar produto:", error)
        res.status(500).send({ error: "Erro ao deletar produto" })
    }
}

async function updateProduct(req, res) {
    const { id } = req.params
    const { name, price, category_id } = req.body

    try {      
        const result = await productsModel.query(`UPDATE products SET name = $1, price = $2, category_id = $3
            WHERE id = $4 RETURNING *;`, [name, price, category_id, id])
        res.status(200).send(result.rows[0])
    } catch (error) {
        console.error("erro ao atualizar produto:", error)
        res.status(500).send({ error: "Erro ao atualizar produto" })
    }
}

async function updateProductPrice(req, res) {
    const {id} = req.params
    const {price} = req.body

     try {     
        const result = await productsModel.query(`UPDATE products SET price = $1 WHERE id = $2 RETURNING *;`, [price, id])
        res.status(200).send(result.rows[0])
    } catch (error) {
        console.error("Erro ao atualizar preço do produto:", error)
        res.status(500).send({ error: "Erro ao atualizar preço do produto" })
    }
}

async function getProductById(req, res) {
    const { id } = req.params

    try {
        const result = await productsModel.query(`SELECT * FROM products WHERE id = $1`, [id])
        res.status(200).send(result.rows[0])
    } catch (error) {
        console.error("Erro ao buscar produto por ID:", error)
        res.status(500).send({ error: "Erro ao buscar produto por ID" })
    }
}

async function getProductByName(req, res) {
    const { name } = req.params

     try {
        const result = await productsModel.query(`SELECT * FROM products WHERE name ILIKE $1` ,[`%${name}%`])
        res.status(200).send(result.rows)
    } catch (error) {
        console.error("Erro ao buscar produto por nome:", error)
        res.status(500).send({ error: "Erro ao buscar produto por nome" })
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    updateProductPrice,
    getProductById,
    getProductByName
}
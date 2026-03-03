const productsModel = require("../models/products");

async function getAllProducts(req, res){
  try {
    const products = await productsModel.findAll();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar produtos." });
  }
}

async function createProduct(req, res) {
    const { name, price, original_price, category_id, is_new, description, specfications, shipping, warranty, return_policy } = req.body

    console.log("passando pelo controllers", req.body)
   try {
     const newProduct = await productsModel.create({
        name,
        price,
        original_price,
        category_id,
        is_new,
        description,
        specfications,
        shipping,
        warranty,
        return: return_policy
     })

     res.status(201).send(newProduct)
   } catch (error) {
     res.status(500).send({ error: "Erro ao criar produto." })
   }
}


module.exports = {
    getAllProducts,
    createProduct
    
}
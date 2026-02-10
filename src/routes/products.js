const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");
const productsMiddleware = require("../middlewares/products");

router.get("/products", productsController.getAllProducts)
router.post("/products", productsMiddleware.validadeCreateProduct, productsController.createProduct)
router.delete("/products/:id", productsMiddleware.validateDeleteProduct, productsController.deleteProduct)
router.put("/products/:id", productsMiddleware.validateUpdateProduct, productsController.updateProduct)
router.patch("/products/price/:id", productsMiddleware.validateUpdateProductPrice, productsController.updateProductPrice)
router.get("/products/:id", productsMiddleware.validatGetProductById, productsController.getProductById)
router.get("/products/name/:name", productsMiddleware.validateGetProductByName, productsController.getProductByName)

module.exports = router;
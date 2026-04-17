const express = require("express");
const router = express.Router();
const productcontroller = require("../controller/productcontroller");

// Create a new product
router.post("/newproduct", productcontroller.createproduct);

// Get all products
router.get("/allproducts", productcontroller.getallproduct);

// Get a product by ID
router.get("/productsbyid/:id", productcontroller.getproductbyid);

// Update a product by ID
router.put("/updateproducts/:id", productcontroller.updateproduct);

// Delete a product by ID
router.delete("/deleteproducts/:id", productcontroller.deleteproduct);

module.exports = router;
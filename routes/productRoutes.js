const express = require("express");
const router = express.Router();
const productcontroller = require("../controller/productcontroller");
const upload = require("../middleware/upload");

router.post('/newproduct', upload.single('image'), productcontroller.createproduct);
// Get all products
router.get("/getallproducts", productcontroller.getallproduct);

// Get a product by ID
router.get("/productsbyid/:id", productcontroller.getproductbyid);

// Update a product by ID
router.put("/updateproducts/:id",upload.single("image"), productcontroller.updateproduct);
router.post("/updateproducts/:id", upload.single("image"), productcontroller.updateproduct);

// Delete a product by ID
router.delete("/deleteproducts/:id", productcontroller.deleteproduct);



module.exports = router;
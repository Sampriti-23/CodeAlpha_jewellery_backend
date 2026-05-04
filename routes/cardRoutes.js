const express = require('express');
const router = express.Router();
const cartcontroller = require('../controller/cartcontroller');

// Create a new cart
router.post('/newcart', cartcontroller.addtocart);
// Get a specific cart by ID
router.get('/getcartsbyid/:id', cartcontroller.getcartbyid);
//update a cart
router.put('/updatecarts/:id', cartcontroller.updatecart);
// Delete a cart
router.delete('/deletecarts/:id', cartcontroller.deletecart);

module.exports = router;
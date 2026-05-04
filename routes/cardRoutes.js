const express = require('express');
const router = express.Router();
const cardcontroller = require('../controller/cartcontroller');

// Create a new card
router.post('/newcart', cardcontroller.addtocart);
// Get a specific card by ID
router.get('/getcartsbyid/:id', cardcontroller.getcartbyid);
//update a card
router.put('/updatecarts/:id', cardcontroller.updatecart);
// Delete a cardrouter
router.delete('/deletecarts/:id', cardcontroller.deletecart);

module.exports = router;
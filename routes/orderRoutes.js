const express = require('express');
const router = express.Router();
const ordercontroller = require('../controller/ordercontroller');

// Create a new order
router.post('/neworder', ordercontroller.createorder);

// Get all orders
router.get('/allorders', ordercontroller.getallorder);

// Get a specific order by ID
router.get('/ordersbyid/:id', ordercontroller.getorderbyid);

// Update an existing order
router.put('/updateorders/:id', ordercontroller.updateorder);

// Delete an order
router.delete('/deleteorders/:id', ordercontroller.deleteorder);

module.exports = router;
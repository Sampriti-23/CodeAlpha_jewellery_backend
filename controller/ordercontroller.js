const Order = require('../model/Order');

// Create a new order
exports.createorder = async(req,res)=>{
    try{
        const order = await Order.create(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all orders
exports.getallorder = async(req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get an order by ID
exports.getorderbyid = async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);  
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update an order by ID
exports.updateorder = async(req,res)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete an order by ID
exports.deleteorder = async(req ,res)=>{
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



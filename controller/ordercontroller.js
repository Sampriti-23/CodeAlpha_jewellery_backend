const Order = require('../model/Order');
const Cart = require('../model/Cart');
const Product = require('../model/Product');

// Create a new order (Checkout from Cart)
exports.createorder = async (req, res) => {
    try {
        const { userId, clientName, shippingAddress } = req.body;
        
        // 1. Get the user's cart
        const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');
        if (!cart || cart.cartItems.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        // 2. Build the order items and calculate the total price
        let calculatedTotalPrice = 0;
        const finalOrderItems = [];

        for (const item of cart.cartItems) {
            // Add to total price (Live Price * Quantity)
            calculatedTotalPrice += (item.product.price * item.qty);

            // Format for the Order Database
            finalOrderItems.push({
                name: item.product.name,
                qty: item.qty,
                price: item.product.price,
                product: item.product._id,
            });
        }

        // 3. Create the Order
        const order = await Order.create({
            user: userId,
            clientName: clientName,
            orderItems: finalOrderItems,
            shippingAddress: shippingAddress,
            paymentMethod: "Cash on Delivery",
            totalPrice: calculatedTotalPrice,
            status: "Pending"
        });

        // 4. Reduce the stock of the products
        for (const item of finalOrderItems) {
            const product = await Product.findById(item.product);
            if (product) {
                product.countInStock = product.countInStock - item.qty;
                await product.save();
            }
        }

        // 5. Delete the cart because checkout is complete
        await Cart.findOneAndDelete({ user: userId });

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all orders (Admin Dashboard)
exports.getallorder = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get an order by ID
exports.getorderbyid = async (req, res) => {
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

// Update an order (Usually just updating the Status)
exports.updateorder = async (req, res) => {
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
exports.deleteorder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order cancelled successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all orders for a specific user (For the User Panel)
// Get all orders for a specific user
exports.getuserorders = async (req, res) => {
    try {
        // 🔥 FIX: Changed userId to id to match your route!
        const orders = await Order.find({ user: req.params.user }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
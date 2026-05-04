const Cart = require('../model/Cart');
const Product = require('../model/Product');

// Add an item to the cart
exports.addtocart = async (req, res) => {
    try {
        const { userId, productId, qty } = req.body;

        // Find the product to make sure it exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            // If cart exists, check if product is already in it
            const itemIndex = cart.cartItems.findIndex(p => p.product.toString() === productId);

            if (itemIndex > -1) {
                // Update quantity if item is already in cart
                cart.cartItems[itemIndex].qty += Number(qty);
            } else {
                // Add new item to cart
                cart.cartItems.push({ product: productId, qty: Number(qty) });
            }
        } else {
            // If no cart exists, create a new one
            cart = await Cart.create({
                user: userId,
                cartItems: [{ product: productId, qty: Number(qty) }]
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get cart by User ID
// Get cart by User ID
exports.getcartbyid = async (req, res) => {
    try {
        // 🔥 FIX: Changed req.params.userId to req.params.id to match your route!
        const cart = await Cart.findOne({ user: req.params.id }).populate('cartItems.product');
        
        if (!cart) {
            return res.status(200).json({ cartItems: [] }); 
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.updatecart = async (req, res) => {
    try {
        const { userId, productId, qty } = req.body;
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const itemIndex = cart.cartItems.findIndex(p => p.product.toString() === productId);

        if (itemIndex > -1) {
            cart.cartItems[itemIndex].qty = Number(qty);
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Clear or delete the whole cart manually
exports.deletecart = async (req, res) => {
    try {
        // 🔥 FIX: Changed req.params.userId to req.params.id
        const cart = await Cart.findOneAndDelete({ user: req.params.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
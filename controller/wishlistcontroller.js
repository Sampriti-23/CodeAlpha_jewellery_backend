const Wishlist = require('../model/Wishlist');

// 1. Get user's wishlist
exports.getWishlist = async (req, res) => {
    try {
        // 🔥 THE FIX: Added .populate('products') here! 
        // This tells MongoDB to grab the full product details, not just the IDs.
        const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate('products');
        
        if (!wishlist) {
            return res.status(200).json({ products: [] }); 
        }
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.toggleWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let wishlist = await Wishlist.findOne({ user: userId });

        // If no wishlist exists, create it with the first product
        if (!wishlist) {
            wishlist = await Wishlist.create({ user: userId, products: [productId] });
            return res.status(200).json({ message: "Added to wishlist", products: wishlist.products });
        }

        const productIndex = wishlist.products.indexOf(productId);

        if (productIndex > -1) {
            // Product exists, so remove it
            wishlist.products.splice(productIndex, 1); 
        } else {
            // Product doesn't exist, so add it
            wishlist.products.push(productId);
        }

        await wishlist.save();
        res.status(200).json({ message: "Wishlist updated", products: wishlist.products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
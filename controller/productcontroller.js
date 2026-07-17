const Product = require('../model/Product');

// Create a new product
exports.createproduct = async (req, res) => {
    try {
        const { name, price, salePrice, description, category, countInStock } = req.body;
        let imageUrl = "";

        if (req.file) {
            imageUrl = req.file.path; 
        }
        const finalSalePrice = (salePrice && salePrice !== "null" && salePrice !== "") 
            ? Number(salePrice) 
            : null;
        const newProduct = await Product.create({
            name,
            price,
            salePrice: finalSalePrice,
            description,
            category,
            countInStock,
            image: imageUrl
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.log("Backend Error:", error); 
        res.status(500).json({ message: error.message });
    }
};

// Get all products
exports.getallproduct = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}

// Get a product by ID
exports.getproductbyid = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update a product by ID
// Update a product by ID
exports.updateproduct = async (req, res) => {
    try {
        console.log("📥 Incoming Update Body:", req.body);
        console.log("🆔 Target Product ID:", req.params.id);
        console.log("📁 Incoming File:", req.file);

        const updateData = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
        };

        if (req.body.price !== undefined) {
            updateData.price = Number(req.body.price);
        }
        if (req.body.countInStock !== undefined) {
            updateData.countInStock = Number(req.body.countInStock);
        }
        if (req.body.salePrice !== undefined) {
            updateData.salePrice = (req.body.salePrice === "" || req.body.salePrice === null || req.body.salePrice === "null") 
                ? null 
                : Number(req.body.salePrice);
        }

       
        if (req.file) {
            updateData.image = req.file.path;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,          
                runValidators: true 
            }
        );

        if (!product) {
            console.log("❌ Product not found in Database for ID:", req.params.id);
            return res.status(404).json({
                message: "Product not found",
            });
        }

        console.log("✅ Product Updated Successfully in DB:", product);
        res.status(200).json(product);

    } catch (error) {
        console.error("❌ BACKEND UPDATE CRASH ERROR:", error.message);
        res.status(400).json({
            message: error.message,
        });
    }
};

// Delete a product by ID   
exports.deleteproduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
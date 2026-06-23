const Product = require('../model/Product');
// Create a new product

exports.createproduct = async (req, res) => {
    try {
        const { name, price, description, category, countInStock } = req.body;
        let imageUrl = "";

        // 🔥 If Multer caught the image, it will be sitting in req.file
        if (req.file) {
            // Create the full URL. Make sure your server is running on port 8000!
            imageUrl = `https://codealpha-jewellery-backend.onrender.com/uploads/${req.file.filename}`;
        }

        const newProduct = await Product.create({
            name,
            price,
            description,
            category,
            countInStock,
            image: imageUrl // Save the URL to the database!
        });

        res.status(201).json(newProduct);
    } catch (error) {
        // This is what is throwing the 500 error right now!
        console.log("Backend Error:", error); 
        res.status(500).json({ message: error.message });
    }
};
// Get all products
exports.getallproduct = async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}

// Get a product by ID
exports.getproductbyid = async(req  ,res)=>{
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
exports.updateproduct = async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a product by ID   
exports.deleteproduct = async(req,res)=>{
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

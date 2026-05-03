const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  // image: { type: String, required: true }, // URL to the image
  
  category: { 
    type: String, 
    required: true,
    // 🔥 ENUM restricts the input to only these exact strings
    enum: ['Ring', 'Necklace', 'Earrings', 'Bracelet', 'Pendant', 'Other'] 
  },
  
  countInStock: { type: Number, required: true, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
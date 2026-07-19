const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  salePrice: { type: Number, default: null },
  image: { 
        type: String, 
        required: false, // Set to false so you can still add products without images if you want to!
        default: ""
    },
  
  category: { 
    type: String, 
    required: true,
    // ENUM restricts the input to only these exact strings
    enum: ['Ring', 'Necklace', 'Earrings', 'Bracelet', 'Combo pack'] 
  },
  
  countInStock: { type: Number, required: true, default: 0 },
  
  wishlist: { type: Boolean, default: false }
}, { timestamps: true });
 
module.exports = mongoose.model('Product', productSchema);
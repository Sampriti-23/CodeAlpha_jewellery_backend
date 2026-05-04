const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  clientName: { type: String, required: true }, 
  
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      // image: { type: String, required: true }, // Keep commented if not using yet
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  
  paymentMethod: { 
    type: String, 
    required: true, 
    default: 'Cash on Delivery' 
  },
  
  totalPrice: { type: Number, required: true, default: 0.0 },
  
  status: { 
    type: String, 
    default: 'Pending', 
    enum: ['Pending', 'Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'] 
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
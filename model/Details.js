const mongoose = require('mongoose');
const detailsSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
});

module.exports = mongoose.model('Details', detailsSchema);
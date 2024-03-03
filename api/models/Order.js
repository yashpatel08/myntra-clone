const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1 // Default quantity is 1
    }
});

const OrderSchema = new mongoose.Schema({
    products: {
        type: [ProductSchema],
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    size: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    prepare: {
        type: Boolean,
        default: true
    },
    onWay: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    },
    cancel: {
        type: Boolean,
        default: false
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
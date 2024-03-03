const mongoose = require('mongoose');
const { number } = require('yup');

const PaymentSchema = new mongoose.Schema({
    products: {
        type: Array,
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
    },
    method: {
        type: String, // Payment method (e.g., cod, paid)
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, { versionKey: false });

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;

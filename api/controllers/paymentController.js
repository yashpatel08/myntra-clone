const Payment = require('../models/Payment');

exports.getAllPayments = async (req, res) => {
    try {
        const allPayments = await Payment.find({});

        res.status(200).json({
            allPayments
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        res.status(200).json({
            payment
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getPaymentsByUserId = async (req, res) => {
    try {
        const payment = await Payment.find({ buyer: req.params.id });

        res.status(200).json({
            payment
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getPaymentsByStatus = async (req, res) => {
    try {
        const payments = await Payment.find({ status: req.params.status });

        res.status(200).json({
            payments
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.addPayment = async (req, res) => {
    try {
       
        const newPayment = await Payment.create(req.body);

        res.status(201).json({
            newPayment,
           
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            payment
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);

        res.status(200).json({
            payment
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};
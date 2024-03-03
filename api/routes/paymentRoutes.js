const express = require('express');
const router = express.Router();
const { addPayment, updatePayment, getPaymentsByStatus, deletePayment } = require('../controllers/paymentController');

// router.route('/').get(getAllOrders);
// router.route('/:id').get(getOrderById);
// router.route('/user/:id').get(getOrdersByUserId);
router.route('/status/:status').get(getPaymentsByStatus);
router.route('/addPayment').post(addPayment);
router.route('/:id').put(updatePayment);
router.route('/:id').delete(deletePayment);

module.exports = router;
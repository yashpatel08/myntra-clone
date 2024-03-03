const express = require('express');
const router = express.Router();
const { getAllOrders, getOrderById, getOrdersByUserId, getOrdersByStatus, addOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

router.route('/').get(getAllOrders);
router.route('/:id').get(getOrderById);
router.route('/user/:id').get(getOrdersByUserId);
router.route('/status/:status').get(getOrdersByStatus);
router.route('/addOrder').post(addOrder);
router.route('/:id').put(updateOrder);
router.route('/:order_id/product/:product_id').delete(deleteOrder);

module.exports = router;
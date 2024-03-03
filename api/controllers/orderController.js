const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({});

        res.status(200).json({
            allOrders
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        res.status(200).json({
            order
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.params.id });

        res.status(200).json({
            orders
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getOrdersByStatus = async (req, res) => {
    try {
        const orders = await Order.find({ status: req.params.status });

        res.status(200).json({
            orders
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};
exports.addOrder = async (req, res) => {
    try {
        const userId = req.body.buyer;
        const orderSize = req.body.size;
        let existingOrder = await Order.findOne({ buyer: userId , size: orderSize });

        if (existingOrder) {
            const existingProducts = existingOrder.products;

            for (const product of req.body.products) {
                const existingProductIndex = existingProducts.findIndex(p => p.productId.equals(product.productId));
                if (existingProductIndex !== -1) {
                    existingProducts[existingProductIndex].quantity += product.quantity;
                } else {
                    existingProducts.push(product);
                }
            }

            existingOrder = await existingOrder.save();
        } else {
            existingOrder = await Order.create(req.body);
        }

        res.status(200).json({
            status: 'success',
            message: 'Order updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            order
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};
exports.deleteOrder = async (req, res) => {
    try {
        const { order_id, product_id } = req.params;

        const order = await Order.findById(order_id);

        if (!order) {
            return res.status(404).json({
                status: 'failed',
                message: 'Order not found'
            });
        }

        const productInOrderIndex = order.products.findIndex(product => product.productId.toString() === product_id);

        if (productInOrderIndex === -1) {
            return res.status(404).json({
                status: 'failed',
                message: 'Product not found in the order'
            });
        }

        const productInOrder = order.products[productInOrderIndex];

        if (productInOrder.quantity > 1) {
            productInOrder.quantity -= 1;
        } else {
            order.products.splice(productInOrderIndex, 1);
        }

        
        
        await order.save();
        if (productInOrder.quantity === 1) {
            await Product.findByIdAndDelete(product_id);
        }

        res.status(200).json({
            status: 'success',
            message: 'Product quantity updated',
            updatedOrder: order
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error: error.message
        });
    }
};

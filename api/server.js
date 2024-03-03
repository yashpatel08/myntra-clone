const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const stripe = require("stripe")("sk_test_51OdukbSDxMHH7tt0aX2UFGbpCSnqeCzlXPFp46Bwy4OBjJbuIj37ZQsQ2yG9yFjQYApvCb8GIpY6zBnnhZV9x2Se00TRsJq0Eb");
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const Stripe = require('stripe');

const app = express();
const port = process.env.PORT || 4000;

// stripe =  Stripe(process.env.STRIPE_API_SECRET);

// MIDDLEWARES
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true
}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

// ROUTES
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);

// app.use('/categories', categoryRoutes);
// app.use('/genres', genreRoutes);
// app.use('/ratings', ratingRoutes);
// // app.use('/comments', commentRoutes);
// // app.use('/reports', reportRoutes);
// app.use('/images', imageRoutes);
// app.use('/minis', miniImageRoutes);


// STRIPE CONNECTION
app.post("/api/create-checkout-session", async (req, res) => {
    const { products, totalPrice } = req.body;
    console.log(req.body);
    if (!products || !totalPrice) {
        return res.status(400).json({ error: 'Missing products data or totalPrice in request.' });
    }
    
    console.log('Total Price:', totalPrice);
    
    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.name
            },
            unit_amount: product.price * 100
        },
        quantity: product.quantity 
    }));
    
    
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "https://localhost:3000/success",
            cancel_url: "https://localhost:3000/cancel",
            metadata: {
                totalPrice: totalPrice // Include the calculated total price
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Error creating checkout session' });
    }
})

mongoose.connect('mongodb://localhost/fashion')
    .then('Conneted to mongodb')
    .catch(error => console.log(error));
console.log('Conneted to mongodb');

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
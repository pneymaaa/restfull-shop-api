const express = require('express');
const app = express();
const morgan = require('morgan'); //logger middleware Node.js
const cors = require('cors');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const connectionOptions = { dbName: "shop" }

mongoose.connect(`mongodb+srv://pneymaaa:${process.env.DB_PASSWORD}@resfull-api-shop.xtvcrih.mongodb.net/?retryWrites=true&w=majority`, connectionOptions);

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors({
    exposedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    methods: ["PUT", "POST", "PATCH", "DELETE", "GET"]
}));

// Manually set header
// app.use((req,res,next)=> {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if(req.method === "OPTIONS") {
//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//         return res.status(200).json({});
//     }
//     next();
// });

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    let error = new Error('Not found');
    error.status = 400;
    next(error);
});

app.use((error, req, res, next) => {
    res.json({ 
    error: {
        message: error.message,
        status: error.status || 500
    }
    })
});

module.exports = app;
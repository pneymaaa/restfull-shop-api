const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const mongoose = require("mongoose");

//using async await
// router.get('/', async (req, res, next) => {
//     const products = await Product.find().exec();
//     res.status(200).json({
//         message: "Handling GET Response products",
//         products: products
//     })
// });

router.get('/', (req, res, next) => {
    Product.find().exec()
    .then(result => {
        const products = {
            count: result.length,
            products: result,
            request: {
                type: "GET",
                url: ""
            }
        }
        res.status(200).json(products);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
    .then(result => {
        const product = {
            product: {
                name: result.name,
                price: result.price,
                _id: result.id
            },
            request: {
                type: "GET",
                url: ""
            }
        }
        res.status(200).json(product)
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            const product = {
                product: {
                    name: result.name,
                    price: result.price,
                    _id: result.id
                },
                request: {
                    type: "POST",
                    url: ""
                }
            }
            res.status(200).json(product);
    }).catch(err => {
        res.status(500).json({
            message: "Handling POST Response products",
            error: err
        })
    });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, {$set: updateOps})
    .then(result => {
        const product = {
            product: {
                _id: id
            },
            request: {
                type: "PUT",
                url: ""
            }
        }
        res.status(200).json(product)
    })
    .catch(err => {
        res.status(200).json(err)
    })
    
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.deleteOne({_id: id}).exec()
    .then(result => {
        const product = {
            product: {
                _id: id
            },
            request: {
                type: "DELETE",
                url: ""
            }
        }
        res.status(200).json(product)
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;
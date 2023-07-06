const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET Response orders"
    })
});

router.post('/', (req, res, next) => {
    let order = {
        name: req.body.name,
        quantity: req.body.quantity
    }
    res.status(200).json({
       message: "Handling POST Response orders",
       order: order
    }) 
});

router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET id Response orders"
    })
});

router.put('/:id', (req, res, next) => {
    res.status(200).json({
        message: "Handling PUT Response orders"
    })
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling DELETE Response orders"
    })
});


module.exports = router;
const Product = require('../Models/product')

exports.add_product = (req,res) => {
    Product.create({
        user_id : req.body.user_id,
        product_name : req.body.product_name,
        product_capital : Number(req.body.product_capital),
        product_price : Number(req.body.product_price),
        product_type : req.body.product_type,
        qty : req.body.qty
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.show_product = (req,res) => {
    var user_id = req.params.user_id;

    Product.find({
        qty : {$gte : 3},
        user_id : user_id
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.update_product = (req,res) => {
    var id = req.params.id;
    Product.updateOne({_id : id},{
        product_name : req.body.product_name,
        product_capital : Number(req.body.product_capital),
        product_price : Number(req.body.product_price),
        product_type : req.body.product_type,
        qty : req.body.qty
    },{new: true})
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.delete_product = (req,res) => {
    var id = req.params.id;
    Product.findByIdAndDelete(id)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.detail_product = (req,res) => {
    var id = req.params.id;
    Product.findById(id)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.update_qty = (req,res) => {
    var id = req.params.id;
    Product.findByIdAndUpdate(id,{
        qty : req.body.qty
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}
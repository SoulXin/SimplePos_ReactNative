const Product = require('../Models/product')

exports.show_inventory = (req,res) => {
    Product.find({
        qty : {$lt : 3}
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.update_inventory = (req,res) => {
    var id = req.params.id;
    Product.updateOne({_id : id},{
        qty : req.body.qty
    },{new: true})
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}
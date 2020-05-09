const Product = require('../Models/product')

exports.show_inventory = (req,res) => {
    var user_id = req.params.user_id
    Product.find({
        qty : {$lt : 3},
        user_id : user_id
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
const Invoice = require('../Models/invoice')

exports.add_invoice = (req,res) => {
    Invoice.create({
        bk : req.body.bk,
        worker : req.body.worker,
        product : req.body.product
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.show_invoice = (req,res) => {
    Invoice.find({})
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.update_invoice = (req,res) => {
    var id = req.params.id;
    Invoice.updateOne({_id : id},{
        bk : req.body.bk,
        worker : req.body.worker,
        product : req.body.product
    },{new: true})
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.delete_invoice = (req,res) => {
    var id = req.params.id;
    Invoice.findByIdAndDelete(id)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.detail_invoice = (req,res) => {
    var id = req.params.id;
    Invoice.findById(id)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}
const Motorcycle = require('../Models/motorcycle')

exports.add_motorcycle = (req,res) => {
    Motorcycle.create({
        name : req.body.name,
        category : req.body.category,
        year : Number(req.body.year)
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.show_motorcycle = (req,res) => {
    Motorcycle.find({})
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.update_motorcycle = (req,res) => {
    var id = req.params.id;
    Motorcycle.updateOne({_id : id},{
        name : req.body.name,
        category : req.body.category,
        year : Number(req.body.year),
    },{new: true})
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.delete_motorcycle = (req,res) => {
    var id = req.params.id;
    Motorcycle.findByIdAndDelete(id)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.filter_motorcycle = (req,res) => {
    var type = req.params.type;
    if(type === "All"){
        Motorcycle.find({})
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json(error)
        })    
    }else{
        Motorcycle.find({
            category : type
        })
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json(error)
        })
    }
}
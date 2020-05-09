const Motorcycle = require('../Models/motorcycle')

exports.add_motorcycle = (req,res) => {
    Motorcycle.create({
        user_id : req.body.user_id,
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
    var user_id = req.params.user_id;

    Motorcycle.find({
        user_id : user_id
    })
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
    var user_id = req.params.user_id;

    if(type === "All"){
        Motorcycle.find({
            user_id : user_id
        })
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json(error)
        })    
    }else{
        Motorcycle.find({
            user_id : user_id,
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
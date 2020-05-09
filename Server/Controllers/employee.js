const Employee = require('../Models/employee')

exports.add_employee = (req,res) => {
    Employee.create({
        user_id : req.body.user_id,
        name : req.body.name,
        age : req.body.age,
        religion : req.body.religion,
        address : req.body.address,
        districts : req.body.districts,
        phone_number : req.body.phone_number
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.show_employee = (req,res) => {
    var user_id = req.params.user_id
    Employee.find({
        user_id : user_id
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.update_employee = (req,res) => {
    var id = req.params.id;
    Employee.updateOne({_id : id},{
        name : req.body.name,
        age : Number(req.body.age),
        religion : req.body.religion,
        address : req.body.address,
        districts : req.body.districts,
        phone_number : Number(req.body.phone_number)
    },{new: true})
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.delete_employee = (req,res) => {
    var id = req.params.id;
    Employee.findByIdAndDelete(id)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}
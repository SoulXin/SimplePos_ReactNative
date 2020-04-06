const EmployeeWork = require('../Models/employee_work')

exports.add_employee_work = (req,res) => {
    EmployeeWork.create({
        name : req.body.name,
        date_work : req.body.date_work,
        work_list : req.body.work_list
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.show_employee_work = (req,res) => {
    EmployeeWork.aggregate([
        {$unwind : "$work_list"},
        {$group : {
            _id : "$name",
            date : {$first : "$date_work"},
            work_list : {
                $push : "$work_list"
            }
        }},
        // { $project: { items: { $reduce: { input: "$work_list", initialValue: [], in: { $concatArrays: [ "$$value", "$$this" ] } } } } }

    ])
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.delete_mechanic = (req,res) => {
    var name = req.params.name;
    EmployeeWork.deleteMany({name : name})
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}
const EmployeeWork = require('../Models/employee_work')

exports.add_employee_work = (req,res) => {
    EmployeeWork.create({
        name : req.body.name,
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
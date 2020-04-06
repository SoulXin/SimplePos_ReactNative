const Income = require('../Models/income')

exports.add_income = (req,res) => {
    Income.create({
        date : req.body.date,
        code : req.body.code,
        list_income : req.body.list_income,
        income : req.body.income
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })

}

exports.show_income = (req,res) => {
    var type = req.params.type;
    var start = new Date();
    start.setHours(0,0,0,0);
    
    var end = new Date();
    end.setHours(23,59,59,999);

    if(type === "daily"){
        Income.find({
            date : {
                $gte: start, $lt: end
            }
        })
        .sort({date : -1})
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json(error)
        })
    }else if(type === "weekly"){
        var d = new Date();
        d.setDate(d.getDate()-7);
        
        Income.aggregate([
            // {$match : {"date" : {$gt : d}}},
            {$group : {_id : {
                date : "$date",
                list_income : "$list_income"
            }}},
            {$group : {
                _id : "$_id.date",
                list_income : {
                    $push : {
                        order : "$_id.list_income"
                    }
                }
            }},
            {
                $project: {
                    _id : "$_id",
                    weekNumber: { $isoWeek: "$_id"},
                    list_income : "$list_income"
                },
            },
            {$group : {
                _id  : "$weekNumber",
                list_income_week : {
                    $push : {
                        date : "$_id",
                        list_income_daily : "$list_income"
                    }
                }
            }},
            {$sort : {_id : 1}}
        ])
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json(error)
        })
    }
}
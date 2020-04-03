const Income = require('../Models/income')

exports.add_income = (req,res) => {
    Income.create({
        date : req.body.date,
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
                order : "$order"
            }}},
            {$group : {
                _id : "$_id.date",
                list_order_daily : {
                    $push : {
                        order : "$_id.order"
                    }
                }
            }},
            {
                $project: {
                    _id : "$_id",
                    weekNumber: { $isoWeek: "$_id"},
                    list_order_daily : "$list_order_daily"
                },
            },
            {$group : {
                _id  : "$weekNumber",
                list_order_week : {
                    $push : {
                        date : "$_id",
                        list_order_daily : "$list_order_daily"
                    }
                }
            }}
           
        ])
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json(error)
        })
    }else if(type === "monthly"){
        Income.find({
            date: {
                $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000)
            }
        })
        .sort({date : -1})
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json(error)
        })
    }
}
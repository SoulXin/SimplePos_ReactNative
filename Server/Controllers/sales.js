const Sales = require('../Models/sales')

exports.add_sales = (req,res) => {
    Sales.create({
        date_order : req.body.date_order,
        order : req.body.order
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })

}

exports.show_sales = (req,res) => {
    var type = req.params.type;
    var start = new Date();
    start.setHours(0,0,0,0);
    
    var end = new Date();
    end.setHours(23,59,59,999);
    
    if(type === "daily"){
        Sales.find({
            date_order : {
                $gte: start, $lt: end
            }
        })
        .sort({date_order : -1})
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json(error)
        })
    }else if(type === "weekly"){
        var d = new Date();
        d.setDate(d.getDate()-7);
        
        Sales.aggregate([
            // {$match : {"date_order" : {$gt : d}}},
            {$group : {_id : {
                date_order : "$date_order",
                order : "$order"
            }}},
            {$group : {
                _id : "$_id.date_order",
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
                        date_order : "$_id",
                        list_order_daily : "$list_order_daily"
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
    }else if(type === "monthly"){
        Sales.find({
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
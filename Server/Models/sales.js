const mongoose = require("../Database/db");

const salesSchema = {
    date_order : {
        type : Date,
        required : true,
    },
    order : {
        type : Object,
        required : true
    }
};

const Sales = mongoose.model("sales", salesSchema);

module.exports = Sales;
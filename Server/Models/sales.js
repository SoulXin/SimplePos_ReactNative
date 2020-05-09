const mongoose = require("../Database/db");

const salesSchema = {
    user_id : {
        type : String,
        required : true
    },
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
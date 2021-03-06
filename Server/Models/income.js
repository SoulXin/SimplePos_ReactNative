const mongoose = require("../Database/db");

const incomeSchema = {
    user_id : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true,
    },
    code : {
        type : String,
        required : true
    },
    list_income : {
        type : Array,
        required : true
    },
    income : {
        type : Number,
        required : true
    }
};

const Income = mongoose.model("income", incomeSchema);

module.exports = Income;
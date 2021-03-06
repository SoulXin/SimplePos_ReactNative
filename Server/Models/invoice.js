const mongoose = require("../Database/db");

const invoiceSchema = {
    user_id : {
        type : String,
        required : true
    },
    bk : {
        type : String,
        required : true
    },
    mechanic : {
        type : String,
        required : true
    },
    date_order : {
        type : Date,
        required : true,
        default : new Date()
    },
    product : {
        type : Object,
        required : true
    }
};

const Invoice = mongoose.model("invoice", invoiceSchema);

module.exports = Invoice;
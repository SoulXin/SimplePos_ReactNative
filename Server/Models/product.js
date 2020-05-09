const mongoose = require("../Database/db");

const productSchema = {
    user_id : {
        type : String,
        required : true
    },
    product_name : {
        type : String,
        required : true
    },
    product_capital : {
        type : Number,
        required : true
    },
    product_price : {
        type : Number,
        required : true
    },
    product_type : {
        type : Object,
        required : true
    },
    qty : {
        type : Number,
        default : 1,
        required : true
    }
};

const Product = mongoose.model("product", productSchema);

module.exports = Product;
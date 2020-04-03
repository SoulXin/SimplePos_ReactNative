const mongoose = require("../Database/db");

const motorcycleSchema = {
    name : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    year : {
        type : Number,
        required : true
    }
};

const Motorcycle = mongoose.model("motorcycle", motorcycleSchema);

module.exports = Motorcycle;
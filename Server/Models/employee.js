const mongoose = require("../Database/db");

const employeeSchema = {
    name : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true
    },
    religion : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    districts : {
        type : String,
        required : true
    },
    phone_number : {
        type : Number,
        required : true
    }
};

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
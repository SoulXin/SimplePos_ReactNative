const mongoose = require("../Database/db");

const employee_workSchema = {
    user_id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true,
    },
    date_work : {
        type : Date,
        required : true
    },
    work_list : {
        type : Array,
        required : true
    }
};

const EmployeeWork = mongoose.model("employee_work", employee_workSchema);

module.exports = EmployeeWork;
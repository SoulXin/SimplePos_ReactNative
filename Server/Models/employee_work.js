const mongoose = require("../Database/db");

const employee_workSchema = {
    name : {
        type : String,
        required : true,
    },
    work_list : {
        type : Array,
        required : true
    }
};

const EmployeeWork = mongoose.model("employee_work", employee_workSchema);

module.exports = EmployeeWork;
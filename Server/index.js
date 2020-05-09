const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;
require('./Database/db');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(cors({origin: true, credentials: true}));
app.use(express.json());

app.use('/product',require('./Routes/product'));
app.use('/motorcycle',require('./Routes/motorcycle'));
app.use('/invoice',require('./Routes/invoice'));
app.use('/sales',require('./Routes/sales'));
app.use('/inventory',require('./Routes/inventory'));
app.use('/employee',require('./Routes/employee'));
app.use('/employee_work',require('./Routes/employee_work'));
app.use('/income',require('./Routes/income'));
app.use('/user',require('./Routes/User'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
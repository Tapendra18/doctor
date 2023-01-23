const express = require('express');
const colors = require('colors');
const moragan = require('morgan');
const dotenv = require('dotenv');
const conntectDB = require('./config/db');


//dotenv config
dotenv.config()

//mongodb connection
conntectDB();


//rest object 
const app = express()


//middleware
app.use(express.json());
app.use(moragan('dev'));
//routes
app.use('/api/v1/user',require('./routes/userRoute'))

// port 
const port = process.env.PORT || 8080 

app.listen(port , ()=>{
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.white);
})
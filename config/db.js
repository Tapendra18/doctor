const mongoose = require("mongoose");
const colors = require('colors');

const conntectDB = async() =>{
        try{
            await mongoose.connect('mongodb://localhost:27017/doctorapp');
            console.log(`mongoDb connected ${mongoose.connection.host}`.bgGreen.white);
        }catch(err){
            console.log(`mongobd Server Issue ${err}`.bgRed.white);
        }
}

module.exports = conntectDB;
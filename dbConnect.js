const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://amna:amna@cluster0.6vyfxdq.mongodb.net/sheymoney-client', err => {
    if(err) throw err;
    
})
const connection = mongoose.connection

connection.on('errror', err => (console.log("error")))

connection.on('connected', () => (console.log('mongo db connection successful')))
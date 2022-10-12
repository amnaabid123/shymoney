const  mongoose  = require("mongoose");
const transactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required : true
    },
    type:{
        type:String,
        required : true
    },
    catagory:{
        type:String,
        required : true
    },
    description:{
        type:String,
        required : true
    },
    reference:{
        type:String,
        required : true
    },
    date:{
        type:Date,
        required : true
    },
    userid:{
        type:String,
        required : true
    },
})
const transactionModel = mongoose.model('Transaction' , transactionSchema)
module.exports = transactionModel
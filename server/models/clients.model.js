const mongoose=require('mongoose')
const clientsModel=new mongoose.Schema({
    clientName:{
        type:String,
        default:0,
        unique:true,

    },
    balance:Number
})
const clientColl = mongoose.model('client',clientsModel)
module.exports=clientColl
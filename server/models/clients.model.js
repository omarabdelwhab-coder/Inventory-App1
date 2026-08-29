const mongoose=require('mongoose')
const clientsModel=new mongoose.Schema({
    clientName:String,
    balance:Number
})
const clientColl = mongoose.model('cash',clientsModel)
module.exports=clientColl
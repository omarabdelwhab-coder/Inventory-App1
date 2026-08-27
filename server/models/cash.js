const mongoose=require('mongoose')
const cashModel=new mongoose.Schema({
    cash:Number
})
const cashColl = mongoose.model('cash',cashModel)
module.exports=cashColl
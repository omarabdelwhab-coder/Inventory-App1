const mongoose=require('mongoose')
const productSchema =new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    productName:String,
    quantity:Number,
    unitCost:Number
})
const productColl =mongoose.model('products',productSchema)
module.exports=productColl
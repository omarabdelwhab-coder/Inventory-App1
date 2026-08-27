const mongoose=require('mongoose')

const invoicesModel = new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
   
    finalTotal:Number,
    clientName:String,
    expenseName: String,
expenseAmount: Number,
    invType:{
        type:String,
        enum:['SALE','EXPENSE'],
        default:'SALE'
    },
    items:[
        {
            productId: mongoose.Schema.Types.ObjectId,
            productName:String,
            unitCost:Number,
            quantity:Number,
             total:Number,
            discount:Number,
        }
    ]

})
const invColl = mongoose.model('invoices',invoicesModel)

module.exports=invColl
const cash = require('../models/cash.js')


let getCash=async (req,res)=>{
    try {
        let allCash=await cash.find({},{__v:false})
        res.json(allCash)

        
    } catch (error) {
         res.json({ err: error.message })
        
    }
}    
module.exports={getCash}
const products = require('../models/prouducts.js')

let getAllProducts=async (req,res)=>{
    try {
        let allProducts=await products.find({},{__v:false})
        res.json(allProducts)
        
    } catch (error) {
        res.json({err:error.message})
        
    }
}

let addProduct =async (req,res)=>{
    try{
    let newProduct =new products(req.body);
    await newProduct.save()
    res.json('product added successfully')
    }catch(error){
         res.json({err:error.message})
    }
}
let updateProduct=async (req,res)=>{
    try {
        let id =req.params.id;
        let updateProduct = await products.updateOne({_id:id},{...req.body})
        if (updateProduct.matchedCount === 0) {
  return res.json('product not found');
}
        res.json('prodct updated successfully')
    } catch (error) {
         res.json({err:error.message})

        
    }
}
let deleteProduct =async (req,res)=>{
   try {
     let id=req.params.id;
    let deletedProduct=await products.deleteOne({_id:id})
     if (!deletedProduct) return res.json('product not found')
        res.json('prodct deleted successfully')
    
   } catch (error) {
    res.json({err:error.message})
    
   }


}
let searchByname = async (req,res)=>{
    try {
        let pName = req.params.name;
    let product=await products.find({productName:pName})
    if(!product) res.json('product not found')
    res.json(product)    
        
    } catch (error) {
            res.json({err:error.message})

        
    }
}
let getById=async (req,res)=>{
   try {
     let id = req.params.id
    let product =await products.find({_id:id})
     if(!product) res.json('product not found')
    res.json(product)
    
   } catch (error) {
                res.json({err:error.message})

    
   }
}
module.exports={
    getAllProducts,
    updateProduct,
    addProduct,
    deleteProduct,
    searchByname,
    getById
}


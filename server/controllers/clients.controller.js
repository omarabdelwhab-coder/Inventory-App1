const clients = require('../models/clients.model.js')


const getAllClients = async (req,res)=>{
try {
        const allclients = await clients.find({},{__v:false})
        res.json(allclients)

} catch (error) {
   res.status(500).json({
      err: error.message,
    });
}

}


const addClient =  async (req,res)=>{
    try {
        let newClent = new clients(req,body)
    await newClent.save()
    res.json('client added successfully')
        
    } catch (error) {

     res.status(500).json({
      err: error.message,
    });   
    }


}

const updateClient = async (req,res)=>{
    try{
    let clientName1 =req.params.clientName
    let updateClient = await clients.findOne({clientName:clientName1},{...req.body})
     if (updateClient.matchedCount === 0) {
  return res.json('client not found');
}
        res.json('client updated successfully')
    } catch (error) {
         res.json({err:error.message})

        
    }

}
module.exports ={
    getAllClients,
    addClient,
    updateClient
}
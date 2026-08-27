require('dotenv').config()
const express = require("express");
const cors = require('cors')

const productRoutes=require('./routes/product.routes.js')
const invoicesRoutes=require('./routes/invoices.routes.js')
const cashRoutes=require('./routes/cash.routes.js')
const cash = require('./models/cash.js')


const connection = require("./db/connection.js");

const app =express()
app.use(cors({
  origin: 'http://localhost:4200'
}))
app.use(express.json())
connection()
  .then(async () => {
    const existingCash = await cash.findOne();

    if (!existingCash) {
      await cash.create({ cash: 0 });
      console.log('Cash initialized');
    }
})

app.use('/products',productRoutes)
app.use('/invoices',invoicesRoutes)
app.use('/cash',cashRoutes)







app.listen(process.env.PORTNUM, () => {
  console.log("omar");
});
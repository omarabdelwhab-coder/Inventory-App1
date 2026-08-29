require('dotenv').config();

const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/product.routes.js');
const invoicesRoutes = require('./routes/invoices.routes.js');
const cashRoutes = require('./routes/cash.routes.js');
const clientRoutes = require('./routes/clients.route.js');
const cash = require('./models/cash.js');

const connection = require('./db/connection.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/invoices', invoicesRoutes);
app.use('/cash', cashRoutes);
app.use('/clients', clientRoutes);

connection()
  .then(async () => {
    const existingCash = await cash.findOne();

    if (!existingCash) {
      await cash.create({ cash: 0 });
      console.log('Cash initialized');
    }

    app.listen(process.env.PORTNUM, () => {
      console.log(`Server running on port ${process.env.PORTNUM}`);
    });
  })
  .catch((error) => {
    console.error('Server startup error:', error);
  });

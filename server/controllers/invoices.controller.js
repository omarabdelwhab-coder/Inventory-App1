const invoices = require('../models/Invoices.js');
const products = require('../models/prouducts.js');
const cash = require('../models/cash.js');
const clients = require('../models/clients.model.js');

const getAllInvoices = async (req, res) => {
  try {
    const allInvoices = await invoices.find({}, { __v: false });

    res.json(allInvoices);
  } catch (error) {
    res.status(500).json({
      err: error.message
    });
  }
};

const addInvoices = async (req, res) => {
  try {
    let items = [];
    let finalTotal = 0;
    let remainingAmount = 0;
    let paidAmount = 0;
    let previousBalance = 0;
    let client = null;
    

    if (req.body.invType === 'SALE') {
      // جلب العميل قبل تعديل رصيده
      client = await clients.findOne({
        clientName: req.body.clientName
      });

      // حفظ الرصيد القديم قبل الفاتورة
      if (client) {
        previousBalance = Number(client.balance || 0);
      }

      items = (req.body.items || []).map((item) => {
        const quantity = Number(item.quantity || 0);
        const unitCost = Number(item.unitCost || 0);
        const discount = Number(item.discount || 0);
        const total = quantity * unitCost;

        return {
          ...item,
          quantity,
          unitCost,
          discount,
          total
        };
      });
     

      finalTotal = items.reduce((sum, item) => {
        const discountValue = item.total * (item.discount / 100);
        return sum + (item.total - discountValue);
      }, 0);

      paidAmount = Number(req.body.paidAmount || 0);
      remainingAmount = finalTotal - paidAmount;
    } else {
      finalTotal = Number(req.body.expenseAmount || 0);
      paidAmount = Number(req.body.paidAmount || 0);
      remainingAmount = finalTotal - paidAmount;
    }
    const lastInvoice = await invoices
  .findOne()
  .sort({ invoiceNumber: -1 });

const invoiceNumber = lastInvoice
  ? lastInvoice.invoiceNumber + 1
  : 1;


    // إنشاء الفاتورة بعد حساب جميع القيم
    const newInvoice = new invoices({
      ...req.body,
      items,
      finalTotal,
      paidAmount,
      remainingAmount,
      previousBalance,
      invoiceNumber
    });

    await newInvoice.save();

    if (req.body.invType === 'SALE') {
      // خصم الكميات من المنتجات
      await products.bulkWrite(
        items.map((item) => ({
          updateOne: {
            filter: {
              _id: item.productId
            },
            update: {
              $inc: {
                quantity: -item.quantity
              }
            }
          }
        }))
      );

      if (!client) {
        // عميل جديد: يبدأ برصيد الفاتورة المتبقي
        await clients.create({
          clientName: req.body.clientName,
          balance: remainingAmount
        });
      } else if (remainingAmount !== 0) {
        // العميل الموجود: الموجب يزيد الدين والسالب يقلله
        await clients.updateOne(
          { _id: client._id },
          {
            $inc: {
              balance: remainingAmount
            }
          }
        );
      }

      // إضافة المدفوع إلى الخزنة
      await cash.updateOne(
        {},
        {
          $inc: {
            cash: paidAmount
          }
        }
      );
    } else {
      // المصروف يخصم من الخزنة
      await cash.updateOne(
        {},
        {
          $inc: {
            cash: -finalTotal
          }
        }
      );
    }

    res.status(201).json(newInvoice);
  } catch (error) {
    console.error('Add invoice error:', error);

    res.status(500).json({
      err: error.message
    });
  }
};

const getById = async (req, res) => {
  try {
    const invoice = await invoices.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        message: 'Invoice not found'
      });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({
      err: error.message
    });
  }
};
const serarchByName = async (req,res)=>{
  try {
        let clientName1 =req.params.clientName
    let invoice = await invoices.find({
      clientName: { $regex: clientName1, $options: 'i' }
    })
      if(!invoice) res.json('invoice not found')
    res.json(invoice)
        
    } catch (error) {
        res.status(500).json({
      err: error.message,
    });   
    }

}
const serarchByinvoiceNumber = async (req,res)=>{
  try {
        let invoiceNumber1 =req.params.invoiceNumber
    let invoice = await invoices.find({
      invoiceNumber:invoiceNumber1
    })
      if(!invoice) res.json('invoice not found')
    res.json(invoice)
        
    } catch (error) {
        res.status(500).json({
      err: error.message,
    });   
    }

}

module.exports = {
  getAllInvoices,
  addInvoices,
  getById,
  serarchByName,
  serarchByinvoiceNumber
};

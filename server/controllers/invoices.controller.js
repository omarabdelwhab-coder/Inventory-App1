const invoices = require("../models/Invoices.js");
const products = require("../models/prouducts.js");
const cash = require("../models/cash.js");

const getAllInvoices = async (req, res) => {
  try {
    const allInvoices = await invoices.find({}, { __v: false });

    res.json(allInvoices);
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};

const addInvoices = async (req, res) => {
  try {
    let items = [];
    let finalTotal = 0;

    if (req.body.invType === "SALE") {
      items = req.body.items.map((item) => {
        const total = item.quantity * item.unitCost;

        const discount = item.discount || 0;

        return {
          ...item,
          total,
          discount,
        };
      });

      finalTotal = items.reduce((sum, item) => {
        const discountValue = item.total * (item.discount / 100);

        return sum + (item.total - discountValue);
      }, 0);
    } else {
      finalTotal = Number(req.body.expenseAmount) || 0;
    }

    const newInvoice = new invoices({
      ...req.body,
      items,
      finalTotal,
    });

    await newInvoice.save();

    if (req.body.invType === "SALE") {
      await products.bulkWrite(
        items.map((item) => ({
          updateOne: {
            filter: {
              _id: item.productId,
            },

            update: {
              $inc: {
                quantity: -item.quantity,
              },
            },
          },
        })),
      );

      await cash.updateOne(
        {},
        {
          $inc: {
            cash: finalTotal,
          },
        },
      );
    } else {
      await cash.updateOne(
        {},
        {
          $inc: {
            cash: -finalTotal,
          },
        },
      );
    }

    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const invoice = await invoices.findById(id);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};

module.exports = {
  getAllInvoices,
  addInvoices,
  getById,
};

const createError = require('http-errors');
const Transaction = require('../Models/Transaction.model');
var sanitizer = require('sanitize')();
const { check } = require('express-validator');

//if time permits connection settings will be moved to another js file
const { MongoClient } = require('mongodb');
var mongoUrl = "mongodb+srv://sarkar:Sarkar2022@cluster0.bxrrt.mongodb.net/PaymentGateway?retryWrites=true&w=majority";
const client = new MongoClient(mongoUrl);


module.exports = {
  getAllTransactions: async (req, res, next) => {
    try {
      await client.connect();
      //const results = await client.db("PaymentGateway").collection("customerTransactions").find(  { $or: [ { status: 'COMPLETED' }, { status: 'IN PROGRESS' } ] } ).toArray();
      //const results = await client.db("PaymentGateway").collection("customerTransactions").find({ status: { $nin: ["COMPLETED", "IN PROGRESS", "REJECTED"] } }).toArray();

      const results = await client.db("PaymentGateway").collection("customerTransactions").find({ status: { $nin: ["REJECTED"] } }).toArray(); // CHANDRA TESTING ONLY

      //const results = await client.db("PaymentGateway").collection("customerTransactions").findOne({ status: 'COMPLETED'});
      res.send(results);
    } catch (error) {
      res.send(error.message);
      //console.log(error.message);
    }
  },

  createNewTransaction: async (req, res, next) => {
    try {
      const Transaction = new Transaction(req.body);
      const result = await transaction.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

    /*Or:
  If you want to use the Promise based approach*/
    /*
  const Transaction = new Transaction({
    name: req.body.name,
    price: req.body.price
  });
  Transaction
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    */
  },

  findTransactionById: async (req, res, next) => {
    const id = req.params.id;
    //const id = sanitizer.value(req.params.id).isString();
    try {
      await client.connect();
      const Transaction = await client.db("PaymentGateway").collection("customerTransactions").findOne({ id: id });
      //const Transaction = await Transaction.findById(id);
      // const Transaction = await Transaction.findOne({ _id: id });
      if (!Transaction) {
        throw createError(404, 'Transaction does not exist.');
      }
      res.send(Transaction);
    } catch (error) {
      console.log(error.message);
      /*if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Transaction id'));
        return;
      }*/
      next(error);
    }
  },

  updateATransaction: async (req, res, next) => {
    try {
      const id = sanitizer.value(req.params.id, 'number');
      //const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Transaction.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Transaction does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Transaction Id'));
      }

      next(error);
    }
  },

  deleteATransaction: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Transaction.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Transaction does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Transaction id'));
        return;
      }
      next(error);
    }
  },


  findTransactionByDate: async (req, res, next) => {
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
    //console.log('startdate:',startdate);
    //console.log('enddate:',enddate);

    try {
      await client.connect();
      //const results = await client.db("PaymentGateway").collection("customerTransactions").find({ date: {$gte:startdate, $lt:enddate}}).toArray(); // CHANDRA TESTING ONLY
      const results = await client.db("PaymentGateway").collection("customerTransactions").find({ $and: [{ date: { $gte: startdate, $lt: enddate } }, { status: { $nin: ["REJECTED"] } }] }).sort({ date: 1 }).toArray(); // CHANDRA TESTING ONLY
      //{date: {$gte:'2022-11-01', $lt:'2022-11-30'}}
      //const results = await client.db("PaymentGateway").collection("customerTransactions").find({ date: {$gte:'2022-02-10', $lt:'2023-02-10'}}).toArray();
      res.send(results);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

};

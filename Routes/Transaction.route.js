const express = require('express');
const router = express.Router();

const TransactionController = require('../Controllers/Transaction.Controller');

//Get a list of all Transactions
router.get('/', TransactionController.getAllTransactions);

//Create a new Transaction
router.post('/', TransactionController.createNewTransaction);

//Get a Transaction by id
router.get('/:id', TransactionController.findTransactionById);

//Update a Transaction by id
router.patch('/:id', TransactionController.updateATransaction);

//Delete a Transaction by id
router.delete('/:id', TransactionController.deleteATransaction);

//Get a Transaction by date
router.get('/:startdate/:enddate', TransactionController.findTransactionByDate);

module.exports = router;

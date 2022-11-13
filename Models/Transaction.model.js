const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  sender:
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    IDNumber: { type: String, required: true }
  },
  recipient:
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bank: { type: String, required: true }
  },
  Amount: { type: Number, required: true },
  CurrencyCd: { type: String, required: true },
  Comments: { type: String, required: true },
  status: { type: String, required: true }
});

/*const TransactionSchema = new Schema({
  id:1,
  date:{"$numberLong":"1639502071000"},
  sender:
    {firstName:"John",
    lastName:"Smith",
    dateOfBirth: "1970-01-23",
    IDNumber:"100001"},
  recipient:
    {firstName:"Jane",
    lastName:"doe",
    email:"janedoe@company.com",
    accountNumber:"200001",
    bank:"TD"},
  Amount:100,
  CurrencyCd:"CAD",
  Comments:"Utility bill",
  status:"COMPLETED"
});
*/

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;

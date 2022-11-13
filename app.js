const express = require('express');
const createError = require('http-errors');
const dbUtil = require('./initMongoDB');
const dotenv = require('dotenv').config();
var cors = require('cors');

const app = express();

//Enable All CORS Requests
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO:Initialize DB
//require('./initDB')();
//dbUtil.init();

const TransactionRoute = require('./Routes/Transaction.route');
app.use('/transactions', TransactionRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
  // You can use the above code if your not using the http-errors module
  //next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('CSP Patidar Server started on port ' + PORT + '...');
});

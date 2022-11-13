const { MongoClient } = require('mongodb');
var mongoUrl = "mongodb+srv://sarkar:Sarkar2022@cluster0.bxrrt.mongodb.net/PaymentGateway?retryWrites=true&w=majority"
const client = new MongoClient(mongoUrl);

let db = {};
class dbUtil {
  static init() {
    db = client.connect()
      .then(() => {
        console.log('Mongodb connected....');
      })
      .catch(err => console.log(err.message));

    /*client.connection.on('connected', () => {
      console.log('Mongoose connected to db...');
    });

    client.connection.on('error', err => {
      console.log(err.message);
    });

    client.connection.on('disconnected', () => {
      console.log('Mongoose connection is disconnected...');
    });
    */
    process.on('SIGINT', () => {
      client.connection.close(() => {
        console.log(
          'Mongoose connection is disconnected due to app termination...'
        );
        process.exit(0);
      });
    });
  };
};

module.exports = dbUtil;
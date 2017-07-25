const mongoose = require('mongoose');  // http://mongoosejs.com/docs/guide.html

mongoose.Promise = global.Promise;     // http://mongoosejs.com/docs/promises.html

const options = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
}

const db = mongoose.connect(process.env.DB_URL, options);

db.connection.on('open', () => {
  console.log(`Connection to db success: Mongoose version: ${db.version}`);
});

db.connection.on('error', () => {
  console.log(`Unable to connect to the db`);
});

module.exports = db;
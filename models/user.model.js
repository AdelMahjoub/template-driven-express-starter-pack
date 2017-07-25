const db        = require('../services/db.service'); // require the db connection
const validator = require('validator');              // https://github.com/chriso/validator.js

// User schema: edit at will
const UserSchema = db.Schema({
  
});

const User = db.model('User', UserSchema);

module.exports = User;
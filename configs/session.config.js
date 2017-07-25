const MongoStore   = require('connect-mongo')(require('../server')['session']); // https://github.com/jdesboeufs/connect-mongo
const db           = require('../services/db.service');                         // database connection

// session setup
module.exports = {
  cookie: {
    httpOnly: true,
    maxAge: 86400000,
    secure: (process.env.NODE_ENV === 'production' ? true : false)
  },
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESS_SECRET,
  store: new MongoStore({mongooseConnection: db.connection})
}
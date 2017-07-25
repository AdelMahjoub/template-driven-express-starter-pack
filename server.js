//========================================================================================================
//                                           NODE MODULES
//========================================================================================================
require('dotenv').config();                      // https://github.com/motdotla/dotenv
const express      = require('express');         // http://expressjs.com/en/4x/api.html
const session      = require('express-session'); // https://github.com/expressjs/session
const cookieParser = require('cookie-parser');   // https://github.com/expressjs/cookie-parser
const flash        = require('connect-flash');   // https://github.com/jaredhanson/connect-flash
const passport     = require('passport');        // http://passportjs.org/
const compression  = require('compression');     // https://github.com/expressjs/compression
const helmet       = require('helmet');          // https://github.com/helmetjs/helmet
const path         = require('path');            // https://nodejs.org/dist/latest-v6.x/docs/api/path.html
const zlib         = require('zlib');            // https://nodejs.org/dist/latest-v6.x/docs/api/zlib.html
//=========================================================================================================

// express app instance
const app = express();

// export session: used in ./configs/session.config.js to initialize the session store
module.exports.session = session;

// setup the server port
app.set('port', process.env.PORT || 3000);

// set up the views engine and the views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));

// enable trust proxy on production env
if(app.get('env') === 'production') {
  app.set('trust-proxy', 1)
}

// app security policies: default settings of helmetjs
app.use(helmet());

// cookie-parser middleware, used by connect-flash
app.use(cookieParser(process.env.SESS_SECRET));

// express-session middleware 
app.use(session(require('./configs/session.config')));

// compression middleware
app.use(compression({
  level: zlib.Z_BEST_COMPRESSION,
  strategy: zlib.Z_DEFAULT_STRATEGY
}));

// passportjs middleware
app.use(passport.initialize());
app.use(passport.session());

// connect-flash middleware: flash errors and infos into views
app.use(flash());

// views global variables
app.use((req, res, next) => {
  app.locals.title         = require('./locals/app.locals')['title'];
  app.locals.socials       = require('./locals/app.locals')['socials'];
  app.locals.authProviders = require('./locals/app.locals')['authProviders'];
  app.locals.authProvider  = '';
  app.locals.user          = req.user;
  app.locals.errors        = flash('error'); // views errors references flash('error') 
  app.locals.infos         = flash('info');  // views infos references flash('info')
  next();
});

// export the views globals in order to be used in other modules such as the router module
module.exports.locals  = app.locals;

// export a router instance: to be used in ./routes/router.js to write the app routes
module.exports.router  = express.Router();

// import the router to use it as a middleware
const router = require('./routes/router');

// serve static files
app.use(
  express.static(
    path.join(__dirname, app.get('env') === 'production' ? 'dist': 'tmp')
  )
);

// route requests
app.use(router);

// start the app server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}, on ${app.get('env')} mode`);
});

// export the app instance: mostly for writing test suites
module.exports.server = app;
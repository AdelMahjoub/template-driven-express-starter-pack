const bodyParser = require('body-parser'); // https://github.com/expressjs/body-parser
const passport   = require('passport');    // http://passportjs.org/

const router = require('../server')['router']; // require the router instance
const locals = require('../server')['locals']; // require the views globals

const authRouter = require('./auth-providers.routes'); // 3rd party auth providers routes

//====================================================
//                GET REQUESTS ROUTES
//====================================================

// landing page
router.get('/', (req, res, next) => {
  res.render('index');
});

// login page
router.get('/login', (req, res, next) => {
  res.render('login');
});

// signup page
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

// 3rd party auth providers request handler 
router.use(authRouter);

// unmatched requests handler
router.get('*', (req, res, next) => {
  res.render('page-not-found');
});

//====================================================
//                POST REQUESTS ROUTES
//====================================================

module.exports = router;
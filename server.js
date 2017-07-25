require('dotenv').config();
const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('view option', { path: path.join(__dirname, 'views') })
app.set('views', path.join(__dirname, 'views'));

app.use(
  express.static(
    path.join(__dirname, app.get('env') === 'production' ? 'dist': 'tmp')
  )
);

app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}, on ${app.get('env')} mode`);
});

module.exports = app;
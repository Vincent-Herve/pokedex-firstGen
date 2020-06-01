const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');
const PORT = 1234;
const router = require(path.join(__dirname, 'app', 'router'));
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
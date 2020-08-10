const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require('path');

const bookRouter = require('./routers/book.router');
const signUpRouter = require('./routers/sign-up.router');
const loginRouter = require('./routers/login.router');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname,'./public')));

app.use('/book',bookRouter);
app.use('/sign-up',signUpRouter);
app.use('/login',loginRouter);

app.listen(3000);
const express = require('express');
const mongoose = require('mongoose')
const Epub = require('epub-gen');
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');

const session = require('express-session')
const bodyParser = require('body-parser')

const {Books, Chapters, User} = require('./models/index.model')
const {dbConnect, dbDisconnect, mongoUrl} = require('./db/db');
const { urlencoded, json } = require('express');
const { dirname } = require('path');

const indexRouter = require('./routes/indexRouter');
const app = express();
const PORT = 3000;
dbConnect();
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(cookieParser('new secret key'))
app.use(session({
  secret: 'new secret key',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 6000000 },
  store: MongoStore.create({ mongoUrl }),
}))

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

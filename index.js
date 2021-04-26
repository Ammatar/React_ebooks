const express = require('express');
const mongoose = require('mongoose')
const Epub = require('epub-gen');
const cors = require('cors')
const path = require('path')

const {Books, Chapters, User} = require('./models/index.model')
const {dbConnect, dbDisconnect} = require('./db/db');
const { urlencoded, json } = require('express');
const { dirname } = require('path');

const indexRouter = require('./routes/indexRouter');
const app = express();
const PORT = 3000;
dbConnect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

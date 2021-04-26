// require('dotenv').config();
const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/BooksDB'//process.env.DB_PATH;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
const dbConnect = () => {
  mongoose.connect(mongoUrl, options).then(() => {
    console.log('DB connected');
  });
};
const dbDisconnect = () => {
  mongoose.disconnect()
}
module.exports = { dbConnect, mongoUrl, dbDisconnect };

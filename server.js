require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Connecting to MongoDB Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB is Connected');
  })
  .catch((error) => {
    console.log(error);
  });

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/category'));
app.use('/api', require('./routes/product'));
app.use('/api', require('./routes/order'));
app.use('/api', require('./routes/stripePayment'));

// Configuration for Nodejs
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}/`);
});

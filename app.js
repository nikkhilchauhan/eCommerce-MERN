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
    useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB is Connected');
  })
  .catch(error => {
    console.log(error);
  });

// Body parsers - Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Configuration for Nodejs
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}/`);
});
app.get('/', (req, res) => {
  res.send('You are genius');
});

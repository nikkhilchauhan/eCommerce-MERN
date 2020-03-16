const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connecting to MongoDB Database
mongoose
  .connect('mongodb://localhost:27017/tshirt', {
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

// Configuration for Nodejs
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}/`);
});
app.get('/', (req, res) => {
  res.send('You are genius');
});

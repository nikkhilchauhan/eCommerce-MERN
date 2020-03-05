const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('You are genius');
});

app.listen(8000, () => {
  console.log('Running');
});

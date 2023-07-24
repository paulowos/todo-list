const express = require('express');

const user = express.Router();

user.put('/create', (req, res) => {

  res.send('Hello World');
});

module.exports = user;
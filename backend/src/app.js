const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const router = require('./routes');
require('express-async-error');

const app = express();

app.use(cors());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
}));
app.use(morgan('dev', {
  skip: (req, res) => process.env.NODE_ENV === 'test',
}));
app.use(express.json());

app.use(router);

module.exports = app;
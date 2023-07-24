const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use(router);

module.exports = app;
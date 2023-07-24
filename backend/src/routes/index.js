const express = require('express');
const user = require('./user');
const tasks = require('./tasks');

const router = express.Router();

router.use('/user', user);
router.use('/tasks', tasks);


module.exports = router;
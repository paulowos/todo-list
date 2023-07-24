const express = require('express');
const { createUser } = require('../db/userDB');
const { userValidation, loginValidation } = require('../middlewares/userMiddlewares');

const user = express.Router();

user.post('/create', userValidation, async (req, res) => {
  try {
    const id = await createUser(req.body);
    res.status(201).json({ id });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Usuário já existe' });
  }
});

user.post('/login', loginValidation, async (req, res) => {
  const { id } = req.body;
  res.status(200).json({ id });
});

module.exports = user;
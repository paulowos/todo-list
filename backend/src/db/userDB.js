const connection = require('./connection');
const { randomUUID } = require('crypto');
const createUser = async ({ name, email, password }) => {
  const id = randomUUID();
  await connection.query(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`, [id, name, email, password]);
};

module.exports = { createUser };
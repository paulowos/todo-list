const connection = require('./connection');
const { randomUUID } = require('crypto');
const argon2 = require('argon2');
const createUser = async ({ name, email, password }) => {
  const id = randomUUID();
  const hash = await argon2.hash(password);
  await connection.query(`INSERT INTO users (id, name, email, password) 
  VALUES (?, ?, ?, ?)`, [id, name, email, hash]);
};
module.exports = { createUser };
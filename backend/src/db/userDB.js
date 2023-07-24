const connection = require('./connection');
const { randomUUID } = require('crypto');
const createUser = async ({ name, email, password }) => {
  const id = randomUUID();
  await connection.query(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`, [id, name, email, password]);
};

const loginUser = async ({ email, password }) => {
  const [[rows]] = await connection.query(`SELECT id FROM users WHERE email = ? AND password = ?`, [email, password]);
  return rows;
};
module.exports = { createUser, loginUser };
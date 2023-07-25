const connection = require('./connection');
const { randomUUID } = require('crypto');
const argon2 = require('argon2');
const createUser = async ({ name, email, password }) => {
  const id = randomUUID();
  const hash = await argon2.hash(password);
  await connection.query(`INSERT INTO users (id, name, email, password) 
  VALUES (?, ?, ?, ?)`, [id, name, email, hash]);
  return id;
};

const loginUser = async ({ email }) => {
  const [[rows]] = await connection.query(`SELECT id, password FROM users WHERE email = ?`, [email]);
  return rows;
};

const editUser = async ({ id, email, newPassword }) => {
  const hash = await argon2.hash(newPassword);
  const [rows] = await connection.query(`UPDATE users SET  password = ? WHERE id = ? AND email = ?`, [hash, id, email]);
  return rows.affectedRows;
};

const deleteUser = async ({ id, email }) => {
  const [rows] = await connection.query(`DELETE FROM users WHERE id = ? AND email = ?`, [id, email]);
  return rows.affectedRows;
};

module.exports = { createUser, loginUser, editUser, deleteUser };
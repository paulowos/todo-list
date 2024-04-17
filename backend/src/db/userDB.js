const crypto = require('crypto');
const argon2 = require('argon2');
const connection = require('./connection');

const createUser = async ({ name, email, password }) => {
  const id = crypto.randomUUID();
  const hash = await argon2.hash(password);
  await connection.query(
    `INSERT INTO users (id, name, email, password) 
  VALUES ($1, $2, $3, $4)`,
    [id, name, email, hash],
  );
  return id;
};

const loginUser = async ({ email }) => {
  const { rows } = await connection.query(
    'SELECT id, name, password FROM users WHERE email = $1',
    [email],
  );
  return rows;
};

const editUser = async ({ id, email, newPassword }) => {
  const hash = await argon2.hash(newPassword);
  const { rowCount } = await connection.query(
    'UPDATE users SET  password = $1 WHERE id = $2 AND email = $3',
    [hash, id, email],
  );
  return rowCount;
};

const deleteUser = async ({ id, email }) => {
  const { rowCount } = await connection.query(
    'DELETE FROM users WHERE id = $1 AND email = $2',
    [id, email],
  );
  return rowCount;
};

module.exports = { createUser, loginUser, editUser, deleteUser };

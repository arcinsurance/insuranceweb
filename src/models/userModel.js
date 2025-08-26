import { db } from '../index.js';

export async function getAllUsers() {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
}

export async function createUser(user) {
  const { name, email, password, role } = user;
  const [result] = await db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role]
  );
  return { id: result.insertId, ...user };
}

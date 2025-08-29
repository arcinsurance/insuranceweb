import { db } from '../index.js';

export async function getAllContacts() {
  const [rows] = await db.query('SELECT * FROM contacts');
  return rows;
}

export async function createContact(contact) {
  const { name, email, phone, message } = contact;
  const [result] = await db.query(
    'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
    [name, email, phone, message]
  );
  return { id: result.insertId, ...contact };
}

import { db } from '../index.js';

export async function getAllLeads() {
  const [rows] = await db.query('SELECT * FROM leads');
  return rows;
}

export async function createLead(lead) {
  const { name, email, phone, message } = lead;
  const [result] = await db.query(
    'INSERT INTO leads (name, email, phone, message) VALUES (?, ?, ?, ?)',
    [name, email, phone, message]
  );
  return { id: result.insertId, ...lead };
}

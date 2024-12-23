import { customers } from '../drizzle/schema.js';
import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    const {
      name,
      firstname,
      lastname,
      phone,
      phone2,
      email,
      email2,
      // Add other fields here
    } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ error: 'Name, phone, and email are required' });
    }

    const sql = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(sql);

    const result = await db.insert(customers).values({
      name,
      firstname,
      lastname,
      phone,
      phone2,
      email,
      email2,
      userId: user.id,
      // Add other fields here
    }).returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error saving customer:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error saving customer' });
    }
  }
}
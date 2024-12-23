import { customers } from '../drizzle/schema.js';
import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { ilike, or, desc } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    const { search, filter } = req.query;
    const sql = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(sql);

    let query = db.select().from(customers).limit(100);

    if (search) {
      const searchTerm = `%${search}%`;
      const searchConditions = or(
        ilike(customers.name, searchTerm),
        ilike(customers.firstname, searchTerm),
        ilike(customers.lastname, searchTerm),
        ilike(customers.email, searchTerm),
        ilike(customers.email2, searchTerm),
        ilike(customers.phone, searchTerm),
        ilike(customers.phone2, searchTerm)
      );
      query = query.where(searchConditions);
    }

    if (filter) {
      // Implement additional filtering logic based on filter criteria
      // Example: filter by status or assigned_to
      if (filter === 'recent') {
        query = query.orderBy(desc(customers.createdAt));
      }
      // Add more filter conditions as needed
    }

    const result = await query;

    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error fetching customers' });
    }
  }
}
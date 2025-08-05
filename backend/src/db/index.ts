// src/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'myuser',
  password: 'mypassword', 
  database: 'mydatabase',
});

export const db = drizzle(pool, { schema });

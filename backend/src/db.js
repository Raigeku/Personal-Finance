import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
	console.log('✅ Connected to PostgreSQL');
});

export default pool;

import {Pool} from 'pg';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});
console.log(`Connecting) to database: ${process.env.DATABASE_URL}`);
pool.on('connect', () => {
	console.log('Connected to the database');
});
export default pool;
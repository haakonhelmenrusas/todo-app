import {NextRequest, NextResponse} from 'next/server';
import pool from '@/utils/database';

export async function GET() {
	try {
		const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
		return NextResponse.json(result.rows);
	} catch {
		return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
	}
}

export async function POST(req: NextRequest) {
	const {title, completed} = await req.json();

	try {
		const result = await pool.query(
				'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
				[title, completed || false]
		);
		return NextResponse.json(result.rows[0], {status: 201});
	} catch {
		return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
	}
}
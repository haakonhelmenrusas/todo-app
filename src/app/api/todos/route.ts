import pool from '@/utils/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
	try {
		const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
		return NextResponse.json(result.rows);
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	const { title, completed } = await req.json();

	try {
		const result = await pool.query('INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *', [
			title,
			completed || false,
		]);
		return NextResponse.json(result.rows[0], { status: 201 });
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest) {
	const { id, title, completed } = await req.json();

	try {
		const result = await pool.query('UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *', [
			title,
			completed,
			id,
		]);
		if (result.rowCount === 0) {
			return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
		}
		return NextResponse.json(result.rows[0]);
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function PUT(req: NextRequest) {
	const { id, completed } = await req.json();

	try {
		const result = await pool.query('UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *', [completed, id]);
		if (result.rowCount === 0) {
			return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
		}
		return NextResponse.json(result.rows[0]);
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

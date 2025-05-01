import pool from '@/utils/database';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;

	try {
		const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);

		if (result.rowCount === 0) {
			return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
		}
		return NextResponse.json(result.rows[0]);
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

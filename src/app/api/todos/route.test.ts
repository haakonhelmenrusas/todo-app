import pool from '@/utils/database';
import { NextRequest } from 'next/server';
import { GET, POST } from './route';

jest.mock('@/utils/database', () => ({
	query: jest.fn(),
}));

describe('GET /todos', () => {
	it('should return a list of todos', async () => {
		const mockTodos = [{ id: 1, title: 'Test Todo', completed: false, created_at: '2023-01-01' }];
		(pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockTodos });

		const response = await GET();

		expect(pool.query).toHaveBeenCalledWith('SELECT * FROM todos ORDER BY created_at DESC');
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual(mockTodos);
	});

	it('should return 500 on database error', async () => {
		(pool.query as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

		const response = await GET();

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({ error: 'Internal Server Error' });
	});
});

describe('POST /todos', () => {
	it('should create a new todo and return it', async () => {
		const mockTodo = { id: 1, title: 'New Todo', completed: false, created_at: '2023-01-01' };
		(pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockTodo] });

		const req = new NextRequest('http://localhost', {
			method: 'POST',
			body: JSON.stringify({ title: 'New Todo', completed: false }),
		});

		const response = await POST(req);

		expect(pool.query).toHaveBeenCalledWith('INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *', [
			'New Todo',
			false,
		]);
		expect(response.status).toBe(201);
		expect(await response.json()).toEqual(mockTodo);
	});

	it('should return 500 on database error', async () => {
		(pool.query as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

		const req = new NextRequest('http://localhost', {
			method: 'POST',
			body: JSON.stringify({ title: 'New Todo', completed: false }),
		});

		const response = await POST(req);

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({ error: 'Internal Server Error' });
	});
});

import request from 'supertest';
import {createServer} from 'http';
import {NextApiHandler} from 'next';
import {GET, POST} from './route';
import pool from '@/utils/database';

// Mock the database pool
jest.mock('@/utils/database', () => ({
	query: jest.fn(),
}));

const mockPool = pool as jest.Mocked<typeof pool>;

describe('Todos API', () => {
	let server: ReturnType<typeof createServer>;

	beforeAll(() => {
		server = createServer((req, res) => {
			const handler: NextApiHandler = async (req, res) => {
				if (req.method === 'GET') {
					return await GET(req as any, res as any);
				} else if (req.method === 'POST') {
					return await POST(req as any, res as any);
				}
			};
			return handler(req, res);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		server.close();
	});

	it('should fetch all todos (GET)', async () => {
		mockPool.query.mockResolvedValueOnce({
			rows: [{id: 1, title: 'Test Todo', completed: false}],
		});

		const response = await request(server).get('/api/todos');
		expect(response.status).toBe(200);
		expect(response.body).toEqual([{id: 1, title: 'Test Todo', completed: false}]);
		expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM "todos" ORDER BY created_at DESC');
	});

	it('should create a new todo (POST)', async () => {
		const newTodo = {title: 'New Todo', completed: false};
		mockPool.query.mockResolvedValueOnce({
			rows: [{id: 1, title: 'New Todo', completed: false}],
		});

		const response = await request(server).post('/api/todos').send(newTodo);
		expect(response.status).toBe(201);
		expect(response.body).toEqual({id: 1, title: 'New Todo', completed: false});
		expect(mockPool.query).toHaveBeenCalledWith(
				'INSERT INTO "todos" (title, completed) VALUES ($1, $2) RETURNING *',
				[newTodo.title, newTodo.completed]
		);
	});
});
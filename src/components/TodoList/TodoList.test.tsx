import { Todo } from '@/types/Todo';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';

describe('TodoList Component', () => {
	const mockTodos: Todo[] = [
		{
			id: 1,
			title: 'Test Todo 1',
			completed: false,
			created_at: new Date('2023-01-01'),
			updated_at: new Date('2023-01-02'),
		},
		{
			id: 2,
			title: 'Test Todo 2',
			completed: true,
			created_at: new Date('2023-01-03'),
			updated_at: new Date('2023-01-04'),
		},
	];

	it('renders loading state correctly', () => {
		render(<TodoList todos={[]} loading={true} error={null} />);
		const loadingPlaceholders = screen.getAllByRole('status');
		expect(loadingPlaceholders).toHaveLength(6);
	});

	it('renders error message when error is present', () => {
		render(<TodoList todos={[]} loading={false} error='Failed to fetch todos' />);
		expect(screen.getByText('Failed to fetch todos')).toBeInTheDocument();
	});

	it('renders message when no todos are available', () => {
		render(<TodoList todos={[]} loading={false} error={null} />);
		expect(screen.getByText('No todos found. Create your first todo!')).toBeInTheDocument();
	});

	it('renders todos correctly', () => {
		render(<TodoList todos={mockTodos} loading={false} error={null} />);
		expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
		expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
	});

	it('renders completed and uncompleted todos correctly', () => {
		render(<TodoList todos={mockTodos} loading={false} error={null} />);
		const completedTodo = screen.getByText('Test Todo 2');
		const uncompletedTodo = screen.getByText('Test Todo 1');
		expect(completedTodo).toBeInTheDocument();
		expect(uncompletedTodo).toBeInTheDocument();
	});
});

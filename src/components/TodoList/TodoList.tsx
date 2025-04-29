'use client';

import { useEffect, useState } from 'react';
import { Todo } from '@/types/Todo';

export function TodoList() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const response = await fetch('/api/todos');
				if (!response.ok) {
					throw new Error('Failed to fetch todos');
				}
				const data = await response.json();
				setTodos(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
			} finally {
				setLoading(false);
			}
		};

		fetchTodos();
	}, []);

	if (loading) {
		return (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
					{[...Array(6)].map((_, index) => (
							<div
									key={index}
									className="h-40 bg-gray-200 rounded-lg animate-pulse p-4"
							>
								<div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
								<div className="h-4 bg-gray-300 rounded w-1/2"></div>
							</div>
					))}
				</div>
		);
	}

	if (error || !todos.length) {
		return (
				<div className="flex flex-col items-center justify-center w-full p-8 bg-gray-50 rounded-lg">
					<p className="text-gray-500 text-lg">
						{error || 'No todos found. Create your first todo!'}
					</p>
				</div>
		);
	}

	return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
				{todos.map((todo) => (
						<div
								key={todo.id}
								className="bg-white shadow-sm rounded-lg p-4 border hover:shadow-md transition-shadow"
						>
							<h3 className="font-medium text-lg mb-2">{todo.title}</h3>
							<div className="flex items-center gap-2">
            <span
		            className={`inline-block w-2 h-2 rounded-full ${
				            todo.completed ? 'bg-green-500' : 'bg-yellow-500'
		            }`}
            />
								<span className="text-sm text-gray-500">
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
							</div>
							<div className="text-xs text-gray-400 mt-4">
								Created: {new Date(todo.createdAt).toLocaleDateString()}
							</div>
						</div>
				))}
			</div>
	);
}
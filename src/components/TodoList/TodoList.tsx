'use client';

import {useEffect, useState} from 'react';
import {Todo} from '@/types/Todo';
import {TodoCard} from "@/components";

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

	function showCompletedTodos() {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.completed));
	}

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
				<button
						className="bg-blue-500 text-white p-2 rounded mb-4 hover:cursor-pointer hover:bg-blue-600 transition-colors duration-200"
						onClick={showCompletedTodos}
				>
					Show Completed Todos
				</button>
				{todos.map((todo) => (
						<TodoCard key={todo.id} title={todo.title} completed={todo.completed}
						          createdAt={todo.created_at} updatedAt={todo.updated_at}/>
				))}
			</div>
	);
}
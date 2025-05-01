'use client';

import { TodoForm, TodoList } from '@/components';
import { Todo } from '@/types/Todo';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchTodos = async () => {
		setLoading(true);
		setError(null);
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

	const handleDelete = useCallback(async (id: number) => {
		try {
			await fetch(`/api/todos/${id}`, { method: 'DELETE' });
			fetchTodos();
		} catch (err) {
			console.error('Failed to delete todo', err);
		}
	}, []);

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
				<h1 className='text-3xl font-bold'>Todo List</h1>
				<TodoForm fetchTodos={fetchTodos} />
				<TodoList todos={todos} loading={loading} error={error} onDelete={handleDelete} />
			</main>
			<footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
				<a
					className='flex items-center gap-2 hover:underline hover:underline-offset-4'
					href='http://rusåsdesign.no'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Image aria-hidden src='/file.svg' alt='File icon' width={16} height={16} />
					Rusås Design
				</a>
			</footer>
		</div>
	);
}

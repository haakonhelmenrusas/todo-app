'use client';

import { TodoCard } from '@/components';
import { Todo } from '@/types/Todo';

interface TodoListProps {
	todos: Todo[];
	loading: boolean;
	error: string | null;
	onDelete: (id: number) => void;
}

export function TodoList({ todos, loading, error, onDelete }: TodoListProps) {
	if (loading) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
				{[...Array(6)].map((_, index) => (
					<div
						key={index}
						role='status'
						aria-label='Loading'
						className='h-40 bg-gray-200 rounded-lg animate-pulse p-4 w-[120px] md:w-[200px] lg:w-[300px]'
					>
						<div className='h-4 bg-gray-300 rounded w-3/4 mb-4'></div>
						<div className='h-4 bg-gray-300 rounded w-1/2'></div>
					</div>
				))}
			</div>
		);
	}

	if (error || !todos.length) {
		return (
			<div className='flex flex-col items-center justify-center w-full p-8 bg-gray-50 rounded-lg'>
				<p className='text-gray-500 text-lg'>{error || 'No todos found. Create your first todo!'}</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
			{todos.map((todo) => (
				<TodoCard
					key={todo.id}
					title={todo.title}
					completed={todo.completed}
					createdAt={todo.created_at}
					updatedAt={todo.updated_at}
					onDelete={() => onDelete(todo.id)}
				/>
			))}
		</div>
	);
}

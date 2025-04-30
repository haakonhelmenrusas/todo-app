'use client';
import {FormEvent, useState} from "react";

export function TodoForm() {
	const [title, setTitle] = useState('');
	const [completed, setCompleted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await fetch('/api/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({title, completed}),
			});

			if (!response.ok) {
				throw new Error('Failed to create todo');
			}

			setTitle('');
			setCompleted(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	return (
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
				<h2 className="text-2xl font-bold">Create Todo</h2>
				{error && <p className="text-red-500">{error}</p>}
				<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border rounded p-2"
						placeholder="Todo title"
						required
				/>
				<div className="flex items-center">
					<input type="checkbox"
					       checked={completed}
					       onChange={(e) => setCompleted(e.target.checked)}
					       className="peer relative appearance-none w-5 h-5
	                          border rounded border-blue-200
	                          cursor-pointer
	                          checked:bg-blue-600"
					       id="circular-checkbox"/>

					<label htmlFor="circular-checkbox"
					       className="ms-2 text-sm font-medium text-gray-200 cursor-pointer">
						Completed
					</label>
				</div>
				<button type="submit" disabled={loading}
				        className="bg-blue-500 text-white p-2 rounded hover:cursor-pointer hover:bg-blue-600 transition-colors duration-200">
					Create Todo
				</button>
			</form>
	);
}
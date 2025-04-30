interface TodoCardProps {
	title: string;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export function TodoCard({title, completed, createdAt, updatedAt}: TodoCardProps) {
	return (
			<div
					className="bg-white shadow-sm rounded-lg p-4 border hover:shadow-md transition-shadow"
			>
				<h3 className="font-medium text-black text-lg mb-2">{title}</h3>
				<div className="flex items-center gap-2">
            <span
		            className={`inline-block w-2 h-2 rounded-full ${
				            completed ? 'bg-green-500' : 'bg-yellow-500'
		            }`}
            />
					<span className="text-sm text-gray-500">
              {completed ? 'Completed' : 'To Do'}
            </span>
				</div>
				<div className="text-xs text-gray-600 mt-4">
					Created: {new Date(createdAt).toLocaleDateString()}
				</div>
				{updatedAt && (
						<div className="text-xs text-gray-600 mt-4">
							Updated: {updatedAt ? new Date(updatedAt).toLocaleDateString() : 'N/A'}
						</div>
				)}
			</div>
	)
}
interface TodoCardProps {
	title: string;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
	onDelete: () => void;
}

export function TodoCard({ title, completed, createdAt, updatedAt, onDelete }: TodoCardProps) {
	return (
		<div className='bg-white shadow-sm rounded-lg p-4 border transition-shadow duration-200 w-[120px] md:w-[200px] lg:w-[300px] flex flex-col justify-between'>
			<h3 className='font-medium text-black text-lg mb-2'>{title}</h3>
			<div className='flex items-center gap-2'>
				<span className={`inline-block w-2 h-2 rounded-full ${completed ? 'bg-green-500' : 'bg-yellow-500'}`} />
				<span className='text-sm text-gray-500'>{completed ? 'Completed' : 'To Do'}</span>
			</div>
			<div className='text-xs text-gray-600 mt-4'>Created: {new Date(createdAt).toLocaleDateString()}</div>
			{updatedAt && (
				<div className='text-xs text-gray-600 mt-4'>
					Updated: {updatedAt ? new Date(updatedAt).toLocaleDateString() : 'N/A'}
				</div>
			)}
			<button
				onClick={onDelete}
				className='mt-4 self-end text-red-500 hover:text-red-700 transition-colors hover:cursor-pointer'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-6 h-6 hover:cursor-pointer'
				>
					<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
				</svg>
			</button>
		</div>
	);
}

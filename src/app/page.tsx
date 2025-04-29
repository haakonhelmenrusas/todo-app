import Image from "next/image";
import {TodoList} from "@/components";

export default function Home() {
	return (
			<div
					className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
					<h1 className="text-3xl font-bold">Todo List</h1>
					<TodoList/>
				</main>
				<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
					<a
							className="flex items-center gap-2 hover:underline hover:underline-offset-4"
							href="http://rusåsdesign.no"
							target="_blank"
							rel="noopener noreferrer"
					>
						<Image
								aria-hidden
								src="/file.svg"
								alt="File icon"
								width={16}
								height={16}
						/>
						Rusås Design
					</a>
				</footer>
			</div>
	);
}

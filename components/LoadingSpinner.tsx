function LoadingSpinner() {
	return (
		<div
			className="inline-block items-center h-6 w-6 -mb-1 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
			role="status"
		>
			<span className="sr-only">Loading...</span>
		</div>
	);
}

export default LoadingSpinner;

function RadialGradientSVG() {
	return (
		<svg
			viewBox="0 0 1208 1024"
			className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 xl:top-0"
		>
			<ellipse
				cx={604}
				cy={512}
				rx={604}
				ry={512}
				fill="url(#radial-gradient)"
			/>
			<defs>
				<radialGradient id="radial-gradient">
					<stop stopColor="#7775D6" />
					<stop stopColor="#E935C1" offset={1} />
				</radialGradient>
			</defs>
		</svg>
	);
}

export default RadialGradientSVG;

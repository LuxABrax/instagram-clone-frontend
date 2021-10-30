import { useEffect } from "react";
import "../../styles/stories/lineDisplay.scss";
const LineDisplay = ({
	lines,
	currentLine,
	linePercent,
	setLinePercent,
	paused,
	handleNext,
}) => {
	const arr = [];
	let i = 0;
	while (i < lines) {
		arr.push(i);
		i++;
	}

	useEffect(() => {
		let timer;
		if (linePercent <= 100) {
			timer = setTimeout(() => {
				if (paused) {
					return;
				}
				setLinePercent(l => l + 0.5);
				if (linePercent === 100) {
					setLinePercent(0);
					handleNext();
				}
			}, 20);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [linePercent, setLinePercent, paused, handleNext]);

	return (
		<div className='line-display'>
			{arr.map((i, idx) => {
				return (
					<div
						className='line-container'
						style={{
							width: `${lines === 1 ? "100" : `${Math.abs(100 / lines - 1)}`}%`,
						}}
					>
						<div
							className={`line ${
								idx === currentLine
									? "active"
									: idx < currentLine
									? "show"
									: "hide"
							}`}
							style={{
								width: `${idx === currentLine ? `${linePercent}` : "100"}%`,
							}}
						></div>
					</div>
				);
			})}
		</div>
	);
};

export default LineDisplay;

import { useEffect } from "react";
import { useState } from "react";
import useWindowDimensions from "../../utils/windowHook";

import "../../styles/stories/storyCard.scss";

const StoryCard = ({ story, username, active }) => {
	const { width } = useWindowDimensions();
	const [cHeight, setCHeight] = useState(0);
	const [cWidth, setCWidth] = useState(0);

	useEffect(() => {
		if (width > 650) {
			let height = width / (16 / 9);
			setCHeight(height);
			setCWidth(height / (16 / 9));
		} else {
			let height = width / 1.6;
			setCHeight(height);
			setCWidth(height / (16 / 9));
		}
	}, [width]);

	const handlePrev = () => {
		console.log("next: ", story);
	};
	const handleNext = () => {
		console.log("next: ", story);
	};

	return (
		<div
			className={`story-card ${active ? "" : "small"}`}
			style={{ height: cHeight, width: cWidth, backgroundColor: "yellow" }}
		>
			<button onClick={handlePrev}>Prev</button>
			StoryCard {username} {active ? "active" : ""}
			<button onClick={handleNext}>Next</button>
		</div>
	);
};

export default StoryCard;

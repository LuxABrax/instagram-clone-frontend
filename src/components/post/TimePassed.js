import { useEffect, useState } from "react";
import { calcTime } from "./calcTime";

const TimePassed = ({ createdAt, isStory }) => {
	const [passed, setPassed] = useState("");

	useEffect(() => {
		let passedTime = calcTime(createdAt, isStory);
		setPassed(passedTime);
	}, [createdAt, isStory]);

	return <div className='timePosted'>{passed}</div>;
};

export default TimePassed;

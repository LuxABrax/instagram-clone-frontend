import { useEffect, useState } from "react";
import { calcTime } from "./calcTime";

const TimePassed = ({ createdAt }) => {
	const [passed, setPassed] = useState("");

	useEffect(() => {
		let passedTime = calcTime(createdAt);
		setPassed(passedTime);
	}, [createdAt]);

	return <div className='timePosted'>{passed}</div>;
};

export default TimePassed;

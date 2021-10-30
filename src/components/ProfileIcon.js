import { useState } from "react";

import "../styles/profileIcon.scss";

const ProfileIcon = ({
	image,
	iconSize,
	storyBorder,
	profileActive,
	seen,
	onClick,
	addStory,
}) => {
	const [loaded, setLoaded] = useState(false);

	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	let randomId = getRandomInt(1, 70);

	let profileImage = image
		? image
		: `https://i.pravatar.cc/150?img=${randomId}`;

	return (
		<div className='iconContainer'>
			{loaded ? null : <div className={`skeleton profileIcon ${iconSize}`} />}
			<img
				className={`profileIcon ${iconSize}`}
				src={profileImage}
				alt='profile'
				style={loaded ? {} : { display: "none" }}
				onLoad={() => setLoaded(true)}
				onClick={onClick}
				draggable='false'
			/>
			{storyBorder && (
				<div
					className={`storyBorder ${iconSize} ${seen ? "seen" : ""} ${
						addStory ? "hidden" : ""
					}`}
				></div>
			)}
			{profileActive && <div className='profileActive'></div>}
		</div>
	);
};

export default ProfileIcon;

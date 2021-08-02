import React from "react";
import "../../styles/story.scss";
import ProfileIcon from "../ProfileIcon";
import users from "../../data/users.js";

const Story = props => {
	let { storyBorder, seen } = props;
	console.log(storyBorder);
	if (storyBorder !== false) storyBorder = true;
	let accountName = users[Math.floor(Math.random() * users.length)].username;

	if (accountName.length > 10) {
		accountName = accountName.substring(0, 10) + "...";
	}

	return (
		<div className='story'>
			<ProfileIcon iconSize='big' storyBorder={storyBorder} seen={seen} />
			<span className={`accountName ${seen && "seen"}`}>{accountName}</span>
		</div>
	);
};

export default Story;

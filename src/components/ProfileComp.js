import React from "react";
import "../styles/profileComp.scss";
import ProfileIcon from "./ProfileIcon";
import users from "../data/users";
const ProfileComp = props => {
	const {
		username,
		caption,
		urlText,
		iconSize,
		captionSize,
		storyBorder,
		hideAccountName,
		image,
	} = props;

	let accountName = username
		? username
		: users[Math.floor(Math.random() * users.length)].username;

	return (
		<div className='profileComp'>
			<div className='pIconContainer'>
				<ProfileIcon
					iconSize={iconSize}
					storyBorder={storyBorder}
					image={image}
				/>
			</div>
			{(accountName || caption) && !hideAccountName && (
				<div className={`textContainer ${captionSize}`}>
					<span className='accountName'>{accountName}</span>
					<span className={`caption ${captionSize}`}>{caption}</span>
				</div>
			)}
			<a href='/'>{urlText}</a>
		</div>
	);
};

export default ProfileComp;

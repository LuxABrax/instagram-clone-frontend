import "../styles/profileComp.scss";
import { useHistory } from "react-router";

import ProfileIcon from "./ProfileIcon";
import users from "../data/users";

const ProfileComp = props => {
	const {
		id,
		username,
		caption,
		urlText,
		iconSize,
		captionSize,
		storyBorder,
		hideAccountName,
		image,
		followUser,
	} = props;

	const { push } = useHistory();

	let accountName = username
		? username
		: users[Math.floor(Math.random() * users.length)].username;

	return (
		<div className={`profileComp ${captionSize === "small" ? "small" : ""}`}>
			<div className='pIconContainer'>
				<ProfileIcon
					iconSize={iconSize}
					storyBorder={storyBorder}
					image={image}
				/>
			</div>
			{(accountName || caption) && !hideAccountName && (
				<div className={`textContainer ${captionSize}`}>
					<span
						className='accountName'
						onClick={() => {
							push(`/profile/${accountName}`);
						}}
					>
						{accountName}
					</span>
					<span className={`caption ${captionSize}`}>{caption}</span>
				</div>
			)}
			<p className='followLink' onClick={() => followUser(id)}>
				{urlText}
			</p>
		</div>
	);
};

export default ProfileComp;

import "../styles/profileComp.scss";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import ProfileIcon from "./ProfileIcon";
import users from "../data/users";
import { logout } from "../redux/authSlice";

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

	const dispatch = useDispatch();
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
			<p
				className='followLink'
				onClick={() => {
					if (urlText === "Switch") {
						dispatch(logout());
					} else {
						followUser(id);
					}
				}}
			>
				{urlText}
			</p>
		</div>
	);
};

export default ProfileComp;

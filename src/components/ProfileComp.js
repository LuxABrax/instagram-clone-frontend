import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { toggleModal } from "../redux/modalSlice";
import { setPopup } from "../redux/popupSlice";

import ProfileIcon from "./ProfileIcon";
import PopupTrigger from "./PopupTrigger";
import users from "../data/users";

import "../styles/profileComp.scss";

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
		onClick,
		showPopup,
		popupKey,
	} = props;

	const dispatch = useDispatch();
	const { push } = useHistory();

	let accountName = username
		? username
		: users[Math.floor(Math.random() * users.length)].username;

	function gotoProfile() {
		// Close modal if clicked in modal
		if (onClick !== undefined) dispatch(toggleModal());
		dispatch(setPopup("close"));
		push(`/profile/${username}`);
	}

	return (
		<div className={`profileComp ${captionSize === "small" ? "small" : ""}`}>
			{showPopup ? (
				<PopupTrigger
					username={username}
					uid={id}
					popupKey={popupKey + "pi"}
					hoveredEl={"icon"}
				>
					<div className='pIconContainer'>
						<ProfileIcon
							iconSize={iconSize}
							storyBorder={storyBorder}
							image={image}
							onClick={gotoProfile}
						/>
					</div>
				</PopupTrigger>
			) : (
				<div className='pIconContainer'>
					<ProfileIcon
						iconSize={iconSize}
						storyBorder={storyBorder}
						image={image}
						onClick={gotoProfile}
					/>
				</div>
			)}

			{(accountName || caption) && !hideAccountName && (
				<div className={`textContainer ${captionSize}`}>
					<span className='accountName'>
						{showPopup ? (
							<PopupTrigger
								username={username}
								uid={id}
								popupKey={popupKey + "pn"}
								hoveredEl={"name"}
							>
								<div onClick={gotoProfile}>{accountName}</div>
							</PopupTrigger>
						) : (
							<div onClick={gotoProfile}>{accountName}</div>
						)}
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

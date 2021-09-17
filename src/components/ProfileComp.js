import "../styles/profileComp.scss";
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import ProfileIcon from "./ProfileIcon";
import UserPopup from "./post/UserPopup";
import users from "../data/users";
import { logout } from "../redux/authSlice";
import { toggleModal } from "../redux/modalSlice";

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
	} = props;

	const [pointerOverTrigger, setPointerOverTrigger] = useState(false);
	const [pointerOverPopup, setPointerOverPopup] = useState(false);
	const [popupActive, setPopupActive] = useState(false);

	const dispatch = useDispatch();
	const { push } = useHistory();

	let accountName = username
		? username
		: users[Math.floor(Math.random() * users.length)].username;

	function handlePopup() {
		console.log("show popup");
		setPopupActive(true);
	}
	return (
		<div className={`profileComp ${captionSize === "small" ? "small" : ""}`}>
			{popupActive && <UserPopup fid={id} />}
			<div
				className='pIconContainer'
				onPointerOver={() => {
					if (showPopup) handlePopup();
				}}
				onPointerOut={() => {
					console.log("Pointer leave");
					setPopupActive(false);
				}}
			>
				<ProfileIcon
					iconSize={iconSize}
					storyBorder={storyBorder}
					image={image}
					onClick={onClick}
				/>
			</div>
			{(accountName || caption) && !hideAccountName && (
				<div className={`textContainer ${captionSize}`}>
					<span
						className='accountName'
						onClick={() => {
							if (onClick !== undefined) dispatch(toggleModal());
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

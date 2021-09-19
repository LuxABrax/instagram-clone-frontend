import "../styles/profileComp.scss";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import ProfileIcon from "./ProfileIcon";
import UserPopup from "./post/UserPopup";
import users from "../data/users";
import { logout } from "../redux/authSlice";
import { toggleModal } from "../redux/modalSlice";
import {
	setOverTrigger,
	setPopup,
	selectPopup,
	setPopupOffset,
	setKey,
} from "../redux/popupSlice";
import { calcPopupOffset } from "./post/popupOffset";
import { useState } from "react";

const ProfileComp = props => {
	const {
		postId,
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

	const { popupActive, overTrigger, overPopup, popKey } =
		useSelector(selectPopup);

	const [hasPopup, setHasPopup] = useState(false);

	const dispatch = useDispatch();
	const { push } = useHistory();

	let accountName = username
		? username
		: users[Math.floor(Math.random() * users.length)].username;

	function handlePopup(e, handleType, hoveredEl) {
		console.log("handle popup");
		if (handleType === "show") {
			const { offY, offX } = calcPopupOffset(e, hoveredEl);
			dispatch(setKey(postId));
			dispatch(setPopupOffset({ offY, offX }));
			dispatch(setOverTrigger(true));
			setHasPopup(true);
			dispatch(setPopup());
		} else {
			dispatch(setOverTrigger(false));
			setTimeout(() => {
				if (!overTrigger && !overPopup) setHasPopup(false);
				dispatch(setPopup());
			}, 300);
		}
	}
	function gotoProfile() {
		dispatch(setPopup("close"));
		push(`/profile/${username}`);
	}

	return (
		<div className={`profileComp ${captionSize === "small" ? "small" : ""}`}>
			{popupActive && showPopup && hasPopup && postId === popKey && (
				<UserPopup fid={id} postId={postId} />
			)}
			<div
				className='pIconContainer'
				onPointerOver={e => {
					if (showPopup) {
						handlePopup(e, "show", "icon");
					}
				}}
				onPointerOut={() => {
					if (showPopup) {
						handlePopup();
					}
				}}
			>
				<ProfileIcon
					iconSize={iconSize}
					storyBorder={storyBorder}
					image={image}
					onClick={gotoProfile}
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
						onPointerOver={e => {
							if (showPopup) {
								handlePopup(e, "show", "name");
							}
						}}
						onPointerOut={() => {
							handlePopup();
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

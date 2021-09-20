import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toggleModal } from "../redux/modalSlice";
import {
	selectPopup,
	setKey,
	setOverTrigger,
	setPopup,
	setPopupOffset,
} from "../redux/popupSlice";
import { calcPopupOffset } from "./post/popupOffset";
import UserPopup from "./post/UserPopup";
import "../styles/popupTrigger.scss";
const PopupTrigger = ({ id, uid, username, onClick, hoveredEl, children }) => {
	const { popupActive, overTrigger, overPopup, popKey } =
		useSelector(selectPopup);
	const [hasPopup, setHasPopup] = useState(false);

	const showPopup = true;
	const dispatch = useDispatch();
	const { push } = useHistory();

	function handlePopup(e, handleType, hoveredEl) {
		console.log("handle popup");
		if (handleType === "show") {
			const { offY, offX } = calcPopupOffset(e, hoveredEl);
			dispatch(setKey(id));
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
		<div
			className='popupTrigger'
			onClick={() => {
				if (onClick !== undefined) dispatch(toggleModal());
				gotoProfile();
			}}
			onPointerOver={e => {
				if (showPopup) {
					handlePopup(e, "show", hoveredEl || "name");
				}
			}}
			onPointerOut={() => {
				handlePopup();
			}}
		>
			{popupActive && showPopup && hasPopup && id === popKey && (
				<UserPopup fid={uid} postId={id} />
			)}

			{children}
		</div>
	);
};

export default PopupTrigger;

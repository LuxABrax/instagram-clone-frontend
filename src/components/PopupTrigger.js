import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const PopupTrigger = ({
	popupKey,
	uid,
	username,
	onClick,
	hoveredEl,
	children,
}) => {
	const { popupActive, overTrigger, overPopup, popKey } =
		useSelector(selectPopup);
	const [hasPopup, setHasPopup] = useState(false);

	const showPopup = true;
	const dispatch = useDispatch();

	function handlePopup(e, handleType, hoveredEl) {
		console.log("handle popup");
		if (handleType === "show") {
			const { offY, offX } = calcPopupOffset(e, hoveredEl);
			dispatch(setKey(popupKey));
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

	return (
		<div className='popupTriggerContainer'>
			{popupActive && showPopup && hasPopup && popupKey === popKey && (
				<UserPopup fid={uid} popupKey={popupKey} />
			)}
			<div
				className='popupTrigger'
				onClick={() => {
					if (onClick !== undefined) dispatch(toggleModal());
				}}
				onPointerOver={e => {
					if (showPopup) {
						console.log("trigger");
						handlePopup(e, "show", hoveredEl || "name");
					}
				}}
				onPointerOut={() => {
					handlePopup();
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default PopupTrigger;

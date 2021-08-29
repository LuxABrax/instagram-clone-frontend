import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	changeModalName,
	selectModalActive,
	toggleModal,
} from "../../redux/modalSlice";
import {
	followUserWithID,
	getNotFollowedUsers,
	selectNotFollowedUsers,
	setUnFollowUser,
	selectUserProfile,
	getUserProfile,
} from "../../redux/usersSlice";
import "../../styles/profile/followersItem.scss";

const FollowButton = ({ follower, id, btnType, inMenu, isMessage, fType }) => {
	const [followBtn, setFollowBtn] = useState({ btnType });
	const [folBtn, setFolBtn] = useState(true);

	const { _id, name, photo } = follower;
	const dispatch = useDispatch();

	const notFollowed = useSelector(selectNotFollowedUsers);
	const profile = useSelector(selectUserProfile);
	const modalActive = useSelector(selectModalActive);

	const handleButton = async () => {
		if (folBtn) {
			if (followBtn === "remove") {
				if (modalActive) {
					dispatch(
						setUnFollowUser({
							id: _id,
							name,
							photo,
							remove: true,
							followerOr: fType === "following",
						})
					);
					dispatch(changeModalName("unFollow"));
				} else {
					dispatch(toggleModal("unFollow"));
				}
			} else {
				await dispatch(followUserWithID({ userId: id, followId: _id }));
				await dispatch(getUserProfile(profile.name));
				dispatch(getNotFollowedUsers(id));
				console.log("remove");
			}
		} else {
			console.log("following");
			if (modalActive) {
				dispatch(setUnFollowUser({ id: _id, name, photo, remove: false }));
				dispatch(changeModalName("unFollow"));
				setFolBtn(true);
			} else {
				if (!isMessage) {
					dispatch(
						setUnFollowUser({
							id: profile._id,
							name: profile.name,
							photo: profile.photo,
							remove: false,
						})
					);
					dispatch(toggleModal("unFollow"));
				}
			}
		}
	};
	useEffect(() => {
		function checkIfNotFollowing(checkId) {
			if (btnType === "remove") return true;

			const el = notFollowed.filter(u => u._id === checkId);
			// console.log(el);
			return el.length > 0;
		}
		const check = checkIfNotFollowing(_id);
		if (btnType === "remove") setFollowBtn("remove");
		setFolBtn(check);
		// console.log(check);
		return () => {};
	}, [_id, btnType, notFollowed]);
	return (
		<button
			className={`flwBtn ${inMenu ? "inMenu profBtn" : ""} ${
				folBtn && !(btnType === "remove") ? "flw" : ""
			} ${isMessage && folBtn ? "isMessage" : ""}`}
			onClick={handleButton}
		>
			{followBtn === "remove" ? (
				fType !== "following" ? (
					"Remove"
				) : (
					"Following"
				)
			) : folBtn ? (
				"Follow"
			) : inMenu ? (
				!isMessage ? (
					<img src='/images/followers.png' className='' alt='followers' />
				) : (
					"Message"
				)
			) : (
				"Following"
			)}
		</button>
	);
};

export default FollowButton;

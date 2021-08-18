import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toggleModal } from "../../redux/modalSlice";
import {
	followUserWithID,
	getNotFollowedUsers,
	selectNotFollowedUsers,
} from "../../redux/usersSlice";
import "../../styles/profile/followersItem.scss";

const FollowButton = ({ follower, id, btnType, inMenu, isMessage }) => {
	const [followBtn, setFollowBtn] = useState({ btnType });
	const [folBtn, setFolBtn] = useState(true);

	const { _id } = follower;
	const dispatch = useDispatch();

	const { push } = useHistory();
	const notFollowed = useSelector(selectNotFollowedUsers);

	const handleButton = async () => {
		// console.log("follower: ", follwId, "user: ", id);
		if (folBtn) {
			if (followBtn !== "remove") {
				await dispatch(followUserWithID({ userId: id, followId: _id }));
				dispatch(getNotFollowedUsers(id));
			} else {
				console.log("remove");
				dispatch(toggleModal("unFollow"));
			}
		} else {
			console.log("following");
			dispatch(toggleModal("unFollow"));
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
				"Remove"
			) : folBtn ? (
				"Follow"
			) : inMenu ? (
				!isMessage ? (
					<img src='/images/followers.png' className='' />
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

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toggleModal } from "../../redux/modalSlice";
import {
	followUserWithID,
	getNotFollowedUsers,
	selectNotFollowedUsers,
} from "../../redux/usersSlice";
import ProfileComp from "../ProfileComp";
import "../../styles/profile/followersItem.scss";

const FollowersItem = ({ follower, id, btnType }) => {
	const [followBtn, setFollowBtn] = useState({ btnType });
	const [folBtn, setFolBtn] = useState(true);

	const { _id, name, fullName, photo } = follower;
	const dispatch = useDispatch();

	const { push } = useHistory();
	const notFollowed = useSelector(selectNotFollowedUsers);

	const handleButton = async () => {
		// console.log("follower: ", _id, "user: ", id);
		if (folBtn) {
			if (followBtn !== "remove") {
				await dispatch(followUserWithID({ userId: id, followId: _id }));
				dispatch(getNotFollowedUsers(id));
			} else {
				console.log("remove");
			}
		} else {
			console.log("following");
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
		<li
			style={{
				padding: "2px 16px",
				height: 50 + "px",
				position: "relative",
			}}
		>
			<ProfileComp
				key={_id}
				id={_id}
				username={name}
				image={`http://localhost:5000/uploads/${photo}`}
				caption={fullName}
				iconSize='medium'
				captionSize='small'
				storyBorder={false}
				onClick={() => {
					dispatch(toggleModal());
					push(`/profile/${name}`);
				}}
			/>
			{followBtn !== "" && (
				<button
					className={`flwBtn ${folBtn && !(btnType === "remove") ? "flw" : ""}`}
					onClick={handleButton}
				>
					{followBtn === "remove" ? "Remove" : folBtn ? "Follow" : "Following"}
				</button>
			)}
		</li>
	);
};

export default FollowersItem;

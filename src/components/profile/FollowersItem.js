import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toggleModal } from "../../redux/modalSlice";
import { selectUser } from "../../redux/authSlice";

import ProfileComp from "../ProfileComp";
import FollowButton from "./FollowButton";

import "../../styles/profile/followersItem.scss";

const FollowersItem = ({ follower, id, btnType, fType }) => {
	const { _id, name, fullName, photo } = follower;

	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const { push } = useHistory();

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
			{_id !== user._id && (
				<FollowButton
					follower={follower}
					id={id}
					btnType={btnType}
					fType={fType}
				/>
			)}
		</li>
	);
};

export default FollowersItem;

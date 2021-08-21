import "../../styles/profile/profMenu.scss";
import { ReactComponent as ArrDown } from "../../icons/arrDown.svg";
import { useParams } from "react-router";
import { selectUserProfile } from "../../redux/usersSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectUser } from "../../redux/authSlice";
import FollowButton from "./FollowButton";

const ProfileMenu = ({ id }) => {
	const [sameUser, setSameUser] = useState(false);
	const [arrowUp, setArrowUp] = useState(false);
	let { pName } = useParams();
	const user = useSelector(selectUser);
	const selectedUser = useSelector(selectUserProfile);
	const { _id, name } = selectedUser;

	useEffect(() => {
		if (user.name === name) {
			setSameUser(true);
		} else {
			setSameUser(false);
		}
	}, [name, user.name, setSameUser]);

	const changeArrow = () => {
		setArrowUp(!arrowUp);
	};

	const handleEdit = () => {
		console.log("handle Edit");
	};
	const handleAddPost = () => {
		console.log("handle Add post");
	};
	return (
		<div className='profileMenu'>
			{sameUser ? (
				<>
					<button className='profBtn flwBtn inMenu flw' onClick={handleAddPost}>
						Add Post
					</button>
					<button className='profBtn flwBtn inMenu' onClick={handleEdit}>
						Edit
					</button>
				</>
			) : (
				<>
					<FollowButton
						follower={selectedUser}
						inMenu={true}
						isMessage={true}
					/>
					{selectedUser !== {} && (
						<FollowButton follower={selectedUser} id={user._id} inMenu={true} />
					)}
					<button className='profBtn flwBtn inMenu arr' onClick={changeArrow}>
						<ArrDown className={`arr ${arrowUp ? "up" : "down"}`} />
					</button>
				</>
			)}
		</div>
	);
};

export default ProfileMenu;

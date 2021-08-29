import "../../styles/profile/profMenu.scss";
import { ReactComponent as ArrDown } from "../../icons/arrDown.svg";
import { selectUserProfile } from "../../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout, selectUser } from "../../redux/authSlice";
import FollowButton from "./FollowButton";
import { toggleModal } from "../../redux/modalSlice";

const ProfileMenu = ({ id }) => {
	const [sameUser, setSameUser] = useState(false);
	const [arrowUp, setArrowUp] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const selectedUser = useSelector(selectUserProfile);
	const { name } = selectedUser;

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
	const handleLogout = () => {
		dispatch(logout());
	};
	const handleAddPost = () => {
		console.log("handle Add post");
		dispatch(toggleModal("addPost"));
	};
	return (
		<div className='profileMenu'>
			{sameUser ? (
				<>
					<button className='profBtn flwBtn inMenu flw' onClick={handleAddPost}>
						Add Post
					</button>
					<button className='profBtn flwBtn inMenu' onClick={handleEdit}>
						Edit Profile
					</button>
					<button className='profBtn flwBtn inMenu' onClick={handleLogout}>
						Log Out
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

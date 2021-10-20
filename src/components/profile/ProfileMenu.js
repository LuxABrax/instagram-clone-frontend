import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectUserProfile } from "../../redux/usersSlice";
import { useHistory } from "react-router";
import { selectUser } from "../../redux/authSlice";
import { changeProfileSuggestions, toggleModal } from "../../redux/modalSlice";

import FollowButton from "./FollowButton";
import { ReactComponent as ArrDown } from "../../icons/arrDown.svg";

import "../../styles/profile/profMenu.scss";

const ProfileMenu = ({ id, isFollowing, setIsFollowing }) => {
	const [sameUser, setSameUser] = useState(false);
	const [arrowUp, setArrowUp] = useState(false);

	const { push } = useHistory();
	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const selectedUser = useSelector(selectUserProfile);
	const { name } = selectedUser;

	useEffect(() => {
		dispatch(changeProfileSuggestions(false));
		setArrowUp(true);
		if (user.name === name) {
			setSameUser(true);
		} else {
			setSameUser(false);
		}
	}, [dispatch, name, user.name, setSameUser]);

	const changeArrow = () => {
		if (arrowUp) console.log("arrowUp");
		dispatch(changeProfileSuggestions(arrowUp));
		setArrowUp(!arrowUp);
	};

	const handleEdit = () => {
		push("/accounts/edit");
	};
	const handleAddPost = () => {
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
				</>
			) : (
				<>
					{isFollowing && (
						<FollowButton
							follower={selectedUser}
							inMenu={true}
							isMessage={true}
						/>
					)}
					{selectedUser !== {} && (
						<FollowButton
							follower={selectedUser}
							id={user._id}
							inMenu={true}
							setIsFollowing={setIsFollowing}
						/>
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

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { selectLikes } from "../../redux/postsSlice";
import {
	selectFollowedUsers,
	selectNotFollowedUsers,
} from "../../redux/usersSlice";
import { toggleModal } from "../../redux/modalSlice";

import Modal from "../profile/modals/Modal";
import FollowersItem from "../profile/FollowersItem";
import { ReactComponent as Close } from "../../icons/close.svg";

import "../../styles/profile/modals/followersModal.scss";

const LikedModal = () => {
	const [likedUsers, setLikedUsers] = useState([]);

	const user = useSelector(selectUser);
	const likes = useSelector(selectLikes);
	const followers = useSelector(selectFollowedUsers);
	const notFollowed = useSelector(selectNotFollowedUsers);

	const dispatch = useDispatch();

	function closeModal() {
		dispatch(toggleModal());
	}

	useEffect(() => {
		if (likedUsers.length === 0) {
			const users = [user, ...followers, ...notFollowed];
			const arr = users.filter(u => likes.includes(u._id));
			setLikedUsers([...arr]);
		}
	}, [likedUsers, followers, notFollowed, likes, user]);

	return (
		<Modal>
			<div className='modalContent followers-modal'>
				<div className='modalTitle'>
					<div className='space'></div>
					<h3>Likes</h3>
					<Close className='icon' onClick={closeModal} />
				</div>
				<ul style={{ overflowY: "scroll", height: 358 + "px" }}>
					{likedUsers.map((el, idx) => {
						return (
							<FollowersItem
								key={idx}
								follower={el}
								id={user._id}
								btnType={""}
								fType={"following"}
							/>
						);
					})}
				</ul>
			</div>
		</Modal>
	);
};

export default LikedModal;

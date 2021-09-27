import "../../../styles/profile/unFollowModal.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../redux/modalSlice";
import {
	addToNoFollow,
	getNotFollowedUsers,
	getUserProfile,
	selectUnFollowUser,
} from "../../../redux/usersSlice";
import axios from "../../../axios";

import Modal from "./Modal";

const UnFollowModal = ({ uid, id, photo, name }) => {
	const dispatch = useDispatch();
	const unFollowUser = useSelector(selectUnFollowUser);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	}, []);

	function closeModal() {
		dispatch(toggleModal());
	}
	async function unFollow() {
		// console.log(uid, unFollowUser.id);
		let ff = "unf";
		if (unFollowUser.remove) {
			if (unFollowUser.followerOr) {
				ff = "unf";
			} else {
				ff = "rf";
			}
		} else {
			ff = "unf";
		}

		const res = await axios.put(`/follow/${ff}/${uid}/${unFollowUser.id}`);
		const data = await res.data;
		// console.log(data);
		if (data.success) {
			await dispatch(getUserProfile(name));
			await dispatch(addToNoFollow({ _id: id, name, photo }));
			await dispatch(getNotFollowedUsers(uid));
			dispatch(toggleModal());
		}
	}

	return (
		<Modal>
			<div className='modalContent unFollow-modal'>
				<div className='avatarContainer'>
					<img
						src={`http://localhost:5000/uploads/${unFollowUser.photo}`}
						alt={unFollowUser.name}
						className='unfAvatar'
					/>
				</div>
				<div className='textContainer'>
					{unFollowUser.remove && !unFollowUser.followerOr && (
						<h2 className='modalTitle'>Remove Follower?</h2>
					)}
					<h3
						className={`modalText ${unFollowUser.remove && !unFollowUser.followerOr ? "rem" : ""}`}
					>
						{unFollowUser.remove && !unFollowUser.followerOr
							? `Instagram wont tell ${unFollowUser.name} they were removed from your followers`
							: `If you change your mind, you'll have to request to follow @${unFollowUser.name} again.`}
					</h3>
				</div>
				<div className='modalBtns'>
					<button onClick={unFollow}>
						{unFollowUser.remove && !unFollowUser.followerOr ? "Remove" : "Unfollow"}
					</button>
					<button onClick={closeModal}>Cancel</button>
				</div>
			</div>
		</Modal>
	);
};

export default UnFollowModal;

import "../../../styles/profile/unFollowModal.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, changeModalName } from "../../../redux/modalSlice";
import axios from "../../../axios";
import Modal from "./Modal";
import {
	addToNoFollow,
	getNotFollowedUsers,
	getUserProfile,
	selectUnFollowUser,
} from "../../../redux/usersSlice";

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
		console.log(uid, unFollowUser.id);
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
		// if (unFollowUser.remove && !unFollowUser.followerOr) ff = "rfg";
		const res = await axios.put(`/follow/${ff}/${uid}/${unFollowUser.id}`);
		const data = await res.data;
		console.log(data);
		if (data.success) {
			console.log(data.success);
			await dispatch(getUserProfile(name));
			await dispatch(addToNoFollow({ _id: id, name, photo }));
			await dispatch(getNotFollowedUsers(uid));
			dispatch(toggleModal());
		}
	}

	return (
		<Modal>
			<div className='modalContainer'>
				<div className='avatarContainer'>
					<img
						src={`http://localhost:5000/uploads/${unFollowUser.photo}`}
						className='unfAvatar'
					/>
				</div>
				<div className='textContainer'>
					<h2>
						If you change your mind, you'll have to request to follow @
						{unFollowUser.name} again.
					</h2>
				</div>
				<div className='modalBtns'>
					<button onClick={unFollow}>Unfollow</button>
					<button onClick={closeModal}>Cancel</button>
				</div>
			</div>
		</Modal>
	);
};

export default UnFollowModal;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectFollowedUsers,
	selectFollowingUsers,
	selectNotFollowedUsers,
} from "../../../redux/usersSlice";

import Modal from "./Modal";
import FollowersItem from "../FollowersItem";
import { ReactComponent as Close } from "../../../icons/close.svg";

import "../../../styles/profile/modals/followersModal.scss";
import { toggleModal } from "../../../redux/modalSlice";

const FollowersModal = ({ id, type, uId, btnType }) => {
	const [fws, setFws] = useState([]);
	const followers = useSelector(selectFollowedUsers);
	const following = useSelector(selectFollowingUsers);
	const notFollowed = useSelector(selectNotFollowedUsers);

	const dispatch = useDispatch();

	function closeModal() {
		dispatch(toggleModal());
	}

	useEffect(() => {
		if (type === "following" && followers.length > 0 && fws.length === 0) {
			setFws([...followers]);
			// console.log("fws:", fws);
		} else if (type === "followers" && following.length > 0 && fws.length === 0) {
			// console.log(following);
			setFws([...following]);
		}
	}, [type, followers, fws, following, notFollowed, btnType]);
	return (
		<Modal>
			<div className='modalContent followers-modal'>
				<div className='modalTitle'>
					<div className='space'></div>
					<h3>{type === "followers" ? "Followers" : "Following"}</h3>
					<Close className='icon' onClick={closeModal} />
				</div>
				<ul style={{ overflowY: "scroll", height: 358 + "px" }}>
					{fws.map((el, idx) => {
						return <FollowersItem key={idx} follower={el} id={id} btnType={btnType} fType={type} />;
					})}
				</ul>
			</div>
		</Modal>
	);
};

export default FollowersModal;

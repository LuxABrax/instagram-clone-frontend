import "../../../styles/profile/changeImg.scss";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/modalSlice";
import axios from "../../../axios";
import Modal from "./Modal";
import ProfileIcon from "../../ProfileIcon";

const UnFollowModal = ({ id, photo, name }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	}, []);

	function closeModal() {
		dispatch(toggleModal());
	}
	function unFollow(params) {}
	function choosePhoto() {
		document.getElementById("photoFile").click();
	}

	return (
		<Modal>
			<div className='modalTitle'>
				<h3>Unfoollow</h3>
				<ProfileIcon
					image={`https://localhost:5000/imges/${photo}`}
					iconSize='xBig'
				/>
			</div>
			<div className='modalBtns'>
				<button onClick={unFollow}>Unfollow</button>
				<button onClick={closeModal}>Cancel</button>
			</div>
		</Modal>
	);
};

export default UnFollowModal;

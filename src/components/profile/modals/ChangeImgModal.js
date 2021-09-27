import "../../../styles/profile/changeImg.scss";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/modalSlice";
import axios from "../../../axios";
import { changePhoto } from "../../../redux/authSlice";
import Modal from "./Modal";

const ChangeImgModal = ({ id }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	}, []);

	function closeModal() {
		dispatch(toggleModal());
	}
	function choosePhoto() {
		document.getElementById("photoFile").click();
	}
	async function uploadPhoto() {
		const formData = new FormData();
		const image = document.getElementById("photoFile").files[0];
		formData.append("file", image);

		const res = await axios.put(`/users/${id}/photo`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		if (res.data.success) {
			dispatch(changePhoto(res.data.data));
			dispatch(toggleModal());
		}
	}
	async function removePhoto() {
		const res = await axios.put(`/users/${id}`, { photo: "no-photo.jpg" });
		if (res.data.success) {
			dispatch(changePhoto("no-photo.jpg"));
			dispatch(toggleModal());
		}
	}

	return (
		<Modal>
			<div className='modalContent changeImg-modal'>
				<div className='modalTitle'>
					<h3>Change Profile Photo</h3>
				</div>
				<input id='photoFile' type='file' style={{ display: "none" }} onChange={uploadPhoto} />
				<div className='modalBtns'>
					<button onClick={choosePhoto}>Upload Photo</button>
					<button onClick={removePhoto}>Remove Current Photo</button>
					<button onClick={closeModal}>Cancel</button>
				</div>
			</div>
		</Modal>
	);
};

export default ChangeImgModal;

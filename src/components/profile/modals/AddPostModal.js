import "../../../styles/profile/addPostModal.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/modalSlice";

import Modal from "./Modal";
import DescriptionInput from "./DescriptionInput";
import axios from "../../../axios";

const AddPostModal = ({ id, addImage }) => {
	const [image, setImage] = useState(undefined);
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

	function showPhoto() {
		const image = document.getElementById("photoFile").files[0];
		const url = URL.createObjectURL(image);

		setImage(url);
	}

	async function postPhoto() {
		const image = document.getElementById("photoFile").files[0];
		const desc = document.getElementById("description").value;

		const formData = new FormData();
		formData.append("file", image);
		formData.append("description", desc);

		const res = await axios.post(`/posts/post/${id}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		const data = await res.data;

		if (data.success) {
			addImage(data.data);
			dispatch(toggleModal());
		}
	}

	return (
		<Modal>
			<div className='modalCont .row'>
				{image !== undefined && <img src={image} />}
				<input
					id='photoFile'
					type='file'
					style={{ display: "none" }}
					onChange={showPhoto}
				/>
				<div className='modalBody'>
					<div className='modalTitle'>
						<h3>Add Photo Post</h3>
					</div>

					<div className='modalBtns'>
						<div className='photoBtns'>
							<button className='choose' onClick={choosePhoto}>
								Choose Photo
							</button>
							<button
								className={`postBtn ${image !== undefined ? "" : "hide"}`}
								onClick={postPhoto}
							>
								Post Photo
							</button>
						</div>

						<DescriptionInput />

						<button onClick={closeModal}>Cancel</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default AddPostModal;

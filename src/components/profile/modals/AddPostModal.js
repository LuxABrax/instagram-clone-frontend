import "../../../styles/profile/addPostModal.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/modalSlice";

import Modal from "./Modal";
import DescriptionInput from "./DescriptionInput";
import SwipeableViews from "react-swipeable-views";
import axios from "../../../axios";
import AddPostControls from "../AddPostControls";

const AddPostModal = ({ id, addImage }) => {
	const [images, setImages] = useState([]);
	const [imgPosition, setImgPosition] = useState(0);

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

	function addPhotos() {
		const imageFiles = document.getElementById("photoFile").files;

		const filesArr = Array.prototype.slice.call(imageFiles);

		filesArr.forEach(f => {
			if (!f.type.match("image.*")) {
				return;
			}

			const url = URL.createObjectURL(f);

			setImages(s => [...s, { url: url, file: f }]);
		});

		console.log(images);
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

	const handleChangeImgPosition = index => {
		setImgPosition(index);
	};

	return (
		<Modal>
			<div className='modalContent addPost-modal'>
				{images.length > 0 && (
					<div className='images-container'>
						<SwipeableViews
							index={imgPosition}
							onChangeIndex={handleChangeImgPosition}
							enableMouseEvents
						>
							{images.map((img, idx) => (
								<img
									src={img.url}
									alt={img.file.name}
									className={`addImage-image ${
										idx === imgPosition ? "act" : ""
									}`}
								/>
							))}
						</SwipeableViews>

						<AddPostControls
							images={images}
							setImages={setImages}
							imgPosition={imgPosition}
							setImgPosition={setImgPosition}
						/>
					</div>
				)}
				<input
					id='photoFile'
					type='file'
					style={{ display: "none" }}
					onChange={addPhotos}
					accept='image/*'
					multiple
				/>
				<div className='modalBody'>
					<div className='modalTitle'>
						<h3>Add Photo Post</h3>
					</div>

					<div className='modalBtns'>
						<div className='photoBtns'>
							<button className='choose' onClick={choosePhoto}>
								{images.length > 0 ? "Add Photo" : "Chose Photo"}
							</button>

							<button
								className={`postBtn ${images.length > 0 ? "" : "hide"}`}
								onClick={postPhoto}
							>
								Post Photo
							</button>
						</div>

						<DescriptionInput />

						<button className='cancelBtn' onClick={closeModal}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default AddPostModal;

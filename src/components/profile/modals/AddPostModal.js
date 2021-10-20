import "../../../styles/profile/addPostModal.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/modalSlice";

import Modal from "./Modal";
import DescriptionInput from "./DescriptionInput";
import SwipeableViews from "react-swipeable-views";
import { ReactComponent as Close } from "../../../icons/close.svg";
import axios from "../../../axios";

const AddPostModal = ({ id, addImage }) => {
	const [image, setImage] = useState(undefined);
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

	function showPhoto() {
		const image = document.getElementById("photoFile").files[0];
		const imageFiles = document.getElementById("photoFile").files;
		console.log(imageFiles);
		const url = URL.createObjectURL(image);

		setImages(i => [...i, url]);
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

	const handleRemove = () => {
		setImages(i => i.filter((im, index) => index !== imgPosition));
		setImgPosition(imgPosition === 0 ? 0 : imgPosition - 1);
	};

	const handleChangeImgPosition = index => {
		setImgPosition(index);
	};

	const handleMove = direction => {
		if (direction) {
			setImages(i => [
				...i.slice(0, imgPosition - 1),
				i[imgPosition],
				i[imgPosition - 1],
				...i.slice(imgPosition + 1),
			]);
			setImgPosition(imgPosition - 1);
		} else {
			setImages(i => [
				...i.slice(0, imgPosition),
				i[imgPosition + 1],
				i[imgPosition],
				...i.slice(imgPosition + 2),
			]);
			setImgPosition(imgPosition + 1);
		}
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
									src={img}
									className={`addImage-image ${
										idx === imgPosition ? "act" : ""
									}`}
								/>
							))}
						</SwipeableViews>

						<div className='images-controls'>
							<button className='remove-image' onClick={handleRemove}>
								<Close className='close' />
							</button>
							<button
								className={`arrows left-arrow ${
									imgPosition === 0 ? "hide" : ""
								}`}
								onClick={() => {
									setImgPosition(p => p - 1);
								}}
							/>
							<button
								className={`arrows right-arrow ${
									imgPosition === images.length - 1 ? "hide" : ""
								}`}
								onClick={() => {
									setImgPosition(p => p + 1);
								}}
							/>
							{images.length > 1 && (
								<div className='position-controls'>
									<button
										className={`arrows left-arrow ${
											imgPosition === 0 ? "hide" : ""
										}`}
										onClick={() => {
											handleMove(true);
										}}
									/>

									<div className='positions'>
										{images.map((i, idx) => (
											<div
												className={`dot ${idx === imgPosition ? "act" : ""}`}
												onClick={() => setImgPosition(idx)}
											/>
										))}
									</div>
									<button
										className={`arrows right-arrow ${
											imgPosition === images.length - 1 ? "hide" : ""
										}`}
										onClick={() => {
											handleMove(false);
										}}
									/>
								</div>
							)}
						</div>
					</div>
				)}
				<input
					id='photoFile'
					type='file'
					multiple
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
								Add Photo
							</button>
							<button
								className={`choose ${image !== undefined ? "" : "hide"}`}
								onClick={choosePhoto}
							>
								Add More
							</button>
							<button
								className={`postBtn ${image !== undefined ? "" : "hide"}`}
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

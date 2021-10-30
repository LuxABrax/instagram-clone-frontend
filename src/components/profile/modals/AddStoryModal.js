import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../redux/modalSlice";
import axios from "../../../axios";

import Modal from "./Modal";

import "../../../styles/profile/addStoryModal.scss";

const AddStoryModal = ({ id }) => {
	const { photoUrl, photoFile } = useSelector(state => state.modal);

	const dispatch = useDispatch();

	async function postStory() {
		const formData = new FormData();

		formData.append("files", photoFile);

		const res = await axios.post(`/stories/story/${id}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		const data = await res.data;
		if (data.success) {
			console.log("story success");
			dispatch(toggleModal());
		} else {
			console.log(data.message);
		}
	}

	return (
		<Modal>
			<div className='modalContent addStoryModal'>
				<div className='image-container'>
					<img src={photoUrl} alt={photoFile.name} />
				</div>
				<button
					className='post-btn'
					onClick={postStory}
					disabled={photoFile.size > 2000000}
				>
					Post
				</button>
				{photoFile.size > 2000000 && (
					<p className='too-big'>File should be smaller than 2MB</p>
				)}
			</div>
		</Modal>
	);
};

export default AddStoryModal;

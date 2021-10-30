import { useDispatch } from "react-redux";
import { setPhotoUrl, toggleModal } from "../../redux/modalSlice";

import Story from "./Story";

const AddStory = ({ accountName, photo, addStory }) => {
	const dispatch = useDispatch();

	function choosePhoto() {
		document.getElementById("storyFile").click();
	}
	const addPhotos = () => {
		const f = document.getElementById("storyFile").files[0];
		if (f === undefined) return;
		if (!f.type.match("image.*")) {
			return;
		}
		const url = URL.createObjectURL(f);

		dispatch(setPhotoUrl({ url, file: f }));
		dispatch(toggleModal("addStory"));
	};
	return (
		<>
			<Story
				accountName={accountName}
				photo={photo}
				addStory={addStory}
				addStoryClick={choosePhoto}
			/>

			<input
				id='storyFile'
				type='file'
				style={{ display: "none" }}
				onChange={addPhotos}
				accept='image/*'
			/>
		</>
	);
};

export default AddStory;

import { useHistory } from "react-router";

import ProfileIcon from "../ProfileIcon";

import "../../styles/feed/story.scss";
import { setActiveIdx, setActiveStory } from "../../redux/storiesSlice";
import { useDispatch } from "react-redux";

const Story = props => {
	let { story, storyBorder, seen, accountName, photo, addStory } = props;

	if (storyBorder !== false) storyBorder = true;

	if (accountName.length > 10) {
		accountName = accountName.substring(0, 10) + "...";
	}
	const dispatch = useDispatch();
	const { push } = useHistory();

	const gotoStory = async () => {
		if (addStory) return;
		const { userIdx, storyIdx } = story.indexes;
		dispatch(setActiveIdx({ storyIdx: storyIdx, userIdx: userIdx }));
		const sId = story.stories[story.indexes.storyIdx].id;
		console.log(story, userIdx, storyIdx, seen);
		await dispatch(setActiveStory({ story, userIdx, storyIdx, seen }));
		push(`/stories/${accountName}/${sId}`);
	};
	return (
		<div className='story' onClick={gotoStory}>
			<ProfileIcon
				image={`http://localhost:5000/uploads/${photo}`}
				iconSize='big'
				storyBorder={storyBorder}
				seen={seen}
				addStory={addStory}
			/>
			<span className={`accountName ${seen ? "seen" : ""}`}>
				{addStory ? "Add Story" : accountName}
			</span>
			{addStory && <div className='plus'>+</div>}
		</div>
	);
};

export default Story;

import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setActiveIdx, setActiveStory } from "../../redux/storiesSlice";

import ProfileIcon from "../ProfileIcon";

import "../../styles/feed/story.scss";

const Story = ({
	story,
	storyBorder,
	seen,
	accountName,
	photo,
	addStory,
	onStoryCard,
	iconSize,
	addStoryClick,
}) => {
	const dispatch = useDispatch();
	const { push } = useHistory();

	if (storyBorder !== false) storyBorder = true;

	if (accountName.length > 10) {
		accountName = accountName.substring(0, 10) + "...";
	}

	const gotoStory = () => {
		if (addStory) addStoryClick();
		if (addStory || onStoryCard) return;
		const { userIdx, storyIdx } = story.indexes;
		dispatch(setActiveIdx({ storyIdx: storyIdx, userIdx: userIdx }));
		const sId = story.stories[story.indexes.storyIdx].id;

		dispatch(setActiveStory({ story, userIdx, storyIdx, seen }));
		push(`/stories/${accountName}/${sId}`);
	};
	return (
		<div className='story' onClick={gotoStory}>
			<ProfileIcon
				image={`http://localhost:5000/uploads/${photo}`}
				iconSize={`${iconSize !== undefined ? iconSize : "big"}`}
				storyBorder={storyBorder}
				seen={seen}
				addStory={addStory}
			/>
			<span
				className={`accountName ${seen ? "seen" : ""} ${
					onStoryCard ? " sCard" : ""
				}`}
			>
				{addStory ? "Add Story" : accountName}
			</span>
			{addStory && <div className='plus'>+</div>}
		</div>
	);
};

export default Story;

import { useHistory } from "react-router";

import ProfileIcon from "../ProfileIcon";

import "../../styles/feed/story.scss";
import { setActiveStory } from "../../redux/storiesSlice";
import { useDispatch } from "react-redux";

const Story = props => {
	let { story, storyBorder, seen, accountName, photo } = props;

	if (storyBorder !== false) storyBorder = true;

	if (accountName.length > 10) {
		accountName = accountName.substring(0, 10) + "...";
	}
	const dispatch = useDispatch();
	const { push } = useHistory();

	const gotoStory = async () => {
		const { userIdx, storyIdx } = story.indexes;
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
			/>
			<span className={`accountName ${seen && "seen"}`}>{accountName}</span>
		</div>
	);
};

export default Story;

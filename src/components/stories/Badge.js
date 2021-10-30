import useWindowDimensions from "../../utils/windowHook";

import Story from "../feed/Story";
import TimePassed from "../post/TimePassed";

import "../../styles/stories/badge.scss";

const Badge = ({ story, username }) => {
	const { width } = useWindowDimensions();

	return (
		<div className='story-badge'>
			<Story
				seen={!story.user.hasUnseen}
				photo={story.user.photo}
				accountName={username}
				onStoryCard={true}
				iconSize={width < 768 ? "medium" : "big"}
			/>
			<TimePassed createdAt={story.user.lastStory} isStory />
		</div>
	);
};

export default Badge;

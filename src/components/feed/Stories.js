import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { selectStories } from "../../redux/storiesSlice";
import useFilterStories from "./useFilterStories";

import AddStory from "./AddStory";
import Story from "./Story";

import "../../styles/feed/stories.scss";

const Stories = () => {
	const stories = useSelector(selectStories);
	const user = useSelector(selectUser);

	const [filteredStories, setStories] = useFilterStories();

	useEffect(() => {
		if (stories.length > 0) setStories(stories);
	}, [stories, setStories]);

	return (
		<div className='stories'>
			<div className='scroll'>
				<AddStory accountName={user.name} photo={user.photo} addStory />
				{filteredStories.map(s => (
					<Story
						story={s}
						accountName={s.user.name}
						photo={s.user.photo}
						seen={!s.user.hasUnseen}
					/>
				))}
			</div>
		</div>
	);
};

export default Stories;

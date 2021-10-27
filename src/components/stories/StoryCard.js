import { useEffect } from "react";
import { useState } from "react";
import useWindowDimensions from "../../utils/windowHook";

import "../../styles/stories/storyCard.scss";
import { useSelector } from "react-redux";
import { selectStories } from "../../redux/storiesSlice";
import { useHistory, useParams } from "react-router";

const StoryCard = ({ idx, story, username, active, onlyUnseen }) => {
	const { width } = useWindowDimensions();
	const [cHeight, setCHeight] = useState(0);
	const [cWidth, setCWidth] = useState(0);

	useEffect(() => {
		if (width > 650) {
			let height = width / (16 / 9);
			setCHeight(height);
			setCWidth(height / (16 / 9));
		} else {
			let height = width / 1.6;
			setCHeight(height);
			setCWidth(height / (16 / 9));
		}
	}, [width]);

	const stories = useSelector(selectStories);

	const { push } = useHistory();
	const { storyId } = useParams();

	const getStoryIdx = () => {
		let index = undefined;
		story.stories.forEach((s, idx) => {
			if (s.id === storyId) index = idx;
		});
		return index;
	};

	const handlePrev = () => {
		if (getStoryIdx() === 0) {
			const nextStory = stories[idx - 1];
			const nextUser = nextStory.user.name;
			const nextId = nextStory.stories[nextStory.indexes.storyIdx].id;
			push(`/stories/${nextUser}/${nextId}`);
		} else {
			const currentIdx = getStoryIdx();
			const nextId = story.stories[currentIdx - 1].id;
			push(`/stories/${username}/${nextId}`);
		}
	};
	const handleNext = () => {
		if (idx + 1 === stories.length) {
			// If last user
			push("/");
			return;
		}

		if (getStoryIdx() === story.stories.length - 1) {
			// If last story by user
			const nextStory = stories[idx + 1];

			if (nextStory.user.hasUnseen === false && onlyUnseen) {
				push("/");
				return;
			}

			const nextUser = nextStory.user.name;
			const nextId = nextStory.stories[nextStory.indexes.storyIdx].id;
			push(`/stories/${nextUser}/${nextId}`);
		} else {
			console.log("else");
			const currentIdx = getStoryIdx();

			const nextId = story.stories[currentIdx + 1].id;
			push(`/stories/${username}/${nextId}`);
		}
	};

	return (
		<div
			className={`story-card ${active ? "" : "small"}`}
			style={{ height: cHeight, width: cWidth }}
		>
			<div className='story-content'>
				StoryCard {username} {active ? "active" : ""} {getStoryIdx()}
			</div>
			{!(idx === 0 && getStoryIdx() === 0) && active && (
				<button onClick={handlePrev} className='sArrow left' />
			)}
			{active && <button onClick={handleNext} className='sArrow right' />}
		</div>
	);
};

export default StoryCard;

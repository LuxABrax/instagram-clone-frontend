import { useEffect } from "react";
import { useState } from "react";
import useWindowDimensions from "../../utils/windowHook";

import "../../styles/stories/storyCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectStories, setActiveIdx } from "../../redux/storiesSlice";
import { useHistory, useParams } from "react-router";

const StoryCard = ({ idx, story, username, active, onlyUnseen }) => {
	const { width, height } = useWindowDimensions();
	const [cHeight, setCHeight] = useState(0);
	const [cWidth, setCWidth] = useState(0);
	const [cardOffset, setCardOffset] = useState(0);

	const { activeIdx } = useSelector(state => state.stories);
	const dispatch = useDispatch();
	useEffect(() => {
		let tempWidth, tempHeight;
		let ratio = 16 / 9;

		if (width <= 588) {
			tempWidth = width / 3;
		} else if (width <= 768) {
			tempWidth = width / 2.8;
		} else if (width < 1024) {
			tempWidth = width / 3.2;
		} else {
			tempWidth = width / 4;
		}
		tempHeight = tempWidth * ratio;

		if (active) {
			setCWidth(tempWidth);
			setCHeight(tempHeight);
		} else {
			setCWidth(tempWidth * 0.4);
			setCHeight(tempHeight * 0.4);
		}
	}, [width, height, active]);

	useEffect(() => {
		if (active) {
			setCardOffset(width / 2 - cWidth / 2 - 46);
			return;
		}
		const diff = activeIdx.userIdx - idx;
		let tenthWidth = width / 10;
		let sixthW = width / 6;
		let offset = width / 4 - cWidth / 2 - 20;
		if (diff === 1) {
			// setCardOffset(tenthWidth * 2 - cWidth / 3);
			setCardOffset(2 * sixthW - cWidth - 46);
			// } else if (diff === 0) {
			// 	setCardOffset("-80");
		} else if (diff === 2) {
			// setCardOffset(tenthWidth - cWidth);
			setCardOffset(sixthW - cWidth - 46);
		} else if (diff === -1) {
			setCardOffset(width - 3 * tenthWidth - cWidth / 3);
		} else if (diff === -2) {
			setCardOffset(width - tenthWidth - cWidth + 23);
		} else if (diff <= -3) {
			setCardOffset(2000);
		} else {
			setCardOffset(-300);
		}
	}, [width, cWidth, active, activeIdx, idx]);
	const stories = useSelector(selectStories);

	const { push } = useHistory();
	const { storyId } = useParams();

	const getStoryIdx = () => {
		let index = undefined;
		story.stories.forEach((s, idx) => {
			if (s.id === storyId) index = idx;
		});
		if (index !== undefined) {
			return index;
		}
	};
	const handleContentClick = () => {
		if (active) return;
		const clickedIdx = stories[idx].indexes.storyIdx;
		const clickedId = stories[idx].stories[clickedIdx].id;

		dispatch(setActiveIdx({ userIdx: idx, storyIdx: clickedIdx }));
		push(`/stories/${username}/${clickedId}`);
	};
	const handlePrev = () => {
		if (getStoryIdx() === 0) {
			const nextStory = stories[idx - 1];
			const nextStoryIdx = nextStory.indexes.storyIdx;
			const nextUser = nextStory.user.name;
			const nextId = nextStory.stories[nextStoryIdx].id;
			dispatch(setActiveIdx({ userIdx: idx - 1, storyIdx: nextStoryIdx }));

			push(`/stories/${nextUser}/${nextId}`);
		} else {
			const currentIdx = getStoryIdx();
			const nextId = story.stories[currentIdx - 1].id;
			dispatch(setActiveIdx({ userIdx: idx, storyIdx: currentIdx - 1 }));

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
			// If last story of the user
			const nextStory = stories[idx + 1];

			if (nextStory.user.hasUnseen === false && onlyUnseen) {
				push("/");
				return;
			}

			const nextStoryIdx = nextStory.indexes.storyIdx;
			dispatch(setActiveIdx({ userIdx: idx + 1, storyIdx: nextStoryIdx }));

			const nextUser = nextStory.user.name;
			const nextId = nextStory.stories[nextStoryIdx].id;

			push(`/stories/${nextUser}/${nextId}`);
		} else {
			const currentIdx = getStoryIdx();
			const nextId = story.stories[currentIdx + 1].id;
			dispatch(setActiveIdx({ userIdx: idx, storyIdx: currentIdx + 1 }));

			push(`/stories/${username}/${nextId}`);
		}
	};

	return (
		<div
			className={`story-card ${active ? "" : "small"}`}
			style={{
				height: cHeight,
				width: cWidth + 92,
				transform: `translate(${cardOffset}px, -50%) `,
				zIndex: `${active ? "10" : "5"}`,
				// transformOrigin: "left center",
			}}
		>
			{!(idx === 0 && getStoryIdx() === 0) && active && (
				<button
					onClick={() => {
						handlePrev();
					}}
					className={`sArrow left ${active ? "act" : ""}`}
				/>
			)}
			{active && (
				<button
					onClick={() => {
						handleNext();
					}}
					className='sArrow right'
				/>
			)}
			<div className='story-content' onClick={handleContentClick}>
				StoryCard {username} {active ? "active" : ""} {getStoryIdx()}
				idx:{idx}
				userIdx={activeIdx.userIdx}
				storyIdx={activeIdx.storyIdx}
			</div>
		</div>
	);
};

export default StoryCard;

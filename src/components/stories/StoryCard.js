import { useEffect, useState } from "react";
import useWindowDimensions from "../../utils/windowHook";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectStories, setActiveIdx } from "../../redux/storiesSlice";

import "../../styles/stories/storyCard.scss";

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

		if (width <= 425) {
			tempWidth = width;
		} else if (width <= 588) {
			tempWidth = width / 3 + 92;
		} else if (width <= 768) {
			tempWidth = width / 2.8 + 92;
		} else if (width < 1024) {
			tempWidth = width / 3.2 + 92;
		} else {
			tempWidth = width / 4 + 92;
		}

		tempHeight = tempWidth * ratio;

		if (tempHeight > height) {
			tempHeight = 0.95 * height;
			tempWidth = tempHeight / ratio;
		}

		if (active) {
			setCWidth(tempWidth);
			setCHeight(tempHeight);
		} else {
			setCWidth((tempWidth - 46) * 0.4 - 46);
			setCHeight((tempWidth - 46) * ratio * 0.4);
		}
	}, [width, height, active]);

	useEffect(() => {
		if (active) {
			setCardOffset(width / 2 - cWidth / 2 - 46);
			return;
		}
		const diff = activeIdx.userIdx - idx;

		let twelveW = width / 12;
		let halfW = cWidth / 2 + 46;

		if (diff === 2) {
			if (width < 768) {
				setCardOffset(-300);
			} else if (width > 1280) {
				setCardOffset(twelveW - halfW);
			} else {
				setCardOffset(-halfW);
			}
		} else if (diff === 1) {
			if (width < 768) {
				setCardOffset(twelveW - halfW + 20);
			} else if (width > 1280) {
				setCardOffset(3 * twelveW - halfW);
			} else {
				setCardOffset(2 * twelveW - halfW);
			}
		} else if (diff === -1) {
			if (width < 768) {
				setCardOffset(11 * twelveW - halfW - 20);
			} else if (width > 1280) {
				setCardOffset(9 * twelveW - halfW);
			} else {
				setCardOffset(10 * twelveW - halfW);
			}
		} else if (diff === -2) {
			if (width < 768) {
				setCardOffset(2000);
			} else if (width > 1280) {
				setCardOffset(11 * twelveW - halfW);
			} else {
				setCardOffset(12 * twelveW - halfW);
			}
		} else if (diff <= -3) {
			setCardOffset(2000);
		} else {
			setCardOffset(-300);
		}
		if (width <= 425) setCardOffset(2000);
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
		if (idx === 0) return;
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
				{width <= 425 && (
					<div className='clickOverlay'>
						<div className='left cOver' onClick={handlePrev}></div>
						<div className='right cOver' onClick={handleNext}></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StoryCard;

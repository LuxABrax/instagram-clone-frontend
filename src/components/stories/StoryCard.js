import { useEffect, useState } from "react";
import useWindowDimensions from "../../utils/windowHook";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import {
	selectStories,
	setActiveIdx,
	setSeen,
	setUnseen,
	storySeen,
} from "../../redux/storiesSlice";

import StoryImage from "./StoryImage";
import StoryHeader from "./StoryHeader";
import Message from "./Message";
import Overlay from "./Overlay";
import Badge from "./Badge";
import StoryArrows from "./StoryArrows";

import "../../styles/stories/storyCard.scss";

const StoryCard = ({ idx, story, username, active, onlyUnseen, hide }) => {
	const { width, height } = useWindowDimensions();
	const [cHeight, setCHeight] = useState(0);
	const [cWidth, setCWidth] = useState(0);
	const [cardOffset, setCardOffset] = useState(0);

	const [currentId, setCurrentId] = useState(0);
	const [linePercent, setLinePercent] = useState(0);
	const [paused, setPaused] = useState(false);

	const { _id: userId } = useSelector(selectUser);
	const { storyId } = useParams();
	const { activeIdx } = useSelector(state => state.stories);
	const stories = useSelector(selectStories);

	const { push } = useHistory();
	const dispatch = useDispatch();

	// Set story width and height
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
		return () => {
			if (!active) {
				setCWidth(tempWidth);
				setCHeight(tempHeight);
			} else {
				setCWidth((tempWidth - 46) * 0.4 - 46);
				setCHeight((tempWidth - 46) * ratio * 0.4);
			}
		};
	}, [width, height, active]);

	// Set story offset
	useEffect(() => {
		if (active) {
			setCardOffset(width / 2 - cWidth / 2 - 46);
			return;
		}
		const diff = activeIdx.userIdx - idx;

		let twelveW = width / 12;
		let halfW = cWidth / 2 + 46;

		if (diff === 2) {
			if (width <= 768) {
				setCardOffset(-300);
			} else if (width >= 1024) {
				setCardOffset(twelveW - halfW / 2);
			} else {
				setCardOffset(-halfW);
			}
		} else if (diff === 1) {
			if (width <= 600) {
				setCardOffset(-halfW);
			} else if (width <= 768) {
				setCardOffset(twelveW - halfW + 20);
			} else if (width >= 1024) {
				setCardOffset(3 * twelveW - halfW);
			} else {
				setCardOffset(2 * twelveW - halfW);
			}
		} else if (diff === -1) {
			if (width <= 600) {
				setCardOffset(12 * twelveW - halfW);
			} else if (width <= 768) {
				setCardOffset(11 * twelveW - halfW - 20);
			} else if (width >= 1024) {
				setCardOffset(9 * twelveW - halfW);
			} else {
				setCardOffset(10 * twelveW - halfW);
			}
		} else if (diff === -2) {
			if (width <= 768) {
				setCardOffset(2000);
			} else if (width >= 1024) {
				setCardOffset(11 * twelveW - 1.5 * halfW);
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

	// Reset line and unpause when on new story
	useEffect(() => {
		if (storyId !== currentId) {
			setLinePercent(0);
			setPaused(false);
			setCurrentId(storyId);
		}
	}, [storyId, currentId]);

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

		dispatch(setSeen({ userIdx: idx, storyIdx: clickedIdx }));
		dispatch(storySeen({ userId, storyId: clickedId }));
		dispatch(setActiveIdx({ userIdx: idx, storyIdx: clickedIdx }));
		push(`/stories/${username}/${clickedId}`);
	};

	const handlePrev = () => {
		dispatch(setSeen({ userIdx: idx, storyIdx: activeIdx.storyIdx }));
		dispatch(storySeen({ userId, storyId }));

		// If first story of all users
		if (idx === 0 && activeIdx.storyIdx === 0) return;
		setLinePercent(0);

		// If first story of the user
		if (getStoryIdx() === 0) {
			const nextStory = stories[idx - 1];
			const nextStoryIdx = nextStory.indexes.storyIdx;
			const nextUser = nextStory.user.name;
			const nextId = nextStory.stories[nextStoryIdx].id;

			dispatch(setActiveIdx({ userIdx: idx - 1, storyIdx: nextStoryIdx }));
			push(`/stories/${nextUser}/${nextId}`);
		} else {
			// If not first story of the user
			const currentIdx = getStoryIdx();
			const nextId = story.stories[currentIdx - 1].id;

			dispatch(setActiveIdx({ userIdx: idx, storyIdx: currentIdx - 1 }));
			push(`/stories/${username}/${nextId}`);
		}
	};

	const handleNext = () => {
		dispatch(setSeen({ userIdx: idx, storyIdx: activeIdx.storyIdx }));
		dispatch(storySeen({ userId, storyId }));
		// If last user
		if (idx + 1 === stories.length) {
			dispatch(setUnseen({ userIdx: idx }));
			push("/");
			return;
		}
		setLinePercent(0);

		// If last story of the user
		if (getStoryIdx() === story.stories.length - 1) {
			const nextStory = stories[idx + 1];
			dispatch(setUnseen({ userIdx: idx }));

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
			// If not last story of the user
			const currentIdx = getStoryIdx();
			const nextId = story.stories[currentIdx + 1].id;

			dispatch(setActiveIdx({ userIdx: idx, storyIdx: currentIdx + 1 }));
			push(`/stories/${username}/${nextId}`);
		}
	};

	return (
		<div
			className={`story-card ${active ? "" : "small"} ${hide ? "hide" : ""}`}
			style={{
				transform: `translate(${cardOffset}px, -50%) `,
				height: cHeight,
				width: cWidth + 92,
				zIndex: `${active ? "10" : "5"}`,
			}}
		>
			<StoryArrows
				active={active}
				idx={idx}
				getStoryIdx={getStoryIdx}
				handlePrev={handlePrev}
				handleNext={handleNext}
			/>

			<div className='story-content' onClick={handleContentClick}>
				<StoryImage
					name={story.user.name}
					photo={story.stories[story.indexes.storyIdx].photo}
					active={active}
					setPaused={setPaused}
				/>

				{width <= 425 && (
					<Overlay
						setPaused={setPaused}
						handleNext={handleNext}
						handlePrev={handlePrev}
					/>
				)}

				{active ? (
					<>
						<StoryHeader
							name={username}
							photo={`http://localhost:5000/uploads/${story.user.photo}`}
							time={story.stories[activeIdx.storyIdx].createdAt}
							lines={story.stories.length}
							currentLine={activeIdx.storyIdx}
							sId={storyId}
							handleNext={handleNext}
							paused={paused}
							setPaused={setPaused}
							setLinePercent={setLinePercent}
							linePercent={linePercent}
						/>
						<Message name={username} setPaused={setPaused} />
					</>
				) : (
					<Badge story={story} username={username} />
				)}
			</div>
		</div>
	);
};

export default StoryCard;

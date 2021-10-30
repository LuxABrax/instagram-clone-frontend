import useWindowDimensions from "../../utils/windowHook";

import "../../styles/stories/storyArrows.scss";

const StoryArrows = ({ active, idx, getStoryIdx, handleNext, handlePrev }) => {
	const { width } = useWindowDimensions();

	return (
		<>
			{!(idx === 0 && getStoryIdx() === 0) && width > 425 && active && (
				<button
					onClick={handlePrev}
					className={`sArrow left ${active ? "act" : ""}`}
				/>
			)}
			{width > 425 && active && (
				<button onClick={handleNext} className='sArrow right' />
			)}
		</>
	);
};

export default StoryArrows;

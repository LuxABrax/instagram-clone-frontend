import "../../styles/stories/storyOverlay.scss";

const Overlay = ({ setPaused, handlePrev, handleNext }) => {
	return (
		<div
			className='story-overlay'
			onPointerDown={() => {
				setPaused(true);
			}}
			onPointerUp={() => {
				setPaused(false);
			}}
		>
			<div className='left cOver' onClick={handlePrev}></div>
			<div className='right cOver' onClick={handleNext}></div>
		</div>
	);
};

export default Overlay;

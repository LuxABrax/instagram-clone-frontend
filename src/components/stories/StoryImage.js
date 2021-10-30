import "../../styles/stories/storyImage.scss";

const StoryImage = ({ name, photo, active, setPaused }) => {
	return (
		<div className='story-image-container'>
			<img
				className='small-image'
				src={`http://localhost:5000/uploads/stories/${photo}`}
				alt={name}
				draggable='false'
				onPointerDown={() => {
					setPaused(true);
				}}
				onPointerUp={() => {
					setPaused(false);
				}}
			/>
			{!active && <div className='image-filter'></div>}
		</div>
	);
};

export default StoryImage;

import ProfileIcon from "../ProfileIcon";

import "../../styles/feed/story.scss";

const Story = props => {
	let { storyBorder, seen, accountName, photo } = props;

	if (storyBorder !== false) storyBorder = true;

	if (accountName.length > 10) {
		accountName = accountName.substring(0, 10) + "...";
	}

	return (
		<div
			className='story'
			onClick={() => {
				console.log("story click");
			}}
		>
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

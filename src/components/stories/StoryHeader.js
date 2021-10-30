import { useHistory } from "react-router";

import LineDisplay from "./LineDisplay";
import ProfileIcon from "../ProfileIcon";
import TimePassed from "../post/TimePassed";
import Controls from "./Controls";

import "../../styles/stories/storyHeader.scss";

const StoryHeader = ({
	handleNext,
	paused,
	setPaused,
	name,
	photo,
	time,
	lines,
	currentLine,
	linePercent,
	setLinePercent,
}) => {
	const { push } = useHistory();

	const gotoProfile = () => {
		push(`/profile/${name}`);
	};

	return (
		<header className='story-header'>
			<LineDisplay
				lines={lines}
				currentLine={currentLine}
				linePercent={linePercent}
				setLinePercent={setLinePercent}
				paused={paused}
				handleNext={handleNext}
			/>

			<div className='title'>
				<ProfileIcon image={photo} iconSize={"medium"} onClick={gotoProfile} />

				<button onClick={gotoProfile}>
					<h1 className='name'>{name}</h1>
				</button>

				<TimePassed createdAt={time} isStory />
			</div>

			<Controls paused={paused} setPaused={setPaused} />
		</header>
	);
};

export default StoryHeader;

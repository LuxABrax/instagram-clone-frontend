import { useHistory } from "react-router";
import TimePassed from "../post/TimePassed";
import ProfileIcon from "../ProfileIcon";
import { ReactComponent as Menu } from "../../icons/menuWhite.svg";
import { ReactComponent as Audio } from "../../icons/noAudio.svg";
import { ReactComponent as Play } from "../../icons/play.svg";
import { ReactComponent as Pause } from "../../icons/pause.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StoryHeader = ({ story, sId, name, photo, time, lines, currentLine }) => {
	const [linePercent, setLinePercent] = useState(0);
	const { push } = useHistory();
	const { activeIdx } = useSelector(state => state.stories);
	const arr = [];
	let i = 0;
	while (i < lines) {
		arr.push(i);
		i++;
	}
	useEffect(() => {
		let timer;
		if (linePercent <= 100) {
			timer = setTimeout(() => {
				setLinePercent(l => l + 1);
				if (linePercent == 100) {
					setLinePercent(0);
					push(`/stories/${name}/${sId}`);
				}
			}, 100);
		}
		return () => {
			clearTimeout(timer);
			// setLinePercent(0);
		};
	}, [linePercent, setLinePercent, name, activeIdx]);
	return (
		<header className='story-header'>
			<div className='lines'>
				{arr.map((i, idx) => {
					return (
						<div
							className='line-container'
							style={{
								width: `${
									lines === 1 ? "100" : `${Math.abs(100 / lines - 1)}`
								}%`,
							}}
						>
							<div
								className={`line ${
									idx === currentLine
										? "active"
										: idx < currentLine
										? "show"
										: "hide"
								}`}
								style={{
									width: `${idx === currentLine ? `${linePercent}` : "100"}%`,
								}}
							></div>
						</div>
					);
				})}
			</div>
			<div className='title'>
				<ProfileIcon image={photo} iconSize={"medium"} />
				<button
					onClick={() => {
						push(`/profile/${name}`);
					}}
				>
					<h1 className='name'>{name}</h1>
				</button>
				<TimePassed createdAt={time} isStory />
			</div>
			<div className='controls'>
				<button>
					<Play className='icon' />
				</button>

				<span>
					<Audio className='icon' />
				</span>
				<button>
					<Menu className='icon' />
				</button>
			</div>
		</header>
	);
};

export default StoryHeader;

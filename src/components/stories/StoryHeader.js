import { useEffect } from "react";
import { useHistory } from "react-router";

import ProfileIcon from "../ProfileIcon";
import TimePassed from "../post/TimePassed";
import { ReactComponent as Menu } from "../../icons/menuWhite.svg";
import { ReactComponent as Audio } from "../../icons/noAudio.svg";
import { ReactComponent as Play } from "../../icons/play.svg";
import { ReactComponent as Pause } from "../../icons/pause.svg";

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
				if (paused) {
					return;
				}
				setLinePercent(l => l + 0.5);
				if (linePercent === 100) {
					setLinePercent(0);
					handleNext();
				}
			}, 20);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [linePercent, setLinePercent, paused, handleNext]);
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
				<ProfileIcon
					image={photo}
					iconSize={"medium"}
					onClick={() => {
						push(`/profile/${name}`);
					}}
				/>
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
				<button onClick={() => setPaused(p => !p)}>
					{!paused ? <Pause className='icon' /> : <Play className='icon' />}
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

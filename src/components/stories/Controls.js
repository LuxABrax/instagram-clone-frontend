import { ReactComponent as Menu } from "../../icons/menuWhite.svg";
import { ReactComponent as Audio } from "../../icons/noAudio.svg";
import { ReactComponent as Play } from "../../icons/play.svg";
import { ReactComponent as Pause } from "../../icons/pause.svg";

const Controls = ({ paused, setPaused }) => {
	return (
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
	);
};

export default Controls;

import { useState } from "react";
import { ReactComponent as Share } from "../../icons/directWhite.svg";

import "../../styles/stories/storyMessage.scss";

const Message = ({ name, setPaused }) => {
	const [focus, setFocus] = useState(false);
	const [msg, setMsg] = useState("");

	return (
		<div className='message-container'>
			{focus && <div className='background-fade'></div>}
			{focus && msg.length === 0 && (
				<div className='emoji-container'>
					<h4>Quick Reactions</h4>
					<div className='row'>
						<p>{"😂"}</p>
						<p>{"😮"}</p>
						<p>{"😍"}</p>
						<p>{"😢"}</p>
					</div>
					<div className='row'>
						<p>{"👏"}</p>
						<p>{"🔥"}</p>
						<p>{"🎉"}</p>
						<p>{"💯"}</p>
					</div>
				</div>
			)}

			<div className='message-input'>
				<input
					className={`${!focus && msg.length === 0 ? "p" : ""}`}
					type='text'
					placeholder={`Reply too ${name}...`}
					onFocus={() => {
						setFocus(true);
						setPaused(true);
					}}
					onBlur={() => {
						setFocus(false);
						setPaused(false);
					}}
					value={msg}
					onChange={e => setMsg(e.target.value)}
				/>
				{msg.length > 0 && (
					<button className={`send ${!focus ? "fcs" : ""}`}>Send</button>
				)}
				{!focus && (
					<button className='share'>
						<Share />
					</button>
				)}
			</div>
		</div>
	);
};

export default Message;

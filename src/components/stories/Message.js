import { useState } from "react";
import { ReactComponent as Share } from "../../icons/directWhite.svg";

const Message = ({ name }) => {
	const [focus, setFocus] = useState(false);
	const [msg, setMsg] = useState("");
	return (
		<div className='message-container'>
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
					type='text'
					placeholder={`Reply too ${name}...`}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					value={msg}
					onChange={e => setMsg(e.target.value)}
				/>
				{msg.length > 0 && <button className='send'>Send</button>}
				{!focus && (
					<button>
						<Share />
					</button>
				)}
			</div>
		</div>
	);
};

export default Message;

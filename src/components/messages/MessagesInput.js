import { useState } from "react";
import { ReactComponent as AddImage } from "../../icons/addImage.svg";
import { ReactComponent as AddEmoji } from "../../icons/emoji.svg";
import "../../styles/messages/messagesInput.scss";
const MessagesInput = () => {
	const [msg, setMsg] = useState("");
	return (
		<div className='message-input-container'>
			<button className='add-emoji'>
				<AddEmoji className='icon' />
			</button>
			<input
				type='text'
				placeholder='new message'
				value={msg}
				onChange={e => setMsg(e.target.value)}
			/>

			{msg.length > 0 ? (
				<button className='send'>Send</button>
			) : (
				<button className='add-image'>
					<AddImage className='icon' />
				</button>
			)}
		</div>
	);
};

export default MessagesInput;

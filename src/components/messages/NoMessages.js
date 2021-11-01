import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/modalSlice";

import "../../styles/messages/noMessages.scss";

const NoMessages = () => {
	const dispatch = useDispatch();
	return (
		<div className='noMessages'>
			<span className='directImg'></span>
			<h2>Your Messages</h2>
			<p>Send private photos and messages to a friend or group.</p>
			<button
				onClick={() => dispatch(toggleModal("newMessage"))}
				className='sendMessage'
			>
				Send Message
			</button>
		</div>
	);
};

export default NoMessages;

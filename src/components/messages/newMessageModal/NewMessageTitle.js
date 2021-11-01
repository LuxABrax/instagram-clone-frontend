import { useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/modalSlice";

import { ReactComponent as Close } from "../../../icons/close.svg";

import "../../../styles/messages/newMessageTitle.scss";

const NewMessageTitle = ({ receivers }) => {
	const dispatch = useDispatch();
	return (
		<div className='newMessage-title'>
			<button className='close' onClick={() => dispatch(toggleModal())}>
				<Close className='icon' />
			</button>

			<h1>New message</h1>

			<button className='next' disabled={receivers.length === 0}>
				Next
			</button>
		</div>
	);
};

export default NewMessageTitle;

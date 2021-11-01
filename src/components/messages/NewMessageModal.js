import Modal from "../profile/modals/Modal";

import { ReactComponent as Close } from "../../icons/close.svg";
import "../../styles/messages/newMessageModal.scss";
import NewMessageSuggested from "./NewMessageSuggested";
import { useState } from "react";
import ReceiverTag from "./ReceiverTag";
import { toggleModal } from "../../redux/modalSlice";
import { useDispatch } from "react-redux";
const NewMessageModal = () => {
	const [receivers, setReceivers] = useState([]);
	const [activeIdx, setActiveIdx] = useState(undefined);
	const dispatch = useDispatch();
	const removeReceiver = name => {
		setReceivers(r => [...r.filter(rr => rr !== name)]);
	};
	return (
		<Modal>
			<div className='modalContent newMessageModal'>
				<div className='newMessage-title'>
					<button className='close' onClick={() => dispatch(toggleModal())}>
						<Close className='icon' />
					</button>
					<h1>New message</h1>

					<button className='next'>Next</button>
				</div>
				<div className='newMessage-receiver'>
					<h4>To:</h4>
					<div className='receiver-search'>
						{receivers.map((r, idx) => {
							return (
								<ReceiverTag
									r={r}
									idx={idx}
									activeIdx={activeIdx}
									setActiveIdx={setActiveIdx}
									removeReceiver={removeReceiver}
								/>
							);
						})}
						<input
							type='text'
							className='search'
							placeholder='Search...'
							onClick={() => setActiveIdx(-1)}
						/>
					</div>
				</div>
				<div className='newMessage-suggested'>
					<div className='title'>Suggested</div>
					<NewMessageSuggested
						name={"luka3"}
						receivers={receivers}
						setReceivers={setReceivers}
						setActiveIdx={setActiveIdx}
					/>
					<NewMessageSuggested
						name={"luka1"}
						receivers={receivers}
						setReceivers={setReceivers}
						setActiveIdx={setActiveIdx}
					/>
					<NewMessageSuggested
						name={"luka123"}
						receivers={receivers}
						setReceivers={setReceivers}
						setActiveIdx={setActiveIdx}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default NewMessageModal;

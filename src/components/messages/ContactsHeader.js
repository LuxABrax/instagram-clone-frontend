import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as NewMessage } from "../../icons/newMessage.svg";
import { selectUser } from "../../redux/authSlice";
import { ReactComponent as Arrow } from "../../icons/arrDown.svg";
import "../../styles/messages/contactHeader.scss";
import { toggleModal } from "../../redux/modalSlice";
const ContactsHeader = () => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	return (
		<div className='contacts-header'>
			<div className='spacing'></div>
			<button className='changeAccount'>
				<div className='name'>{user.name}</div>
				<div className='arrow'>
					<Arrow className='icon' />
				</div>
			</button>

			<button
				className='new-message'
				onClick={() => dispatch(toggleModal("newMessage"))}
			>
				<NewMessage />
			</button>
		</div>
	);
};

export default ContactsHeader;

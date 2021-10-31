import { useSelector } from "react-redux";
import { ReactComponent as NewMessage } from "../../icons/newMessage.svg";
import { selectUser } from "../../redux/authSlice";
import { ReactComponent as Arrow } from "../../icons/arrDown.svg";
import "../../styles/messages/contactHeader.scss";
const ContactsHeader = () => {
	const user = useSelector(selectUser);

	return (
		<div className='contacts-header'>
			<div className='spacing'></div>
			<button className='changeAccount'>
				<div className='name'>{user.name}</div>
				<div className='arrow'>
					<Arrow className='icon' />
				</div>
			</button>

			<button className='new-message'>
				<NewMessage />
			</button>
		</div>
	);
};

export default ContactsHeader;

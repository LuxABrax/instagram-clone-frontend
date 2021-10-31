import { useSelector } from "react-redux";
import ProfileIcon from "../components/ProfileIcon";
import { selectUser } from "../redux/authSlice";
import Contacts from "../components/messages/Contacts";
import MessagesContent from "../components/messages/MessagesContent";
import "../styles/pages/messages.scss";
const Messages = () => {
	const user = useSelector(selectUser);
	return (
		<div className='messages-page'>
			<div className='messages-container'>
				<Contacts />
				<MessagesContent />
			</div>
		</div>
	);
};

export default Messages;

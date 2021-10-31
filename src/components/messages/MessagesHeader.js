import ProfileIcon from "../ProfileIcon";
import { ReactComponent as Info } from "../../icons/info.svg";
import "../../styles/messages/messagesHeader.scss";

const MessagesHeader = () => {
	return (
		<div className='messages-header'>
			<header>
				<ProfileIcon iconSize='small' />
				<div className='contact-title'>Ana</div>
			</header>
			<div className='info'>
				<Info className='icon' />
			</div>
		</div>
	);
};

export default MessagesHeader;

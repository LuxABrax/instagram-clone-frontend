import ProfileIcon from "../ProfileIcon";
import "../../styles/messages/contactCard.scss";
const ContactCard = () => {
	return (
		<div className='contact-card'>
			<ProfileIcon iconSize='big' />
			<div className='contact-info'>
				<div className='contact-name'>Ana</div>
				<div className='contact-last-message'>
					<span className='message'>hahahaha</span>
					<span className='dot'>·</span>
					<time className='time'>1 tj</time>
				</div>
			</div>
			<div className='unread'></div>
		</div>
	);
};

export default ContactCard;

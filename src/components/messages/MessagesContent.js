import MessagesHeader from "./MessagesHeader";
import MessagesInput from "./MessagesInput";

const MessagesContent = () => {
	return (
		<section className='messages-content'>
			<MessagesHeader />
			<div className='messages-body'>
				<div className='message-cont'>
					<div className='message left'>Hadad</div>
				</div>
				<div className='message-cont'>
					<div className='message left'>Hadad</div>
				</div>
				<div className='message-cont'>
					<div className='message right'>Hadad</div>
				</div>
				<div className='message-cont'>
					<div className='message left'>Hadad</div>
				</div>
				<div className='message-cont'>
					<div className='message left'>Hadad</div>
				</div>
				<div className='message-cont'>
					<div className='message right'>Hadad</div>
				</div>
				<div className='message-cont'>
					<div className='message left'>Hadad</div>
				</div>
				<div className='message-cont'>
					<div className='message left'>Hadad</div>
				</div>
				<div className='message-cont'>
					<div className='message right'>Hadad</div>
				</div>
				<div className='message-cont'>
					<div className='message left'>Hadad</div>
				</div>
				<div className='message-cont'>
					<div className='message left'>Hadad</div>
				</div>
			</div>
			<MessagesInput />
		</section>
	);
};

export default MessagesContent;

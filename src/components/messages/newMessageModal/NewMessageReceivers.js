import ReceiverTag from "./ReceiverTag";

import "../../../styles/messages/newMessageReceivers.scss";

const NewMessageReceivers = ({
	receivers,
	activeIdx,
	setActiveIdx,
	removeReceiver,
	handleChange,
}) => {
	return (
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
					onChange={e => handleChange(e)}
				/>
			</div>
		</div>
	);
};

export default NewMessageReceivers;

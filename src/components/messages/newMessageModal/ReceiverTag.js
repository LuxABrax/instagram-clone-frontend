import { ReactComponent as Close } from "../../../icons/close.svg";

import "../../../styles/messages/receiverTag.scss";

const ReceiverTag = ({ r, idx, activeIdx, setActiveIdx, removeReceiver }) => {
	return (
		<div className={`receiver-tag ${activeIdx === idx ? "act" : ""}`}>
			<div
				className='name'
				onClick={() => {
					if (activeIdx === idx) {
						removeReceiver(r);
						setActiveIdx(-1);
					} else {
						setActiveIdx(idx);
					}
				}}
			>
				{r}
			</div>

			<div className='removeTag' onClick={() => removeReceiver(r)}>
				<Close className='icon' />
			</div>
		</div>
	);
};

export default ReceiverTag;

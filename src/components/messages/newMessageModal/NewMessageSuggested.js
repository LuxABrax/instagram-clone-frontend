import { useState, useEffect } from "react";

import ProfileIcon from "../../ProfileIcon";
import { ReactComponent as Check } from "../../../icons/selectMsg.svg";
import { ReactComponent as Uncheck } from "../../../icons/selectNone.svg";

import "../../../styles/messages/messageSuggested.scss";

const NewMessageSuggested = ({
	user,
	receivers,
	setReceivers,
	setActiveIdx,
	setSearchTerm,
}) => {
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		const isSel = receivers.filter(r => r === user.name).length > 0;
		if (isSel) {
			setSelected(true);
		} else {
			setSelected(false);
		}
	}, [receivers, user.name]);

	const handleCheck = () => {
		if (selected) {
			setReceivers(r => [...r.filter(rr => rr !== user.name)]);
		} else {
			setReceivers(r => [...r, user.name]);
			setSearchTerm("");
		}
		setActiveIdx(-1);
		setSelected(s => !s);
	};
	return (
		<div className='message-suggested' onClick={handleCheck}>
			<ProfileIcon
				image={`http://localhost:5000/uploads/${user.photo}`}
				iconSize='mediumX'
			/>

			<div className='name-container'>
				<div className='name'>{user.name}</div>
				<div className='full-name'>{user.fullName}</div>
			</div>

			<button className='select'>
				{selected ? <Check className='icon' /> : <Uncheck className='icon' />}
			</button>
		</div>
	);
};

export default NewMessageSuggested;

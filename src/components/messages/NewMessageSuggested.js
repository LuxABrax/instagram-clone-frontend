import { useState } from "react";

import ProfileIcon from "../ProfileIcon";
import { ReactComponent as Check } from "../../icons/selectMsg.svg";
import { ReactComponent as Uncheck } from "../../icons/selectNone.svg";
import "../../styles/messages/messageSuggested.scss";
import { useEffect } from "react";
import { setActiveIdx } from "../../redux/storiesSlice";
const NewMessageSuggested = ({
	name,
	receivers,
	setReceivers,
	setActiveIdx,
}) => {
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		const isSel = receivers.filter(r => r === name).length > 0;
		if (isSel) {
			setSelected(true);
		} else {
			setSelected(false);
		}
	}, [receivers, name]);

	const handleCheck = () => {
		if (selected) {
			setReceivers(r => [...r.filter(rr => rr !== name)]);
		} else {
			setReceivers(r => [...r, name]);
		}
		setActiveIdx(-1);
		setSelected(s => !s);
	};
	return (
		<div className='message-suggested' onClick={handleCheck}>
			<ProfileIcon iconSize='mediumX' />
			<div className='name-container'>
				<div className='name'>{name}</div>
				<div className='full-name'>Luka Braje</div>
			</div>
			<button className='select'>
				{selected ? <Check className='icon' /> : <Uncheck className='icon' />}
			</button>
		</div>
	);
};

export default NewMessageSuggested;

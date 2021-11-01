import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/authSlice";
import {
	getFollowedUsers,
	getNotFollowedUsers,
} from "../../../redux/usersSlice";

import Modal from "../../profile/modals/Modal";
import NewMessageTitle from "./NewMessageTitle";
import NewMessageReceivers from "./NewMessageReceivers";
import NewMessageSuggested from "./NewMessageSuggested";

import "../../../styles/messages/newMessageModal.scss";

const NewMessageModal = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [users, setUsers] = useState([]);
	const [suggestedUsers, setSuggestedUsers] = useState([]);
	const [receivers, setReceivers] = useState([]);
	const [activeIdx, setActiveIdx] = useState(undefined);

	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const {
		followedUsers: fUsers,
		notFollowedUsers: nfUsers,
		status,
	} = useSelector(state => state.users);

	const removeReceiver = name => {
		setReceivers(r => [...r.filter(rr => rr !== name)]);
	};

	const removeDuplicates = (data, key) => {
		return [...new Map(data.map(item => [key(item), item])).values()];
	};

	const handleChange = e => {
		const text = e.target.value;
		setSearchTerm(text);
		setSuggestedUsers([
			...users.filter(u => u.name.indexOf(text.toLowerCase()) !== -1),
		]);
	};

	useEffect(() => {
		const statusArr = ["getting nfUsers", "getting fUsers"];

		if (fUsers.length === 0 && !statusArr.includes(status))
			dispatch(getFollowedUsers({ userId: user._id }));

		if (nfUsers.length === 0 && !statusArr.includes(status))
			dispatch(getNotFollowedUsers({ userId: user._id }));

		if (fUsers.length > 0 && nfUsers.length > 0 && users.length === 0)
			setUsers([...fUsers, ...nfUsers]);
	}, [status, fUsers, nfUsers, user._id, users, setUsers, dispatch]);

	useEffect(() => {
		if (searchTerm.length === 0 && users.length > 0)
			setSuggestedUsers([...removeDuplicates([...users], item => item._id)]);
	}, [searchTerm, users, setSuggestedUsers]);

	return (
		<Modal>
			<div className='modalContent newMessageModal'>
				<NewMessageTitle receivers={receivers} />

				<NewMessageReceivers
					receivers={receivers}
					activeIdx={activeIdx}
					setActiveIdx={setActiveIdx}
					removeReceiver={removeReceiver}
					handleChange={handleChange}
				/>

				<div className='newMessage-suggested'>
					<div className='title'>Suggested</div>
					{suggestedUsers.length > 0 &&
						suggestedUsers.map((u, idx) => {
							if (idx > 19) return null;
							return (
								<NewMessageSuggested
									key={idx}
									user={u}
									receivers={receivers}
									setReceivers={setReceivers}
									setActiveIdx={setActiveIdx}
									setSearchTerm={setSearchTerm}
								/>
							);
						})}
				</div>
			</div>
		</Modal>
	);
};

export default NewMessageModal;

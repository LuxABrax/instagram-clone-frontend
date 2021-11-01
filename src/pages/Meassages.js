import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";

import Contacts from "../components/messages/Contacts";
import NoMessages from "../components/messages/NoMessages";
import MessagesContent from "../components/messages/MessagesContent";
import NewMessageModal from "../components/messages/newMessageModal/NewMessageModal";

import "../styles/pages/messages.scss";

const Messages = () => {
	const ENDPOINT = "http://localhost:5000";
	const user = useSelector(selectUser);
	const [roomName, setRoomName] = useState("");

	useEffect(() => {
		const socket = io(ENDPOINT, {
			transports: ["websocket", "polling", "flashsocket"],
		});
		console.log(socket);
		// client-side
		socket.on("connect", () => {
			console.log(socket.id); // x8WIv7-mJelg7on_ALbx
		});
	}, [ENDPOINT]);

	const { modalActive, modalName } = useSelector(state => state.modal);
	return (
		<div className='messages-page'>
			{modalActive && modalName === "newMessage" && (
				<NewMessageModal setRoomName={setRoomName} />
			)}
			<div className='messages-container'>
				<Contacts />
				{/* <MessagesContent /> */}
				<NoMessages />
			</div>
		</div>
	);
};

export default Messages;

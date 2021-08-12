import "../styles/pages/home.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import {
	setSuggestions,
	getNotFollowedUsers,
	selectNotFollowedUsers,
} from "../redux/usersSlice";

import Feed from "../components/feed/Feed";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
	const userId = useSelector(selectUser)._id;
	const nfUsers = useSelector(selectNotFollowedUsers);

	const dispatch = useDispatch();

	useEffect(() => {
		if (nfUsers.length === 0) dispatch(getNotFollowedUsers(userId));

		const createSuggestions = () => {
			const arr = [...nfUsers];

			arr.sort(() => Math.random() - 0.5);

			let newArr = [];
			if (arr.length > 5) {
				newArr = arr.slice(0, 5);
			} else {
				newArr = [...arr];
			}

			dispatch(setSuggestions(newArr));
		};
		if (nfUsers.length > 0) createSuggestions();
	}, [nfUsers, nfUsers.length, dispatch, userId]);

	return (
		<div className='home'>
			<div className='container'>
				<Feed />
				<Sidebar />
			</div>
		</div>
	);
};

export default Home;

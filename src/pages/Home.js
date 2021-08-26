import "../styles/pages/home.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/authSlice";
import {
	setSuggestions,
	getNotFollowedUsers,
	selectNotFollowedUsers,
	setIsCreated,
	setPosts,
	selectPosts,
} from "../redux/usersSlice";
import axios from "../axios";

import Feed from "../components/feed/Feed";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
	const user = useSelector(selectUser);
	const userId = user._id;
	const nfUsers = useSelector(selectNotFollowedUsers);
	const posts = useSelector(selectPosts);
	// const isLoaded = useSelector(state => state.users.loadedUsers);
	const noUsers = useSelector(state => state.users.noUsersToFollow);
	const isCreated = useSelector(state => state.users.isCreated);

	const dispatch = useDispatch();

	useEffect(() => {
		if (user === undefined) dispatch(logout());

		const createSuggestions = () => {
			const arr = [...nfUsers];

			arr.sort(() => Math.random() - 0.5);

			dispatch(setSuggestions(arr));
			dispatch(setIsCreated(true));
		};
		if (nfUsers.length === 0 && !noUsers) {
			dispatch(getNotFollowedUsers(userId));
			setTimeout(() => {
				createSuggestions();
			}, 1000);
		}
	}, [nfUsers, nfUsers.length, dispatch, userId, user, isCreated, noUsers]);
	useEffect(() => {
		const getPosts = async () => {
			const res = await axios.get(`/posts/following/${userId}`);
			const posts = await res.data.data;
			console.log(posts);
			dispatch(setPosts(posts));
		};
		getPosts();
	}, []);
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

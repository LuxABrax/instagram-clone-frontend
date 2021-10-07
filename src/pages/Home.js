import "../styles/pages/home.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/authSlice";
// import { selectPopup, setPopup } from "../redux/popupSlice";
import {
	setSuggestions,
	getNotFollowedUsers,
	selectNotFollowedUsers,
	setIsCreated,
	getFollowedUsers,
} from "../redux/usersSlice";
import { getPosts } from "../redux/postsSlice";

import Feed from "../components/feed/Feed";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
	// const { popupActive } = useSelector(selectPopup);
	const user = useSelector(selectUser);
	const userId = user._id;
	const nfUsers = useSelector(selectNotFollowedUsers);

	// const isLoaded = useSelector(state => state.users.loadedUsers);
	const noUsers = useSelector(state => state.users.noUsersToFollow);
	const isCreated = useSelector(state => state.users.isCreated);

	const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (popupActive) dispatch(setPopup("close"));
	// 	// remove popup on load
	// });

	useEffect(() => {
		if (user === undefined) dispatch(logout());

		const createSuggestions = () => {
			const arr = [...nfUsers];

			arr.sort(() => Math.random() - 0.5);

			dispatch(setSuggestions(arr));
			dispatch(setIsCreated(true));
		};
		const getUsers = async () => {
			await dispatch(getNotFollowedUsers(userId));
			// setTimeout(() => {
			createSuggestions();
			// }, 1000);
		};
		if (nfUsers.length === 0 && !noUsers) {
			getUsers();
		}
	}, [nfUsers, nfUsers.length, dispatch, userId, user, isCreated, noUsers]);

	useEffect(() => {
		window.scrollTo(0, 0);

		const getPostsEF = async () => {
			await dispatch(getFollowedUsers(userId));
			await dispatch(getPosts(userId));
		};
		getPostsEF();
	}, [dispatch, userId]);

	return (
		<div className='home'>
			<div className='container'>
				<Feed withStories />
				<Sidebar />
			</div>
		</div>
	);
};

export default Home;

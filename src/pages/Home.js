import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/authSlice";

import {
	setSuggestions,
	getNotFollowedUsers,
	selectNotFollowedUsers,
	setIsCreated,
	getFollowedUsers,
} from "../redux/usersSlice";
import { getPosts } from "../redux/postsSlice";
import { getStories, selectStories } from "../redux/storiesSlice";

import Feed from "../components/feed/Feed";
import Sidebar from "../components/sidebar/Sidebar";

import "../styles/pages/home.scss";
import AddStoryModal from "../components/profile/modals/AddStoryModal";

const Home = () => {
	const user = useSelector(selectUser);
	const userId = user._id;
	const nfUsers = useSelector(selectNotFollowedUsers);
	const stories = useSelector(selectStories);
	const noUsers = useSelector(state => state.users.noUsersToFollow);
	const isCreated = useSelector(state => state.users.isCreated);
	const { modalActive, modalName } = useSelector(state => state.modal);

	const dispatch = useDispatch();

	useEffect(() => {
		let timer = setTimeout(
			() => {
				dispatch(getStories(userId));
				console.log("timer");
			},
			stories.length === 0 ? 1000 : 120000
		);
		return () => {
			clearTimeout(timer);
		};
	}, [dispatch, stories.length, userId]);

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
			{modalName === "addStory" && modalActive && (
				<AddStoryModal id={user._id} />
			)}
			<div className='container'>
				<Feed withStories />
				<Sidebar />
			</div>
		</div>
	);
};

export default Home;

import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { changePage, selectPage } from "../redux/navigationSlice";
import {
	toggleModal,
	selectModalActive,
	selectModalName,
	selectProfileSuggestions,
} from "../redux/modalSlice";
import { selectUser } from "../redux/authSlice";
import {
	getFollowedUsers,
	getFollowingUsers,
	getUserProfile,
	selectUserPosts,
	selectUserProfile,
	setUserPosts,
} from "../redux/usersSlice";
import axios from "../axios";

import { Header, FeedMenu, NoPosts } from "../components/profile";
import Feed from "../components/feed/Feed";
import {
	PostModal,
	AddPostModal,
	ChangeImgModal,
	FollowersModal,
	UnFollowModal,
} from "../components/profile/modals";

import "../styles/pages/profile.scss";
import SuggestedUsers from "../components/feed/SuggestedUsers";

const Profile = () => {
	// const [arrSorted, setArrSorted] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [sortedPosts, setSortedPosts] = useState([]);
	const [imagesPosts, setImagesPosts] = useState([]);

	let location = useLocation();
	let { pName, pId } = useParams();
	const { push } = useHistory();
	const dispatch = useDispatch();

	const activePage = useSelector(selectPage);
	const status = useSelector(state => state.users.status);
	const user = useSelector(selectUser);
	const user2 = useSelector(selectUserProfile);
	const profileSuggestions = useSelector(selectProfileSuggestions);

	let userProfile = {};

	userProfile = user2;

	let modalActive = useSelector(selectModalActive);
	let modalName = useSelector(selectModalName);

	const userPosts = useSelector(selectUserPosts);

	function openModal(postId) {
		dispatch(toggleModal());
		push(`/profile/${pName}/p/${postId}`);
	}

	const showSaved = async () => {
		const res = await axios.get(`/posts/saved/${user._id}`);
		// console.log(await res.data);
		const arr = await [...res.data.data];
		arr.reverse();
		// dispatch(setUserSaved(arr));
		setImagesPosts(arr);
	};
	const showPosts = () => {
		setImagesPosts([...userPosts]);
	};
	function changeImg() {
		if (pName === user.name) dispatch(toggleModal("img"));
	}

	if (status === "get user success") {
		dispatch(getFollowedUsers(user2._id));
		dispatch(getFollowingUsers(user2._id));
	}

	useEffect(() => {
		window.scrollTo(0, 0);
		if (activePage !== "profile") dispatch(changePage("profile"));
		if (pId !== undefined && modalActive === false) dispatch(toggleModal());
		dispatch(getUserProfile(pName));
	}, [activePage, dispatch, modalActive, pId, pName]);

	useEffect(() => {
		const checkIfFollowing = async (uid, fid) => {
			const response = await axios.get(`/follow/${uid}/isfollowing/${fid}`);
			const isF = await response.data.isfollowing;
			setIsFollowing(isF);
		};
		checkIfFollowing(user._id, user2._id);
	}, [user2._id, user._id, isFollowing, setIsFollowing]);

	useEffect(() => {
		const getPosts = async () => {
			const res = await axios.get(`/posts/profile/${user2._id}`);
			// console.log(await res.data);
			const arr = await [...res.data.data];
			arr.reverse();
			dispatch(setUserPosts(arr));
			setImagesPosts(arr);
		};
		const getSaved = async () => {
			const res = await axios.get(`/posts/saved/${user._id}`);
			const arr = await [...res.data.data];
			arr.reverse();
			// dispatch(setUserSaved(arr));
			setImagesPosts(arr);
		};
		if (location.pathname === `/profile/${user.name}/saved`) {
			getSaved();
		} else {
			getPosts();
		}
	}, [dispatch, user, user2, location.pathname]);

	useEffect(() => {
		const sortPosts = () => {
			const sPosts = [];

			let len = imagesPosts.length;
			let rowNum = Math.ceil(len / 3);
			let emptyNum = rowNum * 3 - len;
			let totalNum = len + emptyNum;

			let arr = [];
			let j = 0;
			for (let i = 0; i < totalNum; i++) {
				if (i < len) {
					arr.push(imagesPosts[i]);
				} else {
					arr.push({ _id: `${i}empty`, photo: "empty" });
				}
				j++;

				if (j === 3) {
					sPosts.push(arr);
					arr = [];
					j = 0;
				}
				if (i === totalNum) sPosts.push(arr);
			}
			// console.log(sPosts);
			setSortedPosts(sPosts);
			// setArrSorted(true);
		};

		sortPosts();
	}, [dispatch, imagesPosts]);

	const addImage = image => {
		const arr = [...imagesPosts];
		arr.unshift(image);
		setImagesPosts([...arr]);
	};

	return (
		<div className='profile'>
			{pId !== undefined && modalActive && (
				<PostModal
					pId={pId}
					accountName={userProfile.name}
					storyBorder={true}
					image={`http://localhost:5000/uploads/${userProfile.photo}`}
					// comments={comments[0].comments}
					hours={2}
				/>
			)}
			{modalName === "addPost" && modalActive && (
				<AddPostModal id={user._id} addImage={addImage} />
			)}
			{modalName === "img" && modalActive && <ChangeImgModal id={user._id} />}
			{modalName === "unFollow" && modalActive && (
				<UnFollowModal
					uid={user._id}
					id={userProfile._id}
					photo={userProfile.photo}
					name={userProfile.name}
					setIsFollowing={setIsFollowing}
				/>
			)}
			{modalName === "followers" && modalActive && (
				<FollowersModal
					id={user._id}
					type='followers'
					btnType={user.name === pName ? "remove" : ""}
				/>
			)}
			{modalName === "following" && modalActive && (
				<FollowersModal
					id={user._id}
					type='following'
					btnType={user.name === pName ? "remove" : ""}
				/>
			)}
			<Header
				image={`http://localhost:5000/uploads/${userProfile.photo}`}
				id={userProfile._id}
				accountName={userProfile.name}
				fullName={userProfile.fullName}
				description={userProfile.description}
				postNumber={userProfile.posts}
				followers={userProfile.followers}
				following={userProfile.following}
				changeImg={changeImg}
				isFollowing={isFollowing}
				setIsFollowing={setIsFollowing}
			/>
			{profileSuggestions && user._id !== user2._id && <SuggestedUsers />}
			<FeedMenu
				showSaved={showSaved}
				showPosts={showPosts}
				isOwner={pName === user.name}
			/>
			<div className='posts'>
				{imagesPosts.length > 0 ? (
					location.pathname === `/profile/${user2.name}/feed` ? (
						<Feed onProfile uId={userProfile._id} />
					) : (
						sortedPosts?.map((postRow, index) => {
							return (
								<div className='pRow' key={index}>
									{postRow.map((postI, idx) => {
										if (postI.photo === "empty") {
											return <div className='postContainer' key={idx}></div>;
										} else {
											return (
												<div
													className='postContainer'
													key={idx}
													onClick={async () => {
														openModal(postI._id);
													}}
												>
													<img
														className='gridImg'
														src={`http://localhost:5000/uploads/posts/${postI.photo}`}
														alt=''
													/>
												</div>
											);
										}
									})}
								</div>
							);
						})
					)
				) : (
					<NoPosts />
				)}
			</div>
		</div>
	);
};

export default Profile;

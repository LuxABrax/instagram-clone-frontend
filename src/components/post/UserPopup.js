import "../../styles/post/userPopup.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { useHistory } from "react-router";

import ProfileIcon from "../ProfileIcon";
import FollowInfo from "../profile/FollowInfo";

import axios from "../../axios";
import {
	setOverPopup,
	setPopup,
	selectPopup,
	getPopupContent,
} from "../../redux/popupSlice";

const UserPopup = ({ fid }) => {
	const user = useSelector(selectUser);
	const { popupActive, popupContent } = useSelector(selectPopup);
	const dispatch = useDispatch();

	const [popupFetched, setPopupFetched] = useState(false);
	// const [popupInfo, setPopupInfo] = useState({
	// 	accountName: "",
	// 	id: "",
	// 	photo: "",
	// 	fullName: "",
	// 	posts: undefined,
	// 	followers: undefined,
	// 	following: undefined,
	// 	isFollowing: undefined,
	// 	postGallery: [],
	// });

	const { push } = useHistory();

	useEffect(() => {
		const getPopupInfo = async () => {
			// if (fid !== popupContent._id)
			await dispatch(getPopupContent({ uId: user._id, fId: fid }));
			// const res = await axios.get(`/follow/popup/${user._id}/${fid}`);
			// // console.log(await res.data);
			// const {
			// 	_id,
			// 	name,
			// 	photo,
			// 	fullName,
			// 	posts,
			// 	followers,
			// 	following,
			// 	isFollowing,
			// 	postGallery,
			// } = await res.data.popupInfo;

			// setPopupInfo(pI => ({
			// 	...pI,
			// 	accountName: name,
			// 	id: _id,
			// 	photo,
			// 	fullName,
			// 	posts,
			// 	followers,
			// 	following,
			// 	isFollowing,
			// 	postGallery,
			// }));
			setPopupFetched(true);
		};
		getPopupInfo();
	}, [dispatch, user._id, fid]);

	function openPopup() {
		dispatch(setOverPopup(true));
	}
	function hidePopup() {
		dispatch(setOverPopup(false));
		dispatch(setPopup());
		// setTimeout(() => {}, 1000);
	}

	function gotoProfile() {
		dispatch(setPopup("close"));
		push(`/profile/${popupContent.name}`);
	}
	if (
		popupFetched
		//  && popupActive
	) {
		return (
			<div
				className='userPopup'
				onPointerEnter={() => {
					openPopup();
				}}
				onPointerLeave={() => {
					hidePopup();
				}}
			>
				<header>
					<div className='profIcon'>
						<ProfileIcon
							image={`http://localhost:5000/uploads/${popupContent.photo}`}
							iconSize='big'
							onClick={gotoProfile}
						/>
					</div>
					<div className='profInfo'>
						<div className='title'>
							<h2 onClick={gotoProfile}>{popupContent.name}</h2>
						</div>
						<div className='desc'>
							<div className='fullName'>
								<strong>{popupContent.fullName}</strong>
							</div>
						</div>
					</div>
				</header>
				<FollowInfo
					posts={popupContent.posts}
					followers={popupContent.followers}
					following={popupContent.following}
					isPopup={true}
				/>
				<div className='imageDisplay'>
					{popupContent.postGallery.length > 0 &&
						popupContent.postGallery.map(i => {
							return (
								<img
									src={`http://localhost:5000/uploads/posts/${i.photo}`}
									alt='post'
									key={i.id}
									onClick={() => {
										dispatch(setPopup("close"));
										push(`/profile/${popupContent.name}/p/${i.id}`);
									}}
								/>
							);
						})}
				</div>
				<div className='popupBtns'>
					{popupContent.isFollowing ? (
						<>
							<button>Message</button>
							<button>Following</button>
						</>
					) : (
						<button>Follow</button>
					)}
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default UserPopup;

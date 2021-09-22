import "../../styles/post/userPopup.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { useHistory } from "react-router";
import {
	setOverPopup,
	setPopup,
	selectPopup,
	getPopupContent,
} from "../../redux/popupSlice";

import ProfileIcon from "../ProfileIcon";
import FollowInfo from "../profile/FollowInfo";

const UserPopup = ({ fid }) => {
	const user = useSelector(selectUser);
	const { popupContent, popupOffset } = useSelector(selectPopup);

	const dispatch = useDispatch();
	const { push } = useHistory();

	const [popupFetched, setPopupFetched] = useState(false);

	const { x, y } = popupOffset;
	const posStyle = {
		top: `${y < 0 ? "22px" : "none"}`,
		bottom: `${y > 0 ? "22px" : "none"}`,
		left: x + "px",
	};

	useEffect(() => {
		const getPopupInfo = async () => {
			await dispatch(getPopupContent({ uId: user._id, fId: fid }));

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
	}

	function gotoProfile() {
		dispatch(setPopup("close"));
		push(`/profile/${popupContent.name}`);
	}
	if (popupFetched) {
		return (
			<div
				className='userPopup'
				onPointerEnter={() => {
					openPopup();
				}}
				onPointerLeave={() => {
					hidePopup();
				}}
				style={posStyle}
			>
				<header>
					<div className='profIcon'>
						<ProfileIcon
							image={`http://localhost:5000/uploads/${popupContent.photo}`}
							iconSize='big'
							onClick={gotoProfile}
						/>
					</div>
					<div className='popupInfo'>
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

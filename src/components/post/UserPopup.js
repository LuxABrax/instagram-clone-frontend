import "../../styles/post/userPopup.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { useHistory } from "react-router";

import ProfileIcon from "../ProfileIcon";
import FollowInfo from "../profile/FollowInfo";

import axios from "../../axios";

const UserPopup = ({ fid }) => {
	const user = useSelector(selectUser);

	const [popupFetched, setPopupFetched] = useState(false);
	const [popupInfo, setPopupInfo] = useState({
		accountName: "",
		id: "",
		photo: "",
		fullName: "",
		posts: undefined,
		followers: undefined,
		following: undefined,
		isFollowing: undefined,
		postGallery: [],
	});

	const { push } = useHistory();

	useEffect(() => {
		const getPopupInfo = async () => {
			const res = await axios.get(`/follow/popup/${user._id}/${fid}`);
			// console.log(await res.data);
			const {
				_id,
				name,
				photo,
				fullName,
				posts,
				followers,
				following,
				isFollowing,
				postGallery,
			} = await res.data.popupInfo;

			setPopupInfo(pI => ({
				...pI,
				accountName: name,
				id: _id,
				photo,
				fullName,
				posts,
				followers,
				following,
				isFollowing,
				postGallery,
			}));
			setPopupFetched(true);
		};
		getPopupInfo();
	}, [user._id, fid]);

	if (popupFetched) {
		return (
			<div className='userPopup'>
				<header>
					<div className='profIcon'>
						<ProfileIcon
							image={`http://localhost:5000/uploads/${popupInfo.photo}`}
							iconSize='big'
						/>
					</div>
					<div className='profInfo'>
						<div className='title'>
							<h2>{popupInfo.accountName}</h2>
						</div>
						<div className='desc'>
							<div className='fullName'>
								<strong>{popupInfo.fullName}</strong>
							</div>
						</div>
					</div>
				</header>
				<FollowInfo
					posts={popupInfo.posts}
					followers={popupInfo.followers}
					following={popupInfo.following}
					isPopup={true}
				/>
				<div className='imageDisplay'>
					{popupInfo.postGallery.length > 0 &&
						popupInfo.postGallery.map(i => {
							return (
								<img
									src={`http://localhost:5000/uploads/posts/${i.photo}`}
									alt='post'
									key={i.id}
									onClick={() =>
										push(`/profile/${popupInfo.accountName}/p/${i.id}`)
									}
								/>
							);
						})}
				</div>
				<div className='popupBtns'>
					{popupInfo.isFollowing ? (
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

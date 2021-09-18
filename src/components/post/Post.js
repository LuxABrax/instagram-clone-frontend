import "../../styles/post/post.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectFollowedUsers } from "../../redux/usersSlice";
import { setOverTrigger, setPopup, selectPopup } from "../../redux/popupSlice";
import axios from "../../axios";

import ProfileComp from "../ProfileComp";
import { ReactComponent as More } from "../../icons/more.svg";
import PostMenu from "./PostMenu";
import Comment from "./Comment";
import AddComment from "./AddComment";
import TimePassed from "./TimePassed";
import UserPopup from "./UserPopup";

const Post = props => {
	const {
		id,
		accountName,
		uid,
		image,
		description,
		comments,
		likes,
		createdAt,
	} = props;

	const [ownerPhoto, setOwnerPhoto] = useState("");
	const [likedUser, setLikedUser] = useState({
		id: "",
		name: "",
		photo: "",
	});
	const [commentsActive, setCommentsActive] = useState(false);

	const fUsers = useSelector(selectFollowedUsers);
	const { popupActive } = useSelector(selectPopup);
	const { push } = useHistory();
	const dispatch = useDispatch();
	useEffect(() => {
		const getPhoto = async () => {
			const user = fUsers.filter(u => u._id === uid);
			if (user[0] !== undefined) setOwnerPhoto(user[0].photo);
		};
		if (fUsers.length > 0) getPhoto();
		return () => {};
	}, [fUsers, uid]);

	useEffect(() => {
		const getPhotoName = async () => {
			const id = likes[likes.length - 1];
			const res = await axios.get(`/users/i/${id}`);
			const data = await res.data;
			if (!data.success) {
				console.log("no user");
			} else {
				setLikedUser({ id: id, name: data.data.name, photo: data.data.photo });
			}
		};
		if (likes !== undefined && likes.length > 0) {
			getPhotoName();
		}
		return () => {};
	}, [likes]);

	function handlePopup(e, handleType, handleEl) {
		console.log("handle popup");
		// if (handleType === "show") {
		// 	const popupOffset = (e.clientY - 54) / (e.view.outerHeight - 54);
		// 	console.log(popupOffset);
		// 	const offY = popupOffset < 0.5 ? -10 : 10;
		// 	const offX = handleEl === "icon" ? -10 : handleEl === "name" ? 10 : 15;
		// 	console.log(offY, offX);
		// 	// dispatch(setPopupOffset());
		// 	dispatch(setOverTrigger(true));
		// 	dispatch(setPopup());
		// } else {
		// 	dispatch(setOverTrigger(false));
		// 	setTimeout(() => {
		// 		dispatch(setPopup());
		// 	}, 200);
		// }
		// dispatch(setPopup());
	}

	return (
		<div className='post'>
			{/* {popupActive && likedUser.id !== undefined && (
				<UserPopup fid={likedUser.id} />
			)} */}

			<header>
				<ProfileComp
					id={uid}
					iconSize='medium'
					username={accountName}
					showPopup={true}
					image={
						ownerPhoto.length > 0
							? `http://localhost:5000/uploads/${ownerPhoto}`
							: ""
					}
				/>
				<More className='moreBtn' />
			</header>
			<img className='postImage' src={image} alt='post content' />
			<div className='postDesc'>
				<PostMenu id={id} name={accountName} />
				{likes.length > 0 && (
					<div className='likedBy'>
						<span>
							Liked by{" "}
							<span
								className='link'
								onClick={() => {
									push(`/profile/${likedUser.name}`);
								}}
								onPointerOver={e => {
									handlePopup(e, "show", "name");
								}}
								onPointerOut={() => {
									handlePopup();
								}}
							>
								{likedUser.name}
							</span>
							{likes.length > 1 && (
								<>
									and <span className='link'>{likes.length - 1} others</span>
								</>
							)}
						</span>
					</div>
				)}
				{description.length > 0 && (
					<div className='postDescription'>
						<span>{accountName}</span>
						{description}
					</div>
				)}
				{comments.length > 2 && (
					<div
						className='viewComments'
						onClick={() => setCommentsActive(c => !c)}
					>
						{commentsActive
							? "Show less comments"
							: `View all ${comments.length} comments`}
					</div>
				)}
				<div className='comments'>
					{comments.map((comment, index) => {
						if (index < comments.length - 2 && !commentsActive) return null;
						return (
							<Comment
								key={comment.cId}
								accountName={comment.uName}
								comment={comment.text}
							/>
						);
					})}
				</div>
				<div
					className='timeContainer'
					onClick={() => {
						push(`/profile/${accountName}/p/${id}`);
					}}
				>
					<TimePassed createdAt={createdAt} />
				</div>
				<AddComment id={id} p={"posts"} />
			</div>
		</div>
	);
};

export default Post;

import "../../styles/post/post.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectFollowedUsers } from "../../redux/usersSlice";
import axios from "../../axios";

import ProfileComp from "../ProfileComp";
import { ReactComponent as More } from "../../icons/more.svg";
import PostMenu from "./PostMenu";
import Comment from "./Comment";
import AddComment from "./AddComment";
import TimePassed from "./TimePassed";
import PopupTrigger from "../PopupTrigger";

const Post = props => {
	const { id, accountName, uid, image, description, comments, likes, createdAt } = props;
	const [ownerPhoto, setOwnerPhoto] = useState("");
	const [likedUser, setLikedUser] = useState({
		id: "",
		name: "",
		photo: "",
	});
	const [commentsActive, setCommentsActive] = useState(false);

	const fUsers = useSelector(selectFollowedUsers);
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
			const id = likes[likes.length - 2];
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

	return (
		<div className='post'>
			<header>
				<ProfileComp
					key={id}
					postId={id + "p"}
					id={uid}
					iconSize='medium'
					username={accountName}
					showPopup={true}
					image={ownerPhoto.length > 0 ? `http://localhost:5000/uploads/${ownerPhoto}` : ""}
				/>
				<More className='moreBtn' />
			</header>
			<img className='postImage' src={image} alt='post content' />
			<div className='postDesc'>
				<PostMenu id={id} name={accountName} />
				{likes.length > 0 && (
					<div className='likedBy'>
						<span>Liked by </span>
						<span>
							<PopupTrigger
								username={likedUser.name}
								uid={likedUser.id}
								id={id + "lu"}
								hoveredEl={"liked"}
							>
								<span
									className='link'
									onClick={() => {
										push(`/profile/${likedUser.name}`);
									}}
								>
									{likedUser.name}
								</span>
							</PopupTrigger>
						</span>
						{likes.length > 1 && (
							<>
								<span>and </span>
								<span className='link'>{likes.length - 1} others</span>
							</>
						)}
					</div>
				)}
				{description.length > 0 && (
					<div className='postDescription'>
						<PopupTrigger username={accountName} uid={uid} id={id + "des"} hoveredEl={"desc"}>
							<span>{accountName}</span>
						</PopupTrigger>
						{description}
					</div>
				)}
				{comments.length > 2 && (
					<div className='viewComments' onClick={() => setCommentsActive(c => !c)}>
						{commentsActive ? "Show less comments" : `View all ${comments.length} comments`}
					</div>
				)}
				<div className='comments'>
					{comments.map((comment, index) => {
						if (index < comments.length - 2 && !commentsActive) return null;
						return (
							<Comment
								key={comment.cId}
								id={comment.cId}
								uid={comment.uId}
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

import "../../styles/post/post.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectFollowedUsers } from "../../redux/usersSlice";
import axios from "../../axios";

import ProfileComp from "../ProfileComp";
import { ReactComponent as More } from "../../icons/more.svg";
import PostMenu from "./PostMenu";
import Comment from "./Comment";
import AddComment from "./AddComment";

const Post = props => {
	const { id, accountName, uid, image, description, comments, hours, likes } =
		props;

	const [ownerPhoto, setOwnerPhoto] = useState("");
	const [likedUser, setLikedUser] = useState({
		id: "",
		name: "",
		photo: "",
	});
	const [commentsActive, setCommentsActive] = useState(false);

	const fUsers = useSelector(selectFollowedUsers);

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

	return (
		<div className='post'>
			<header>
				<ProfileComp
					iconSize='medium'
					username={accountName}
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
							Liked by <strong>{likedUser.name}</strong>
							{likes.length > 1 && (
								<>
									and <strong>{likes.length - 1} others</strong>
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
				{comments.length > 3 && !commentsActive && (
					<div className='viewComments' onClick={() => setCommentsActive(true)}>
						View all {comments.length} comments
					</div>
				)}
				<div className='comments'>
					{comments.map((comment, index) => {
						if (index < comments.length - 3 && !commentsActive) return null;
						return (
							<Comment
								key={comment.cId}
								accountName={comment.uName}
								comment={comment.text}
							/>
						);
					})}
				</div>
				<div className='timePosted'>{hours} HOURS AGO</div>
				<AddComment id={id} p={"posts"} />
			</div>
		</div>
	);
};

export default Post;

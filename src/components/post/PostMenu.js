import "../../styles/post/postMenu.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as Like } from "../../icons/heart.svg";
import { ReactComponent as LikeActive } from "../../icons/heartActive.svg";
import { ReactComponent as Comment } from "../../icons/comment.svg";
import { ReactComponent as Share } from "../../icons/directShare.svg";
import { ReactComponent as Bookmark } from "../../icons/save.svg";
import { ReactComponent as BookmarkActive } from "../../icons/saveActive.svg";
import { selectUser } from "../../redux/authSlice";
import {
	addLike,
	addLikeAct,
	removeLike,
	removeLikeAct,
	selectActivePost,
	selectPosts,
} from "../../redux/postsSlice";
import axios from "../../axios";

const PostMenu = ({ id, type }) => {
	const [liked, setLiked] = useState(false);
	const [bookmarked, setBookmarked] = useState(false);

	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);
	const aPost = useSelector(selectActivePost);
	const uid = useSelector(selectUser)._id;

	const handleLike = async () => {
		if (type === "pModal") {
			dispatch(addLikeAct({ userId: uid }));
		} else {
			const pidx = posts.findIndex(el => el._id === id);
			if (pidx !== -1) dispatch(addLike({ userId: uid, pidx }));
		}
		await axios.put(`/posts/like/${id}/${uid}`);
	};

	const handleDisLike = async () => {
		if (type === "pModal") {
			dispatch(removeLikeAct({ userId: uid }));
		} else {
			const pidx = posts.findIndex(el => el._id === id);
			if (pidx !== -1) dispatch(removeLike({ userId: uid, pidx }));
		}
		await axios.put(`/posts/dislike/${id}/${uid}`);
	};

	useEffect(() => {
		if (type === "pModal") {
			if (aPost.photo !== undefined) {
				if (aPost.photo.length > 0) {
					let likes = aPost.likes;

					if (likes.length > 0) {
						const findLikeById = likes.filter(like => like === uid).length > 0;
						setLiked(findLikeById);
					}
				}
			}
		} else {
			if (posts.length > 0) {
				let likes = posts.filter(post => post._id === id)[0].likes;

				if (likes.length > 0) {
					const findLikeById = likes.filter(like => like === uid).length > 0;
					setLiked(findLikeById);
				}
			}
		}

		return () => {};
	}, [type, aPost, posts, id, uid]);
	return (
		<div className='postMenu'>
			<div className='interactions'>
				{liked ? (
					<LikeActive
						className='icon'
						onClick={() => {
							handleDisLike();
							setLiked(false);
						}}
						style={{ height: 28 + "px" }}
					/>
				) : (
					<Like
						className='icon'
						onClick={() => {
							handleLike();
							setLiked(true);
						}}
						style={{ height: 28 + "px" }}
					/>
				)}
				<Comment className='icon' />
				<Share className='icon' />
			</div>
			{bookmarked ? (
				<BookmarkActive className='icon' onClick={() => setBookmarked(false)} />
			) : (
				<Bookmark className='icon' onClick={() => setBookmarked(true)} />
			)}
		</div>
	);
};

export default PostMenu;

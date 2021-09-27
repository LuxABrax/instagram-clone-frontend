import "../../styles/post/postMenu.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

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
	addSave,
	addSaveAct,
	removeLike,
	removeLikeAct,
	removeSave,
	removeSaveAct,
	selectActivePost,
	selectPosts,
} from "../../redux/postsSlice";
import axios from "../../axios";

const PostMenu = ({ id, type, name }) => {
	const [liked, setLiked] = useState(false);
	const [likedAnim, setLikedAnim] = useState(false);
	const [bookmarked, setBookmarked] = useState(false);

	const dispatch = useDispatch();
	const { push } = useHistory();
	const posts = useSelector(selectPosts);
	const aPost = useSelector(selectActivePost);
	const uid = useSelector(selectUser)._id;

	const handleLike = async () => {
		setLikedAnim(true);
		setLiked(true);
		if (type === "pModal") {
			dispatch(addLikeAct({ userId: uid }));
		} else {
			const pidx = posts.findIndex(el => el._id === id);
			if (pidx !== -1) dispatch(addLike({ userId: uid, pidx }));
		}
		await axios.put(`/posts/like/${id}/${uid}`);
	};

	const handleDisLike = async () => {
		setLikedAnim(true);
		setLiked(false);
		if (type === "pModal") {
			dispatch(removeLikeAct({ userId: uid }));
		} else {
			const pidx = posts.findIndex(el => el._id === id);
			if (pidx !== -1) dispatch(removeLike({ userId: uid, pidx }));
		}
		await axios.put(`/posts/dislike/${id}/${uid}`);
	};

	const handleSave = async () => {
		if (type === "pModal") {
			dispatch(addSaveAct({ userId: uid }));
		} else {
			const pidx = posts.findIndex(el => el._id === id);
			if (pidx !== -1) dispatch(addSave({ userId: uid, pidx }));
		}
		await axios.put(`/posts/save/${id}/${uid}`);
	};

	const handleUnSave = async () => {
		if (type === "pModal") {
			dispatch(removeSaveAct({ userId: uid }));
		} else {
			const pidx = posts.findIndex(el => el._id === id);
			if (pidx !== -1) dispatch(removeSave({ userId: uid, pidx }));
		}
		await axios.put(`/posts/unsave/${id}/${uid}`);
	};

	useEffect(() => {
		if (type === "pModal") {
			if (aPost.photo !== undefined) {
				if (aPost.photo.length > 0) {
					let likes = aPost.likes;
					let saved = aPost.saved;

					if (likes.length > 0) {
						const findLikeById = likes.filter(like => like === uid).length > 0;
						setLiked(findLikeById);
					}
					if (saved.length > 0) {
						const findSaveById = saved.filter(save => save === uid).length > 0;
						setBookmarked(findSaveById);
					}
				}
			}
		} else {
			if (posts.length > 0) {
				let post = posts.filter(post => post._id === id)[0];
				let likes = post.likes;
				let saved = post.saved;

				if (likes.length > 0) {
					const findLikeById = likes.filter(like => like === uid).length > 0;
					setLiked(findLikeById);
				}
				if (saved.length > 0) {
					const findSaveById = saved.filter(save => save === uid).length > 0;
					setBookmarked(findSaveById);
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
						className={`icon ${likedAnim ? "liked" : ""}`}
						onClick={handleDisLike}
						onAnimationEnd={() => setLikedAnim(false)}
					/>
				) : (
					<Like
						className={`icon ${likedAnim ? "liked" : ""}`}
						onClick={handleLike}
						onAnimationEnd={() => setLikedAnim(false)}
					/>
				)}
				<Comment
					className='icon'
					onClick={() => {
						if (name !== undefined) {
							push(`/profile/${name}/p/${id}`);
						} else {
							document.getElementById(`p${id}`).focus();
						}
					}}
				/>
				<Share className='icon' />
			</div>
			{bookmarked ? (
				<BookmarkActive
					className='icon'
					onClick={() => {
						handleUnSave();
						setBookmarked(false);
					}}
				/>
			) : (
				<Bookmark
					className='icon'
					onClick={() => {
						handleSave();
						setBookmarked(true);
					}}
				/>
			)}
		</div>
	);
};

export default PostMenu;

import "../../styles/post/addComment.scss";
import { useEffect, useState } from "react";
import { ReactComponent as Emoji } from "../../icons/emoji.svg";
import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import axios from "../../axios";
import { addComment, selectPosts } from "../../redux/postsSlice";

const AddComment = ({ id, p }) => {
	const [commentText, setCommentText] = useState("");
	const [len, setLen] = useState(18);
	const [showEmoji, setShowEmoji] = useState(false);

	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const posts = useSelector(selectPosts);

	useEffect(() => {
		if (commentText.length > 400) {
			setLen(108);
		} else if (commentText.length > 280) {
			setLen(90);
		} else if (commentText.length > 210) {
			setLen(72);
		} else if (commentText.length > 140) {
			setLen(54);
		} else if (commentText.length > 70) {
			setLen(36);
		} else {
			setLen(18);
		}
	}, [commentText.length]);

	const handleChange = e => {
		setCommentText(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		let pidx = posts.findIndex(el => el._id === id);
		let cid = Math.floor(Math.random() * 10000 + 100);
		const comm = {
			cid: cid,
			uid: user._id,
			name: user.name,
			text: commentText,
		};
		const res = await axios.put(`/posts/comment/${id}`, comm);
		const data = await res.data;
		if (data.success) {
			setCommentText("");
			dispatch(
				addComment({
					p,
					idx: pidx,
					com: {
						cId: cid,
						uId: user._id,
						uName: user.name,
						text: commentText,
						createdAt: Date.now(),
					},
				})
			);
		}
	};

	const openEmoji = e => {
		setShowEmoji(true);
	};
	const closeEmoji = e => {
		setShowEmoji(false);
	};
	const onEmojiClick = (event, emojiObject) => {
		const newCom = commentText + emojiObject.emoji;
		setCommentText(newCom);
	};

	return (
		<form className='addComment' onSubmit={handleSubmit}>
			{showEmoji && (
				<div className='emojiContainer'>
					<Picker
						onEmojiClick={onEmojiClick}
						disableSearchBar={true}
						groupVisibility={{
							flags: false,
						}}
					/>
					<div className='background' onClick={closeEmoji}></div>
				</div>
			)}
			<Emoji className='icon' onClick={openEmoji} />
			<textarea
				id={`p${id}`}
				style={{ height: `${len}px !important` }}
				className={`commentText h${len} ${
					commentText.length === 0 ? "empty" : ""
				}`}
				placeholder='Add a comment...'
				value={commentText}
				onChange={handleChange}
			/>
			<button
				type='submit'
				className='postText'
				disabled={commentText.length === 0}
			>
				POST
			</button>
		</form>
	);
};

export default AddComment;

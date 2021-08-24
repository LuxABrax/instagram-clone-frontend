import "../../../styles/profile/postModal.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../redux/modalSlice";

import ProfileComp from "../../ProfileComp";
import PostMenu from "../../post/PostMenu";
import Comment from "../../post/Comment";
import AddComment from "../../post/AddComment";
import { ReactComponent as More } from "../../../icons/more.svg";
import axios from "../../../axios";
import { selectActPost, setActivePost } from "../../../redux/usersSlice";

const PostModal = props => {
	const {
		pId,
		accountName,
		image,
		photo,
		comments,
		likedByText,
		likedByNumber,
		hours,
		description,
	} = props;

	const { push } = useHistory();
	const dispatch = useDispatch();

	const aPost = useSelector(selectActPost);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	}, []);

	useEffect(() => {
		const getPost = async () => {
			const { data } = await axios.get(`/posts/${pId}`);
			// console.log("data from modal: ", data.data);
			const gPost = await data.data;
			dispatch(setActivePost(gPost));
		};
		getPost();
		return () => {
			dispatch(setActivePost({ photo: "" }));
		};
	}, []);

	function closeModal() {
		dispatch(toggleModal());
		push(`/profile/${accountName}`);
	}

	return (
		<div className='postModal'>
			<div className='background' onClick={() => closeModal()}></div>
			<div className='modalContent'>
				<img
					className='postImg'
					src={`http://localhost:5000/uploads/posts/${aPost.photo}`}
					alt={aPost.description}
				/>
				<div className='postDesc'>
					<header>
						<ProfileComp
							image={image}
							iconSize='medium'
							username={accountName}
						/>
						<More className='moreBtn' />
					</header>
					<div className='postDescBody'>
						<p>{aPost.description}</p>
						<div className='comments'>
							{comments.map(comment => {
								return (
									<Comment
										key={comment.id}
										accountName={comment.user}
										comment={comment.text}
									/>
								);
							})}
						</div>
						<PostMenu />
						<div className='likedBy'>
							<ProfileComp iconSize='small' hideAccountName={true} />
							<span>
								Liked by <strong>{aPost.name}</strong> and{" "}
								<strong>{likedByNumber} others</strong>
							</span>
						</div>
						<div className='timePosted'>{hours} HOURS AGO</div>
						<AddComment />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostModal;

import "../../../styles/profile/postModal.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../redux/modalSlice";
import { selectActivePost, setActivePost } from "../../../redux/postsSlice";

import ProfileComp from "../../ProfileComp";
import PostMenu from "../../post/PostMenu";
import Comment from "../../post/Comment";
import AddComment from "../../post/AddComment";
import { ReactComponent as More } from "../../../icons/more.svg";
import axios from "../../../axios";

const PostModal = props => {
	const { pId, accountName, image, comments, hours } = props;

	const [likedUser, setLikedUser] = useState({
		id: "",
		name: "def",
		photo: "",
	});

	const { push } = useHistory();
	const dispatch = useDispatch();

	const aPost = useSelector(selectActivePost);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	}, []);

	useEffect(() => {
		const getPost = async () => {
			const { data } = await axios.get(`/posts/${pId}`);
			const gPost = await data.data;
			await dispatch(setActivePost(gPost));
		};

		getPost();

		return () => {
			dispatch(setActivePost({ photo: "" }));
		};
	}, [dispatch, pId]);

	function closeModal() {
		dispatch(toggleModal());
		push(`/profile/${accountName}`);
	}

	useEffect(() => {
		const getPhotoName = async () => {
			if (aPost) {
				const id = aPost.likes[aPost.likes.length - 1];
				const res = await axios.get(`/users/i/${id}`);
				const data = await res.data;
				if (!data.success) {
					console.log("no user");
					return "no user";
				} else {
					setLikedUser({ name: data.data.name, photo: data.data.photo });
				}
			}
		};
		if (aPost.likes !== undefined && aPost.likes.length > 0) {
			getPhotoName();
		}
		return () => {};
	}, [aPost]);

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
						<PostMenu id={aPost._id} type={"pModal"} />
						{aPost.likes !== undefined && aPost.likes.length > 0 && (
							<div className='likedBy'>
								<ProfileComp
									iconSize='small'
									hideAccountName={true}
									image={`http://localhost:5000/uploads/${likedUser.photo}`}
								/>
								<span>
									Liked by <strong>{likedUser.name}</strong>
									{aPost.likes.length > 1 && (
										<>
											and <strong>{aPost.likes.length - 1} others</strong>
										</>
									)}
								</span>
							</div>
						)}

						<div className='timePosted'>{hours} HOURS AGO</div>
						<AddComment />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostModal;

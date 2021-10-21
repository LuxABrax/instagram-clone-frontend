import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../redux/modalSlice";
import { selectUser } from "../../../redux/authSlice";
import { selectActivePost, setActivePost } from "../../../redux/postsSlice";
import useWindowDimensions from "../../../utils/windowHook";
import axios from "../../../axios";
import { useDoubleTap } from "use-double-tap";

import ProfileComp from "../../ProfileComp";
import PostMenu from "../../post/PostMenu";
import Comment from "../../post/Comment";
import TimePassed from "../../post/TimePassed";
import AddComment from "../../post/AddComment";
import { ReactComponent as More } from "../../../icons/more.svg";
import SwipeableViews from "react-swipeable-views";
import AddPostControls from "../AddPostControls";

import "../../../styles/profile/postModal.scss";

const PostModal = ({ pId }) => {
	const [userImage, setUserImage] = useState("");
	const [likedUser, setLikedUser] = useState({
		id: "",
		name: "def",
		photo: "",
	});

	const [bigLiked, setBigLiked] = useState(false);
	const [liked, setLiked] = useState(false);
	const [sendLiked, setSendLiked] = useState(false);
	const [loaded, setLoaded] = useState([false]);
	const [imgPosition, setImgPosition] = useState(0);

	const { push } = useHistory();
	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const aPost = useSelector(selectActivePost);

	const { width } = useWindowDimensions();

	const handleDoubleClick = async () => {
		setBigLiked(true);

		const alreadyLiked = aPost.likes.findIndex(l => l === user._id) !== -1;

		if (alreadyLiked) return;

		setSendLiked(true);
	};

	const bind = useDoubleTap(event => {
		handleDoubleClick();
	});

	function closeModal() {
		dispatch(toggleModal());
		push(`/profile/${aPost.name}`);
	}

	const handleChangeImgPosition = index => {
		setImgPosition(index);
	};

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	}, []);

	useEffect(() => {
		const getPost = async () => {
			const { data } = await axios.get(`/posts/${pId}`);
			const gPost = await data.data;
			let coms = [];
			if (gPost.comments.length > 0)
				coms = gPost.comments.map(c => {
					return JSON.parse(c);
				});
			const post = { ...gPost, comments: coms };
			await dispatch(setActivePost(post));
		};

		getPost();

		return () => {
			dispatch(setActivePost({ photo: "" }));
		};
	}, [dispatch, pId]);

	useEffect(() => {
		const getPhotoName = async uId => {
			if (aPost) {
				let id;
				if (uId !== undefined) {
					id = uId;
				} else if (aPost.likes) {
					id = aPost.likes[aPost.likes.length - 1];
				} else {
					return;
				}
				const res = await axios.get(`/users/i/${id}`);
				const data = await res.data;
				if (!data.success) {
					console.log("no user");
					return "no user";
				} else {
					if (uId !== undefined) {
						setUserImage(data.data.photo);
					} else {
						setLikedUser({ name: data.data.name, photo: data.data.photo });
					}
				}
			}
		};
		getPhotoName(aPost.uId);
		if (aPost.likes !== undefined && aPost.likes.length > 0) {
			getPhotoName();
		}
		return () => {};
	}, [aPost]);

	useEffect(() => {
		if (aPost.isCarousel && loaded.length === 1) {
			setLoaded([false, ...new Array(aPost.photos.length).fill(false)]);
		}
	}, [aPost, loaded.length]);

	return (
		<div className='postModal'>
			<div className='background' onClick={() => closeModal()}></div>
			<div className='modalContent'>
				{width <= 735 && (
					<header>
						{userImage && (
							<ProfileComp
								image={`http://localhost:5000/uploads/${userImage}`}
								iconSize='medium'
								username={aPost.name}
							/>
						)}

						<More className='moreBtn' />
					</header>
				)}
				<div
					className={`postImage-container ${
						loaded.every(l => l === true) ? "" : "skeleton"
					}
          ${loaded[0] ? "" : "size"}
          `}
				>
					{aPost.isCarousel ? (
						<>
							<AddPostControls
								imgPosition={imgPosition}
								setImgPosition={setImgPosition}
								images={[aPost.photo, ...aPost.photos]}
								setImages={false}
								noEdit
							/>
							<SwipeableViews
								index={imgPosition}
								onChangeIndex={handleChangeImgPosition}
								enableMouseEvents
							>
								{[aPost.photo, ...aPost.photos].map((i, idx) => {
									return (
										<img
											className={`postImg ${loaded[idx] ? "" : "hide"}`}
											src={`http://localhost:5000/uploads/posts/${i}`}
											alt={aPost.description}
											onDoubleClick={handleDoubleClick}
											onLoad={() =>
												setLoaded(l => [
													...l.slice(0, idx),
													true,
													...l.slice(idx + 1),
												])
											}
											{...bind}
										/>
									);
								})}
							</SwipeableViews>
						</>
					) : (
						<>
							{aPost.photo && (
								<img
									className={`postImg ${loaded[0] ? "" : "hide skeleton"}`}
									src={`http://localhost:5000/uploads/posts/${aPost.photo}`}
									alt={aPost.description}
									onDoubleClick={handleDoubleClick}
									onLoad={() => setLoaded([true])}
									{...bind}
								/>
							)}
						</>
					)}
					<div className='bigHeart-container'>
						<div
							className={`bigHeart ${bigLiked ? "bigLiked" : ""}`}
							onAnimationEnd={() => setBigLiked(false)}
						></div>
					</div>
				</div>
				<div className='postDesc'>
					{width > 735 && (
						<header>
							{userImage && (
								<ProfileComp
									image={`http://localhost:5000/uploads/${userImage}`}
									iconSize='medium'
									username={aPost.name}
								/>
							)}
							<More className='moreBtn' />
						</header>
					)}

					<div className='postDescBody'>
						{aPost.description && (
							<div className='postDescription'>
								<span>{aPost.name}</span>
								<p>{aPost.description}</p>
							</div>
						)}
						<div className='comments'>
							{aPost.comments !== undefined &&
								aPost.comments.map(comment => {
									return (
										<Comment
											key={comment.cId}
											noPopup
											accountName={comment.uName}
											comment={comment.text}
										/>
									);
								})}
						</div>
						<PostMenu
							id={aPost._id}
							type={"pModal"}
							name={aPost.name}
							bigLiked={bigLiked}
							liked={liked}
							setLiked={setLiked}
							sendLiked={sendLiked}
							setSendLiked={setSendLiked}
						/>
						{aPost.likes !== undefined && aPost.likes.length > 0 && (
							<div className='likedBy'>
								{likedUser.photo && (
									<ProfileComp
										iconSize='small'
										hideAccountName={true}
										image={`http://localhost:5000/uploads/${likedUser.photo}`}
									/>
								)}
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
						<div className='timeContainer'>
							<div className='timePosted'>
								<TimePassed createdAt={aPost.createdAt} />
							</div>
						</div>
						<AddComment id={aPost._id} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostModal;

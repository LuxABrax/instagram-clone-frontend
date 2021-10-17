import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { selectFollowedUsers, selectUserProfile } from "../../redux/usersSlice";
import { selectPosts } from "../../redux/postsSlice";
import axios from "../../axios";
import { useDoubleTap } from "use-double-tap";

import ProfileComp from "../ProfileComp";
import { ReactComponent as More } from "../../icons/more.svg";
import PostMenu from "./PostMenu";
import Comment from "./Comment";
import AddComment from "./AddComment";
import TimePassed from "./TimePassed";
import PopupTrigger from "../PopupTrigger";

import "../../styles/post/post.scss";

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

	const [loaded, setLoaded] = useState(false);
	const [ownerPhoto, setOwnerPhoto] = useState("");
	const [commentsActive, setCommentsActive] = useState(false);
	const [likedUser, setLikedUser] = useState({
		id: "",
		name: "",
		photo: "",
	});
	const [bigLiked, setBigLiked] = useState(false);
	const [liked, setLiked] = useState(false);
	const [sendLiked, setSendLiked] = useState(false);

	const user = useSelector(selectUser);
	const userProfile = useSelector(selectUserProfile);
	const fUsers = useSelector(selectFollowedUsers);
	const posts = useSelector(selectPosts);

	const { push } = useHistory();

	const handleDoubleClick = async () => {
		setBigLiked(true);

		const pidx = posts.findIndex(el => el._id === id);

		const alreadyLiked =
			posts[pidx].likes.findIndex(l => l === user._id) !== -1;

		if (alreadyLiked) return;

		setSendLiked(true);
	};

	const bind = useDoubleTap(event => {
		handleDoubleClick();
	});

	useEffect(() => {
		const getPhoto = async () => {
			const users = [...fUsers, userProfile, user];
			users.filter((u, i) => users.indexOf(u) === i);

			const postUser = users.filter(u => u._id === uid);

			if (postUser[0] !== undefined) setOwnerPhoto(postUser[0].photo);
		};
		if (fUsers.length > 0) getPhoto();
	}, [fUsers, user, userProfile, uid]);

	useEffect(() => {
		const getLikedUser = async () => {
			const id =
				likes.length > 1 ? likes[likes.length - 2] : likes[likes.length - 1];
			const res = await axios.get(`/users/i/${id}`);
			const data = await res.data;
			if (!data.success) {
				console.log("no user");
			} else {
				setLikedUser({ id: id, name: data.data.name, photo: data.data.photo });
			}
		};
		if (likes !== undefined && likes.length > 0) {
			getLikedUser();
		}
	}, [likes]);

	return (
		<div className='post'>
			<header className='post-header'>
				<ProfileComp
					key={id}
					popupKey={id + "p"}
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
			<div className='postImage-container'>
				{loaded ? null : <div className='postImage skeleton' />}
				<img
					className='postImage'
					src={image}
					alt='post content'
					style={loaded ? {} : { display: "none" }}
					onLoad={() => {
						setLoaded(true);
					}}
					onDoubleClick={handleDoubleClick}
					{...bind}
				/>
				<div className='bigHeart-container'>
					<div
						className={`bigHeart ${bigLiked ? "bigLiked" : ""}`}
						onAnimationEnd={() => setBigLiked(false)}
					></div>
				</div>
			</div>
			<div className='postDesc'>
				<PostMenu
					id={id}
					name={accountName}
					bigLiked={bigLiked}
					liked={liked}
					setLiked={setLiked}
					sendLiked={sendLiked}
					setSendLiked={setSendLiked}
				/>
				{likes.length > 0 && (
					<div className='likedBy'>
						<span>Liked by </span>
						<span>
							<PopupTrigger
								username={likedUser.name}
								uid={likedUser.id}
								popupKey={id + "lu"}
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
						<PopupTrigger
							username={accountName}
							uid={uid}
							popupKey={id + "des"}
							hoveredEl={"desc"}
						>
							<span>{accountName}</span>
						</PopupTrigger>
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

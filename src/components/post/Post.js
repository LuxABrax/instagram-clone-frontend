import "../../styles/post/post.scss";

import ProfileComp from "../ProfileComp";
import { ReactComponent as More } from "../../icons/more.svg";
import PostMenu from "./PostMenu";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { useEffect, useState } from "react";
import axios from "../../axios";
const Post = props => {
	const { id, accountName, image, comments, hours, likes } = props;

	const [likedUser, setLikedUser] = useState({
		id: "",
		name: "",
		photo: "",
	});

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
				<ProfileComp iconSize='medium' username={accountName} />
				<More className='moreBtn' />
			</header>
			<img className='postImage' src={image} alt='post content' />
			<div className='postDesc'>
				<PostMenu id={id} />
				{likes.length > 0 && (
					<div className='likedBy'>
						<ProfileComp
							iconSize='small'
							hideAccountName={true}
							image={`http://localhost:5000/uploads/${likedUser.photo}`}
						/>
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
				<div className='timePosted'>{hours} HOURS AGO</div>
				<AddComment />
			</div>
		</div>
	);
};

export default Post;

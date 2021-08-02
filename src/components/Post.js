import React from "react";
import "../styles/post.scss";
import { ReactComponent as More } from "../icons/more.svg";
import { ReactComponent as Emoji } from "../icons/emoji.svg";
import ProfileComp from "./ProfileComp";
import Comment from "./Comment";
import PostMenu from "./PostMenu";
const Post = props => {
	const { accountName, image, comments, likedByText, likedByNumber, hours } =
		props;

	return (
		<div className='post'>
			<header>
				<ProfileComp iconSize='medium' username={accountName} />
				<More className='moreBtn' />
			</header>
			<img className='postImage' src={image} alt='post content' />
			<div className='postDesc'>
				<PostMenu />
				<div className='likedBy'>
					<ProfileComp iconSize='small' hideAccountName={true} />
					<span>
						Liked by <strong>{likedByText}</strong> and{" "}
						<strong>{likedByNumber} others</strong>
					</span>
				</div>
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
				<div className='addComment'>
					<Emoji className='icon' />
					<div className='commentText'>Add a comment...</div>
					<div className='postText'>POST</div>
				</div>
			</div>
		</div>
	);
};

export default Post;

import "../../styles/post/post.scss";

import ProfileComp from "../ProfileComp";
import { ReactComponent as More } from "../../icons/more.svg";
import PostMenu from "./PostMenu";
import Comment from "./Comment";
import AddComment from "./AddComment";

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
				<AddComment />
			</div>
		</div>
	);
};

export default Post;

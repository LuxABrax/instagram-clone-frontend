import "../../styles/feed/feed.scss";
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/usersSlice";

import Stories from "./Stories";
import Post from "../post/Post";
import comments from "../../data/comments.js";

const Feed = () => {
	const posts = useSelector(selectPosts);

	return (
		<div className='feed'>
			<Stories />
			{posts.length > 0 &&
				posts.map(post => {
					return (
						<Post
							key={post._id}
							accountName={post.name}
							storyBorder={true}
							image={`http://localhost:5000/uploads/posts/${post.photo}`}
							comments={comments[0].comments}
							likedByText='breskvica'
							likedByNumber={post.likes.length}
							hours={2}
						/>
					);
				})}
		</div>
	);
};

export default Feed;

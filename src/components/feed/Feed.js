import "../../styles/feed/feed.scss";
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/postsSlice";

import Stories from "./Stories";
import Post from "../post/Post";

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
							id={post._id}
							uid={post.uId}
							accountName={post.name}
							description={post.description}
							storyBorder={true}
							image={`http://localhost:5000/uploads/posts/${post.photo}`}
							comments={post.comments}
							likes={post.likes}
							createdAt={post.createdAt}
						/>
					);
				})}
		</div>
	);
};

export default Feed;

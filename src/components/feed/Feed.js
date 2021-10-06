import "../../styles/feed/feed.scss";
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/postsSlice";

import Stories from "./Stories";
import Post from "../post/Post";

const Feed = ({ withStories, posts }) => {
	const allPosts = useSelector(selectPosts);

	let feedPosts = [];
	if (posts === undefined) {
		feedPosts = allPosts;
	} else {
		feedPosts = posts;
	}

	console.log("posts: ", posts);
	return (
		<div className={`feed ${posts === undefined ? "" : "onProfile"}`}>
			{withStories && <Stories />}
			{feedPosts.length > 0 &&
				feedPosts.map(post => {
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

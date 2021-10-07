import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts, selectPosts } from "../../redux/postsSlice";

import Stories from "./Stories";
import Post from "../post/Post";

import "../../styles/feed/feed.scss";

const Feed = ({ withStories, onProfile, uId }) => {
	const posts = useSelector(selectPosts);

	const dispatch = useDispatch();

	useEffect(() => {
		if (onProfile) dispatch(getUserPosts(uId));
	}, [onProfile, dispatch, uId]);

	return (
		<div className={`feed ${onProfile ? "onProfile" : ""}`}>
			{withStories && <Stories />}
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

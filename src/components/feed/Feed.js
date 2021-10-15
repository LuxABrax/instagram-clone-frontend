import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserPosts, selectPosts } from "../../redux/postsSlice";

import Stories from "./Stories";
import Post from "../post/Post";

import "../../styles/feed/feed.scss";
import SuggestedUsers from "./SuggestedUsers";

const Feed = ({ withStories, onProfile, uId }) => {
	const posts = useSelector(selectPosts);

	const dispatch = useDispatch();

	useEffect(() => {
		if (onProfile) dispatch(getUserPosts(uId));
	}, [onProfile, dispatch, uId]);

	return (
		<div className={`feed ${onProfile ? "onProfile" : ""}`}>
			{withStories && <Stories key='stories' />}
			{posts.length > 0 &&
				posts.map((post, index) => {
					return (
						<React.Fragment key={post._id}>
							{index === 3 && !onProfile ? <SuggestedUsers key='sug' /> : null}
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
						</React.Fragment>
					);
				})}
		</div>
	);
};

export default Feed;

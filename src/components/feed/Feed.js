import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserPosts, selectPosts } from "../../redux/postsSlice";
import { selectModalActive, selectModalName } from "../../redux/modalSlice";

import Stories from "./Stories";
import Post from "../post/Post";
import SuggestedUsers from "./SuggestedUsers";
import LikedModal from "./LikedModal";

import "../../styles/feed/feed.scss";

const Feed = ({ withStories, onProfile, uId }) => {
	const posts = useSelector(selectPosts);
	let modalActive = useSelector(selectModalActive);
	let modalName = useSelector(selectModalName);

	const dispatch = useDispatch();

	useEffect(() => {
		if (onProfile) dispatch(getUserPosts(uId));
	}, [onProfile, dispatch, uId]);

	return (
		<div className={`feed ${onProfile ? "onProfile" : ""}`}>
			{withStories && <Stories key='stories' />}
			{modalName === "likes" && modalActive && <LikedModal />}
			{posts.length > 0 &&
				posts.map((post, index) => {
					return (
						<React.Fragment key={post._id}>
							{index === 3 && !onProfile ? <SuggestedUsers key='sug' /> : null}
							<Post key={post._id} post={post} />
						</React.Fragment>
					);
				})}
		</div>
	);
};

export default Feed;

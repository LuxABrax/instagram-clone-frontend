import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import { changePage, selectPage } from "../redux/navigationSlice";
import { getExplorePosts } from "../redux/postsSlice";
import useSortToRows from "../utils/useSortToRows";

import ExploreImage from "../components/ExploreImage";

import "../styles/pages/explore.scss";

const Explore = () => {
	const [postRows, setPosts] = useSortToRows();

	const activePage = useSelector(selectPage);
	const user = useSelector(selectUser);
	const posts = useSelector(state => state.posts.explorePosts);

	const dispatch = useDispatch();

	useEffect(() => {
		if (activePage !== "explore") dispatch(changePage("explore"));
	}, [dispatch, activePage]);

	useEffect(() => {
		if (posts.length === 0) dispatch(getExplorePosts(user._id));
	}, [dispatch, user._id, posts.length]);

	useEffect(() => {
		if (posts.length > 0) setPosts(posts);
	}, [posts, setPosts]);

	const checkIfBig = index => {
		return index === 0 || (index + 1) % 6 === 0;
	};

	return (
		<div className='explore'>
			{postRows.map((row, index) => {
				return (
					<div className={`expRow ${checkIfBig(index) ? "withBig" : ""}`}>
						{row.map((post, idx) => {
							if (post.photo === "empty") return null;
							return (
								<ExploreImage
									idx={idx}
									photo={post.photo}
									id={post._id}
									likes={post.likes.length}
									comments={post.comments.length}
									isBig={checkIfBig(index) && idx === 0}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Explore;

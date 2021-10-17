import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import { changePage, selectPage } from "../redux/navigationSlice";
import { getExplorePosts } from "../redux/postsSlice";

import ExploreImage from "../components/ExploreImage";

import "../styles/pages/explore.scss";

const Explore = () => {
	const [postRows, setPostRows] = useState([]);

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
		const sortPosts = () => {
			const sPosts = [];

			let len = posts.length;
			let rowNum = Math.ceil(len / 3);
			let emptyNum = rowNum * 3 - len;
			let totalNum = len + emptyNum;

			let arr = [];
			let j = 0;
			for (let i = 0; i < totalNum; i++) {
				if (i < len) {
					arr.push(posts[i]);
				} else {
					arr.push({ _id: `${i}empty`, photo: "empty" });
				}
				j++;

				if (j === 3) {
					sPosts.push(arr);
					arr = [];
					j = 0;
				}
				if (i === totalNum) sPosts.push(arr);
			}

			setPostRows(sPosts);
		};

		if (posts.length > 0) sortPosts();
	}, [posts]);

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

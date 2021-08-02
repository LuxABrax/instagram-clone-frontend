import React from "react";
import Post from "../components/post/Post";
import comments from "../data/comments.js";
import "../styles/feed.scss";

const Profile = () => {
	return (
		<div>
			<h1>Profile Page</h1>
			<div className='feed' style={{ margin: "auto" }}>
				<Post
					accountName='luxabrax'
					storyBorder={true}
					image='https://picsum.photos/600'
					comments={comments[0].comments}
					likedByText='breskvica'
					likedByNumber={1929}
					hours={2}
				/>
				<Post
					accountName='luxabrax'
					storyBorder={false}
					image='https://picsum.photos/800'
					comments={comments[1].comments}
					likedByText='luxabrax'
					likedByNumber={279}
					hours={16}
				/>
				<Post
					accountName='luxabrax'
					storyBorder={true}
					image='https://picsum.photos/800/1000'
					comments={comments[2].comments}
					likedByText='somebody'
					likedByNumber={9}
					hours={23}
				/>
			</div>
		</div>
	);
};

export default Profile;

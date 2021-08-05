import "../../styles/feed/feed.scss";
import Stories from "./Stories";
import Post from "../post/Post";
import comments from "../../data/comments.js";

const Feed = () => {
	return (
		<div className='feed'>
			<Stories />
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
	);
};

export default Feed;

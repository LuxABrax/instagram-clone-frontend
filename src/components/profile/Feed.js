import "../../styles/pages/profile.scss";
import Header from "./Header";
import FeedMenu from "./FeedMenu";
import Post from "../post/Post";

import comments from "../../data/comments.js";
import luka from "../../icons/luka.jpg";

const Feed = props => {
	return (
		<div className='profFeed'>
			<Header
				image={luka}
				accountName={"lux_abrax"}
				fullName='Luka'
				description='Self-taught programmer wannabe, stuck with making the most complex clone a beginner can do. Crazy man'
				postNumber={27}
				followers={79}
				following={79}
			/>
			<FeedMenu />
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

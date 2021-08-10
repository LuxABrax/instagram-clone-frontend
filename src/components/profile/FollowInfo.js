import "../../styles/profile/followInfo.scss";

const FollowInfo = props => {
	const { posts, followers, following } = props;

	return (
		<ul className='followInfoComp'>
			<li>
				<div className='info'>{posts}</div>
				<div className='infoName'>{posts > 1 ? " posts" : " post"}</div>
			</li>
			<li>
				<div className='info'>{followers}</div>
				<div className='infoName'>
					{followers > 1 ? " followers" : " follower"}
				</div>
			</li>
			<li>
				<div className='info'>{following}</div>
				<div className='infoName'>following</div>
			</li>
		</ul>
	);
};

export default FollowInfo;

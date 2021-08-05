import "../../styles/profile/followInfo.scss";

const FollowInfo = props => {
	const { posts, followers, following } = props;

	return (
		<ul className='followInfoComp'>
			<li>
				<div className='infoName'>Posts:</div>
				<div className='info'>{posts}</div>
			</li>
			<li>
				<div className='infoName'>Followers:</div>
				<div className='info'>{followers}</div>
			</li>
			<li>
				<div className='infoName'>Following</div>
				<div className='info'>{following}</div>
			</li>
		</ul>
	);
};

export default FollowInfo;

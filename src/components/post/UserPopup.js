import "../../styles/post/userPopup.scss";

import FollowInfo from "../profile/FollowInfo";
import ProfileIcon from "../ProfileIcon";

const UserPopup = () => {
	const image = "http://localhost:5000/uploads/no-photo.jpg";
	const accountName = "test.user";
	const fullName = "Test Name";
	const postNumber = 11;
	const followers = 100;
	const following = 200;

	return (
		<div className='userPopup'>
			<header>
				<div className='profIcon'>
					<ProfileIcon image={image} iconSize='xBig' />
				</div>
				<div className='profInfo'>
					<div className='title'>
						<h2>{accountName}</h2>
					</div>
					<div className='desc'>
						<div className='fullName'>
							<strong>{fullName}</strong>
						</div>
					</div>
				</div>
			</header>
			<FollowInfo
				posts={postNumber}
				followers={followers}
				following={following}
			/>
			<div className='imageDisplay'>
				<img src={image} />
				<img src={image} />
				<img src={image} />
			</div>
			<div className='popupBtns'>
				<button>Message</button>
				<button>Following</button>
			</div>
		</div>
	);
};

export default UserPopup;

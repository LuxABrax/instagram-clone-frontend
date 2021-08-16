import "../../styles/profile/header.scss";
import useWindowDimensions from "../../utils/windowHook";

import ProfileIcon from "../ProfileIcon";
import { ReactComponent as More } from "../../icons/more.svg";
import FollowInfo from "./FollowInfo";
import ProfileMenu from "./ProfileMenu";

const Header = props => {
	const {
		image,
		accountName,
		fullName,
		description,
		postNumber,
		followers,
		following,
		changeImg,
	} = props;
	const { width } = useWindowDimensions();
	console.log(width);

	return (
		<div className='profHeader'>
			<header>
				<div className='profIcon'>
					<ProfileIcon
						image={image}
						iconSize={width < 736 ? "xBig" : "xxBig"}
						onClick={changeImg}
					/>
				</div>
				<div className='profInfo'>
					{width >= 736 ? (
						<>
							<div className='title'>
								<h2>{accountName}</h2>
								<ProfileMenu />

								<More className='moreIcon' />
							</div>
							<div className='followInfo'>
								<span>
									<strong>{postNumber}</strong>
									{postNumber > 1 ? " posts" : " post"}
								</span>
								<span>
									<strong>{followers}</strong>
									{followers > 1 ? " followers" : " follower"}
								</span>
								<span>
									<strong>{following}</strong> following
								</span>
							</div>
							<div className='desc'>
								<div className='fullName'>
									<strong>{fullName}</strong>
								</div>
								<div className='description'>{description}</div>
							</div>
						</>
					) : (
						<>
							<div className='title'>
								<h2>{accountName}</h2>
								<More className='moreIcon' />
							</div>
							<ProfileMenu />
						</>
					)}
				</div>
			</header>
			{width < 736 && (
				<div className='underHeader'>
					<div className='desc'>
						<div className='fullName'>
							<strong>{fullName}</strong>
						</div>
						<div className='description'>{description}</div>
					</div>
					<div className='followInfo2'>
						<FollowInfo
							posts={postNumber}
							followers={followers}
							following={following}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;

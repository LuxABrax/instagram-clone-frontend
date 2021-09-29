import useWindowDimensions from "../../utils/windowHook";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/modalSlice";

import ProfileIcon from "../ProfileIcon";
import { ReactComponent as More } from "../../icons/more.svg";
import { ReactComponent as Cog } from "../../icons/cog.svg";
import FollowInfo from "./FollowInfo";
import ProfileMenu from "./ProfileMenu";

import "../../styles/profile/header.scss";

const Header = props => {
	const {
		image,
		id,
		accountName,
		fullName,
		description,
		postNumber,
		followers,
		following,
		changeImg,
	} = props;
	const { width } = useWindowDimensions();

	const dispatch = useDispatch();
	const { name } = useSelector(state => state.auth.user);

	function showFollowers() {
		dispatch(toggleModal("followers"));
	}
	function showFollowing() {
		dispatch(toggleModal("following"));
	}

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
								<ProfileMenu id={id} />
								{name === accountName ? (
									<Cog className='moreIcon' />
								) : (
									<More className='moreIcon' />
								)}
							</div>
							<div className='followInfo'>
								<span>
									<strong>{postNumber}</strong>
									{postNumber > 1 || postNumber === 0 ? " posts" : " post"}
								</span>
								<span className='f' onClick={showFollowers}>
									<strong>{followers}</strong>
									{followers > 1 ? " followers" : " follower"}
								</span>
								<span className='f' onClick={showFollowing}>
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
								{name === accountName ? (
									<Cog className='moreIcon' />
								) : (
									<More className='moreIcon' />
								)}
							</div>
							<ProfileMenu id={id} />
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
						<FollowInfo posts={postNumber} followers={followers} following={following} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;

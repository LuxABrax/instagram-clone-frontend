import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/modalSlice";
import "../../styles/profile/followInfo.scss";

const FollowInfo = props => {
	const { posts, followers, following, isPopup = false } = props;
	const dispatch = useDispatch();

	return (
		<ul className='followInfoComp'>
			<li>
				<div className='info'>{posts}</div>
				<div className='infoName'>{posts > 1 ? " posts" : " post"}</div>
			</li>
			<li
				className='b'
				onClick={() => {
					if (!isPopup) dispatch(toggleModal("followers"));
				}}
			>
				<div className='info'>{followers}</div>
				<div className='infoName'>
					{followers > 1 ? " followers" : " follower"}
				</div>
			</li>
			<li
				className='b'
				onClick={() => {
					if (!isPopup) dispatch(toggleModal("following"));
				}}
			>
				<div className='info'>{following}</div>
				<div className='infoName'>following</div>
			</li>
		</ul>
	);
};

export default FollowInfo;

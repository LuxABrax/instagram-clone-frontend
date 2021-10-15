import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../../redux/authSlice";
import { followUserWithID } from "../../redux/usersSlice";

import { ReactComponent as Close } from "../../icons/close.svg";

import "../../styles/feed/suggestedUser.scss";

const SuggestedUser = ({ id, username, name, image, caption, removeFromS }) => {
	const [following, setFollowing] = useState(false);

	const user = useSelector(selectUser);

	const dispatch = useDispatch();
	const { push } = useHistory();

	function gotoProfile() {
		push(`/profile/${username}`);
	}

	function handleFollow() {
		dispatch(followUserWithID({ userId: user._id, followId: id }));
		setFollowing(f => !f);
	}
	return (
		<div className='suggestedUser'>
			<Close className='icon' onClick={() => removeFromS(id)} />
			<div className='suggestedImg'>
				<img
					src={`http://localhost:5000/uploads/${image}`}
					onClick={gotoProfile}
					alt={name}
				/>
			</div>

			<div className='userName' onClick={gotoProfile}>
				<p>{name}</p>
			</div>
			<div className='followedBy'>
				<p>{caption}</p>
			</div>
			<button
				className={`flwBtn ${following ? "" : "flw"}`}
				onClick={handleFollow}
			>
				{following ? "Following" : "Follow"}
			</button>
		</div>
	);
};

export default SuggestedUser;

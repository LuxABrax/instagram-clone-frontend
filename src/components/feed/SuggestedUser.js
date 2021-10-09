import { useState } from "react";
import { useHistory } from "react-router";

import { ReactComponent as Close } from "../../icons/close.svg";

import "../../styles/feed/suggestedUser.scss";

const SuggestedUser = () => {
	const [following, setFollowing] = useState(false);

	const { push } = useHistory();

	function gotoProfile() {
		push(`/profile/${"luka99"}`);
	}

	function handleFollow() {
		setFollowing(f => !f);
	}
	return (
		<div className='suggestedUser'>
			<Close className='icon' />
			<div className='suggestedImg'>
				<img
					src={`http://localhost:5000/uploads/${"no-photo.jpg"}`}
					onClick={gotoProfile}
				/>
			</div>

			<div className='userName' onClick={gotoProfile}>
				<p>Exampeleeee username</p>
			</div>
			<div className='followedBy'>
				<p>Followed by num num num</p>
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

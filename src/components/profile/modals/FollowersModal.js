import "../../../styles/profile/changeImg.scss";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Modal from "./Modal";
import {
	selectFollowedUsers,
	selectFollowingUsers,
	selectNotFollowedUsers,
} from "../../../redux/usersSlice";

import FollowersItem from "../FollowersItem";

const FollowersModal = ({ id, type, uId, btnType }) => {
	const [fws, setFws] = useState([]);
	const followers = useSelector(selectFollowedUsers);
	const following = useSelector(selectFollowingUsers);
	const notFollowed = useSelector(selectNotFollowedUsers);

	useEffect(() => {
		if (type === "following" && followers.length > 0 && fws.length === 0) {
			setFws([...followers]);
			// console.log("fws:", fws);
		} else if (
			type === "followers" &&
			following.length > 0 &&
			fws.length === 0
		) {
			// console.log(following);
			setFws([...following]);
		}
	}, [type, followers, fws, following, notFollowed, btnType]);
	return (
		<Modal>
			<div className='modalContent'>
				<div className='modalTitle'>
					<h3 style={{ height: 42 + "px" }}>
						{type === "followers" ? "Followers" : "Following"}
					</h3>
				</div>
				<ul style={{ overflowY: "scroll", height: 358 + "px" }}>
					{fws.map((el, idx) => {
						return (
							<FollowersItem
								key={idx}
								follower={el}
								id={id}
								btnType={btnType}
								fType={type}
							/>
						);
					})}
				</ul>
			</div>
		</Modal>
	);
};

export default FollowersModal;

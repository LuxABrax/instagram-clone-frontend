import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { selectModalActive } from "../../redux/modalSlice";
import {
	selectNotFollowedUsers,
	selectUnFollowUser,
} from "../../redux/usersSlice";

import "../../styles/profile/followersItem.scss";

const FollowBtn = ({ follower, id, btnType }) => {
	const [btnType, setBtnType] = useState({ btnType });
	const [following, setFollowing] = useState(false);

	const { _id, pName, photo } = follower;
	// const {pName} = useParams();
	const { push } = useHistory();
	const dispatch = useDispatch();

	const notFollowed = useSelector(selectNotFollowedUsers);
	const unFollowUser = useSelector(selectUnFollowUser);
	const modalActive = useSelector(selectModalActive);

	const handleButton = () => {};

	return <button className={``} onClick={handleButton}></button>;
};

export default FollowBtn;

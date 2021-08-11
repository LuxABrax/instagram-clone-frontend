import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import {
	getFollowedUsers,
	getNotFollowedUsers,
	selectNotFollowedUsers,
	getFollowingUsers,
} from "../../redux/usersSlice";
import "../../styles/sidebar/suggestions.scss";
import ProfileComp from "../ProfileComp";

const Suggestions = () => {
	const [suggestions, setSuggestions] = useState([]);
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const userId = user._id;
	const nfUsers = useSelector(selectNotFollowedUsers);

	// console.log(nfUsers);
	// nfUsers.sort(() => (Math.random() > 0.5 ? 1 : -1));
	// console.log(nfUsers);
	// // const nUsers = nfUsers.splice(0, 5);
	// // console.log(nUsers);

	// setSuggestions(nfUsers);
	// console.log("suggestions", suggestions);

	useEffect(() => {
		console.log(userId);
		dispatch(getNotFollowedUsers(userId));
	}, [dispatch, userId]);
	return (
		<div className='suggestions'>
			<button
				onClick={() => {
					dispatch(getFollowedUsers(userId));
				}}
			>
				followed
			</button>
			<button
				onClick={() => {
					dispatch(getFollowingUsers(userId));
				}}
			>
				following
			</button>
			<div className='titleContainer'>
				<div className='title'>Suggestions For You</div>
				<a href='/'>See All</a>
			</div>
			{suggestions.length > 0 &&
				suggestions.map(suggestedUser => {
					return (
						<ProfileComp
							username={suggestedUser.username}
							caption='Followed by marko123 + 3 more'
							urlText='Follow'
							iconSize='medium'
							captionSize='small'
							storyBorder={false}
						/>
					);
				})}
			<ProfileComp
				caption='Followed by marko123 + 3 more'
				urlText='Follow'
				iconSize='medium'
				captionSize='small'
				storyBorder={true}
			/>
			<ProfileComp
				caption='Followed by romaleromali + 23 more'
				urlText='Follow'
				iconSize='medium'
				captionSize='small'
				storyBorder={false}
			/>
			<ProfileComp
				caption='Followed by ivan_ivic + 13 more'
				urlText='Follow'
				iconSize='medium'
				captionSize='small'
				storyBorder={false}
			/>
			<ProfileComp
				caption='Followed by richwebdeveloper + 1.050 more'
				urlText='Follow'
				iconSize='medium'
				captionSize='small'
				storyBorder={true}
			/>
			<ProfileComp
				caption='Followed by ivan_ivic + 13 more'
				urlText='Follow'
				iconSize='medium'
				captionSize='small'
				storyBorder={false}
			/>
		</div>
	);
};

export default Suggestions;

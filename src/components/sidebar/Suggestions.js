import "../../styles/sidebar/suggestions.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";

import ProfileComp from "../ProfileComp";
import {
	followUserWithID,
	getNotFollowedUsers,
	setIsCreated,
	// setSuggestions,
} from "../../redux/usersSlice";
import { useState } from "react";

const Suggestions = () => {
	const user = useSelector(selectUser);
	const users = useSelector(state => state.users.notFollowedUsers);
	const noUsers = useSelector(state => state.users.noUsersToFollow);

	const dispatch = useDispatch();

	const [suggestions, setSuggestions] = useState([]);
	if (users.length === 0 && !noUsers) dispatch(getNotFollowedUsers(user._id));
	if (users.length > 0 && suggestions.length === 0) {
		// dispatch(getNotFollowedUsers(user._id));
		setSuggestions([...users]);
	}

	const followUser = uId2 => {
		console.log(user._id, " followUser ", uId2);
		dispatch(followUserWithID({ userId: user._id, followId: uId2 }));
		// const arr = suggestions.filter(s => s._id !== uId2);
		// dispatch(([...arr]));
		if (suggestions.length === 1) {
			setSuggestions(suggestions.pop());
			console.log(suggestions);
		} else {
			setSuggestions(suggestions => {
				return suggestions.filter(el => el._id !== uId2);
			});
			dispatch(setIsCreated(false));
		}
	};

	return (
		<div className='suggestions'>
			<div className='titleContainer'>
				<div className='title'>Suggestions For You</div>
				<a href='/'>See All</a>
			</div>
			{suggestions.length > 0 &&
				suggestions.map((suggestedUser, i) => {
					if (i < 5)
						return (
							<ProfileComp
								key={suggestedUser._id}
								id={suggestedUser._id}
								username={suggestedUser.name}
								image={`http://localhost:5000/uploads/${suggestedUser.photo}`}
								caption={`Followed by ${suggestedUser.followers} followers`}
								urlText='Follow'
								iconSize='medium'
								captionSize='small'
								storyBorder={false}
								followUser={followUser}
							/>
						);
					return null;
				})}
		</div>
	);
};

export default Suggestions;

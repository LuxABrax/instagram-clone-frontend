import "../../styles/sidebar/suggestions.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";

import ProfileComp from "../ProfileComp";
import { followUserWithID } from "../../redux/usersSlice";

const Suggestions = () => {
	const user = useSelector(selectUser);
	const suggestions = useSelector(state => state.users.suggestions);

	const dispatch = useDispatch();

	const followUser = uId2 => {
		console.log(user._id, " followUser ", uId2);
		dispatch(followUserWithID({ userId: user._id, followId: uId2 }));
	};

	return (
		<div className='suggestions'>
			{/* <button
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
			</button> */}
			<div className='titleContainer'>
				<div className='title'>Suggestions For You</div>
				<a href='/'>See All</a>
			</div>
			{suggestions.map(suggestedUser => {
				return (
					<ProfileComp
						key={suggestedUser._id}
						id={suggestedUser._id}
						username={suggestedUser.name}
						caption={`Followed by ${suggestedUser.followers} followers`}
						urlText='Follow'
						iconSize='medium'
						captionSize='small'
						storyBorder={false}
						followUser={followUser}
					/>
				);
			})}
			{/* <ProfileComp
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
			/> */}
		</div>
	);
};

export default Suggestions;

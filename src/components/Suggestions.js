import React from "react";
import "../styles/suggestions.scss";
import ProfileComp from "./ProfileComp";

const Suggestions = () => {
	return (
		<div className='suggestions'>
			<div className='titleContainer'>
				<div className='title'>Suggestions For You</div>
				<a href='/'>See All</a>
			</div>
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

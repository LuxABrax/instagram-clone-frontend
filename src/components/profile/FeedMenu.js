import "../../styles/profile/feedMenu.scss";
import { useState, useEffect } from "react";

import { ReactComponent as Posts } from "../../icons/profileFeedTab/posts.svg";
// import { ReactComponent as IGTV } from "../../icons/profileFeedTab/igtv.svg";
import { ReactComponent as Saved } from "../../icons/profileFeedTab/saved.svg";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../redux/usersSlice";
import { useHistory, useLocation } from "react-router";
// import { ReactComponent as Tagged } from "../../icons/profileFeedTab/tagged.svg";

const FeedMenu = ({ showSaved, showPosts, isOwner }) => {
	const [activeTab, setActiveTab] = useState("posts");
	const user = useSelector(selectUserProfile);

	const { push } = useHistory();
	let location = useLocation();

	useEffect(() => {
		if (location.pathname === `/profile/${user.name}/saved`) {
			setActiveTab("saved");
		} else {
			setActiveTab("posts");
		}
	}, [location.pathname, user.name]);
	return (
		<div className='feedMenu'>
			<div
				className={`tab ${activeTab === "posts" ? "active" : ""}`}
				onClick={() => {
					setActiveTab("posts");
					push(`/profile/${user.name}`);
					showPosts();
				}}
			>
				<Posts className='icon' />
				<p>POSTS</p>
			</div>
			{/* <div
				className={`tab ${activeTab === "igtv" ? "active" : ""}`}
				onClick={() => {
					setActiveTab("igtv");
				}}
			>
				<IGTV className='icon' />
				<p>IGTV</p>
			</div> */}
			{isOwner && (
				<div
					className={`tab ${activeTab === "saved" ? "active" : ""}`}
					onClick={() => {
						setActiveTab("saved");
						push(`/profile/${user.name}/saved`);
						showSaved();
					}}
				>
					<Saved className='icon' />
					<p>SAVED</p>
				</div>
			)}

			{/* <div
				className={`tab ${activeTab === "tagged" ? "active" : ""}`}
				onClick={() => {
					setActiveTab("tagged");
				}}
			>
				<Tagged className='icon' />
				<p>TAGGED</p>
			</div> */}
		</div>
	);
};

export default FeedMenu;

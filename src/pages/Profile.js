import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Feed from "../components/profile/Feed";
import PostModal from "../components/profile/PostModal";
import Header from "../components/profile/Header";
import FeedMenu from "../components/profile/FeedMenu";
import Post from "../components/post/Post";
import comments from "../data/comments.js";

import luka from "../icons/luka.jpg";
import "../styles/profFeed.scss";
import { toggleModal, selectModalActive } from "../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
	let { pName, pId } = useParams();
	console.log(pName);
	if (pId !== undefined) console.log(pId);
	console.log(useParams());
	let modalActive = useSelector(selectModalActive);
	const dispatch = useDispatch();
	console.log(modalActive);
	const { push } = useHistory();

	function openModal(postId) {
		console.log("opening modal");
		dispatch(toggleModal());
		push(`/profile/${pName}/p/${postId}`);
	}

	useEffect(() => {
		if (pId !== undefined && modalActive === false) dispatch(toggleModal());
	}, []);
	return (
		<div className='profile'>
			{pId !== undefined && modalActive && (
				<PostModal
					accountName='luxabrax'
					storyBorder={true}
					image='https://picsum.photos/600'
					comments={comments[0].comments}
					likedByText='breskvica'
					likedByNumber={1929}
					hours={2}
				/>
			)}
			<div className='profFeed'>
				<Header
					image={luka}
					accountName={"lux_abrax"}
					fullName='Luka'
					description='Self-taught programmer wannabe, stuck with making the most complex clone a beginner can do. Crazy man'
					postNumber={27}
					followers={79}
					following={79}
				/>
				<FeedMenu />

				<div className='posts'>
					<div className='row'>
						<div className='postContainer'>
							<img
								src='https://picsum.photos/600'
								alt=''
								onClick={() => {
									openModal(123);
								}}
							/>
						</div>
						<div className='postContainer'>
							<img
								src='https://picsum.photos/600'
								alt=''
								onClick={() => {
									openModal(1234);
								}}
							/>
						</div>
						<div className='postContainer'>
							<img
								src='https://picsum.photos/600'
								alt=''
								onClick={() => {
									openModal(1237);
								}}
							/>
						</div>
					</div>
					<div className='row'>
						<div className='postContainer'>
							<img
								src='https://picsum.photos/600'
								alt=''
								onClick={() => {
									openModal(1235);
								}}
							/>
						</div>
						<div className='postContainer'>
							<img
								src='https://picsum.photos/600'
								alt=''
								onClick={() => {
									openModal(1523);
								}}
							/>
						</div>
						<div className='postContainer'>
							<img
								src='https://picsum.photos/600'
								alt=''
								onClick={() => {
									openModal(1253);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;

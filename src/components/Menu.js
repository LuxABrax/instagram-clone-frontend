import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	goHome,
	changePage,
	selectPage,
} from "../features/navigation/navigationSlice";

import { ReactComponent as Home } from "../icons/home.svg";
import { ReactComponent as HomeActive } from "../icons/homeActive.svg";
import { ReactComponent as Explore } from "../icons/explore.svg";
import { ReactComponent as ExploreActive } from "../icons/exploreActive.svg";
import { ReactComponent as Direct } from "../icons/direct.svg";
import { ReactComponent as DirectActive } from "../icons/directActive.svg";
import { ReactComponent as Notifications } from "../icons/notifications.svg";
import { ReactComponent as NotificationsActive } from "../icons/notificationsActive.svg";
import ProfileIcon from "./ProfileIcon.js";
import luka from "../icons/luka.jpg";
import "../styles/menu.scss";
const Navigation = () => {
	const activePage = useSelector(selectPage);
	const dispatch = useDispatch();
	const { push } = useHistory();

	return (
		<div className='menu'>
			<div className='navLink'>
				<Link to='/'>
					{activePage === "home" ? (
						<HomeActive className='icon' />
					) : (
						<Home className='icon' onClick={() => dispatch(goHome())} />
					)}
				</Link>
			</div>
			<div className='navLink'>
				<Link to='/'>
					{activePage === "direct" ? (
						<DirectActive className='icon' />
					) : (
						<Direct
							className='icon'
							onClick={() => dispatch(changePage("direct"))}
						/>
					)}
				</Link>
			</div>
			<div className='navLink'>
				<Link to='/'>
					{activePage === "explore" ? (
						<ExploreActive className='icon' />
					) : (
						<Explore
							className='icon'
							onClick={() => dispatch(changePage("explore"))}
						/>
					)}
				</Link>
			</div>
			<div
				className='navLink'
				onClick={() => {
					push("/counter");
				}}
			>
				{activePage === "notifications" ? (
					<NotificationsActive className='icon' />
				) : (
					<Notifications
						className='icon'
						onClick={() => dispatch(changePage("notifications"))}
					/>
				)}
			</div>
			<div className='navLink'>
				<Link to='/profile'>
					<ProfileIcon image={luka} iconSize='small' />
				</Link>
			</div>
		</div>
	);
};

export default Navigation;

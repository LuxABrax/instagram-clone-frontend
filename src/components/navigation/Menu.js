import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
	changePage,
	selectPage,
	setLastPage,
} from "../../redux/navigationSlice";
import { logout, selectUser } from "../../redux/authSlice";
import { toggleModal } from "../../redux/modalSlice";

import ProfileMenu from "./ProfileMenu.js";
import { ReactComponent as Home } from "../../icons/home.svg";
import { ReactComponent as HomeActive } from "../../icons/homeActive.svg";
import { ReactComponent as Explore } from "../../icons/explore.svg";
import { ReactComponent as ExploreActive } from "../../icons/exploreActive.svg";
import { ReactComponent as Direct } from "../../icons/direct.svg";
import { ReactComponent as DirectActive } from "../../icons/directActive.svg";
import { ReactComponent as Notifications } from "../../icons/notifications.svg";
import { ReactComponent as NotificationsActive } from "../../icons/notificationsActive.svg";
import { ReactComponent as NewPost } from "../../icons/newPost.svg";
import { ReactComponent as NewPostActive } from "../../icons/newPostAct.svg";

import "../../styles/navigation/menu.scss";

const Menu = () => {
	const activePage = useSelector(selectPage);
	const user = useSelector(selectUser);

	const dispatch = useDispatch();
	const { push } = useHistory();

	if (user === undefined) dispatch(logout());

	const changeNavPage = newPage => {
		dispatch(setLastPage(activePage));
		dispatch(changePage(newPage));
	};

	return (
		<div className='menu'>
			<Link to='/' className='link'>
				{activePage === "home" ? (
					<HomeActive className='icon' />
				) : (
					<Home className='icon' onClick={() => changeNavPage("home")} />
				)}
			</Link>
			<Link to='/direct/inbox' className='link'>
				{activePage === "direct" ? (
					<DirectActive className='icon' />
				) : (
					<Direct className='icon' onClick={() => changeNavPage("direct")} />
				)}
			</Link>
			<div className='link'>
				{activePage === "newPost" ? (
					<NewPostActive className='icon' />
				) : (
					<NewPost
						className='icon'
						onClick={() => {
							push(`/profile/${user.name}`);
							changeNavPage("newPost");
							dispatch(toggleModal("addPost"));
						}}
					/>
				)}
			</div>
			<Link to='/explore' className='link'>
				{activePage === "explore" ? (
					<ExploreActive className='icon' />
				) : (
					<Explore className='icon' onClick={() => changeNavPage("explore")} />
				)}
			</Link>
			<div className='link'>
				{activePage === "notifications" ? (
					<NotificationsActive className='icon' />
				) : (
					<Notifications
						className='icon'
						onClick={() => changeNavPage("notifications")}
					/>
				)}
			</div>

			<ProfileMenu />
		</div>
	);
};

export default Menu;

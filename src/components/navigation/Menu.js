import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	changePage,
	selectPage,
	setLastPage,
} from "../../redux/navigationSlice";
import { logout, selectUser } from "../../redux/authSlice";

import ProfileMenu from "./ProfileMenu.js";
import { ReactComponent as Home } from "../../icons/home.svg";
import { ReactComponent as HomeActive } from "../../icons/homeActive.svg";
import { ReactComponent as Explore } from "../../icons/explore.svg";
import { ReactComponent as ExploreActive } from "../../icons/exploreActive.svg";
import { ReactComponent as Direct } from "../../icons/direct.svg";
import { ReactComponent as DirectActive } from "../../icons/directActive.svg";
import { ReactComponent as Notifications } from "../../icons/notifications.svg";
import { ReactComponent as NotificationsActive } from "../../icons/notificationsActive.svg";

import "../../styles/navigation/menu.scss";

const Menu = () => {
	const activePage = useSelector(selectPage);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	// const { push } = useHistory();
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
			<Link to='/' className='link'>
				{activePage === "direct" ? (
					<DirectActive className='icon' />
				) : (
					<Direct className='icon' onClick={() => changeNavPage("direct")} />
				)}
			</Link>
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
			{/* <Link
				to={`/profile/${user.name}`}
				className='link'
				onClick={() => {
					dispatch(changePage("profile"));
				}}
			>
				<ProfileIcon
					image={`http://localhost:5000/uploads/${user.photo}`}
					iconSize='small'
					profileActive={activePage === "profile" && user.name === user2.name}
				/>
			</Link> */}
		</div>
	);
};

export default Menu;

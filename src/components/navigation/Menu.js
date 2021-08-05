import "../../styles/navigation/menu.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	goHome,
	changePage,
	selectPage,
} from "../../features/navigation/navigationSlice";

import ProfileIcon from "../ProfileIcon.js";
import { ReactComponent as Home } from "../../icons/home.svg";
import { ReactComponent as HomeActive } from "../../icons/homeActive.svg";
import { ReactComponent as Explore } from "../../icons/explore.svg";
import { ReactComponent as ExploreActive } from "../../icons/exploreActive.svg";
import { ReactComponent as Direct } from "../../icons/direct.svg";
import { ReactComponent as DirectActive } from "../../icons/directActive.svg";
import { ReactComponent as Notifications } from "../../icons/notifications.svg";
import { ReactComponent as NotificationsActive } from "../../icons/notificationsActive.svg";
import luka from "../../icons/luka.jpg";

const Navigation = () => {
	const activePage = useSelector(selectPage);
	const dispatch = useDispatch();
	// const { push } = useHistory();

	return (
		<div className='menu'>
			<Link to='/' className='link'>
				{activePage === "home" ? (
					<HomeActive className='icon' />
				) : (
					<Home className='icon' onClick={() => dispatch(goHome())} />
				)}
			</Link>
			<Link to='/' className='link'>
				{activePage === "direct" ? (
					<DirectActive className='icon' />
				) : (
					<Direct
						className='icon'
						onClick={() => dispatch(changePage("direct"))}
					/>
				)}
			</Link>
			<Link to='/' className='link'>
				{activePage === "explore" ? (
					<ExploreActive className='icon' />
				) : (
					<Explore
						className='icon'
						onClick={() => dispatch(changePage("explore"))}
					/>
				)}
			</Link>
			<div className='link'>
				{activePage === "notifications" ? (
					<NotificationsActive className='icon' />
				) : (
					<Notifications
						className='icon'
						onClick={() => dispatch(changePage("notifications"))}
					/>
				)}
			</div>
			<Link
				to='/profile/lux_abrax'
				className='link'
				onClick={() => {
					dispatch(changePage("profile"));
				}}
			>
				<ProfileIcon
					image={luka}
					iconSize='small'
					profileActive={activePage === "profile"}
				/>
			</Link>
		</div>
	);
};

export default Navigation;

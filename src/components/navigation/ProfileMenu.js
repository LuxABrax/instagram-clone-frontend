import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/authSlice";
import { selectUserProfile } from "../../redux/usersSlice";
import {
	changePage,
	selectLastPage,
	selectPage,
	setLastPage,
} from "../../redux/navigationSlice";

import ProfileIcon from "../ProfileIcon.js";
import { ReactComponent as Profile } from "../../icons/profile.svg";
import { ReactComponent as Save } from "../../icons/save.svg";
import { ReactComponent as Settings } from "../../icons/cog.svg";
import { ReactComponent as Switch } from "../../icons/switch.svg";

import "../../styles/navigation/profileMenu.scss";

const ProfileMenu = () => {
	const [dropdown, setDropdown] = useState(false);

	const user = useSelector(selectUser);
	const user2 = useSelector(selectUserProfile);
	const activePage = useSelector(selectPage);
	const lastPage = useSelector(selectLastPage);

	const dispatch = useDispatch();
	const { push } = useHistory();

	const handleDropdown = newState => {
		setDropdown(newState);
		if (newState) {
			dispatch(setLastPage(activePage));
			dispatch(changePage("profile"));
		} else {
			dispatch(changePage(lastPage));
		}
	};

	const handleClick = type => {
		let link;

		if (type === "profile") link = `/profile/${user.name}`;
		if (type === "saved") link = `/profile/${user.name}/saved`;
		if (type === "settings") link = `/accounts/edit`;

		setDropdown(false);
		dispatch(changePage("profile"));
		push(link);
	};
	return (
		<div className='profile-menu-container link'>
			<div className='link' onClick={() => handleDropdown(true)}>
				<ProfileIcon
					image={`http://localhost:5000/uploads/${user.photo}`}
					iconSize='small'
					profileActive={
						(activePage === "profile" && user.name === user2.name) || dropdown
					}
				/>
			</div>

			{dropdown && (
				<>
					<div className='backdrop' onClick={() => handleDropdown(false)}></div>
				</>
			)}
			<div className={`dropdown-container ${dropdown ? "shown" : ""}`}>
				{dropdown && (
					<>
						<div className='triangle'></div>
						<div className='search-dropdown'>
							<ul>
								<li
									onClick={() => {
										handleClick("profile");
									}}
								>
									<Profile className='icon' />
									<p>Profile</p>
								</li>
								<li
									onClick={() => {
										handleClick("saved");
									}}
								>
									<Save className='icon' />
									<p>Saved</p>
								</li>
								<li
									onClick={() => {
										handleClick("settings");
									}}
								>
									<Settings className='icon' />
									<p>Settings</p>
								</li>
								<li>
									<Switch className='icon' />
									<p>Switch Account</p>
								</li>
								<li onClick={() => dispatch(logout())}>
									<p>Log Out</p>
								</li>
							</ul>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProfileMenu;

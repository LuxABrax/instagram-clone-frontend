import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../styles/settings/settingsMenu.scss";

const SettingsMenu = () => {
	const { type } = useParams();
	const [active, setActive] = useState(type);
	const { push } = useHistory();
	useEffect(() => {
		setActive(type);
	}, [type]);
	return (
		<ul className='settingsMenu'>
			<li>
				<p
					className={`${active === "edit" ? "active" : ""}`}
					onClick={() => {
						setActive("edit");
						push("/accounts/edit");
					}}
				>
					Edit Profile
				</p>
			</li>
			<li>
				<p
					className={`${active === "password" ? "active" : ""}`}
					onClick={() => {
						setActive("password");
						push("/accounts/password");
					}}
				>
					Change Password
				</p>
			</li>
			<li>
				<p>Apps and Website</p>
			</li>
			<li>
				<p>Email and SMS</p>
			</li>
			<li>
				<p>Push Notifications</p>
			</li>
			<li>
				<p>Manage Contacts</p>
			</li>
			<li>
				<p>Privacy and Security</p>
			</li>
			<li>
				<p>Login Activity</p>
			</li>
			<li>
				<p>Emails from Instagram</p>
			</li>
			<div className='prof'>
				<p>Switch to Professional Account</p>
			</div>
		</ul>
	);
};

export default SettingsMenu;

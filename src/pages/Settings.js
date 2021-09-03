import "../styles/pages/settings.scss";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import { selectModalActive, selectModalName } from "../redux/modalSlice";

import SettingsMenu from "../components/settings/SettingsMenu";
import ChangeImgModal from "../components/profile/modals/ChangeImgModal";
import EditForm from "../components/settings/EditForm";
import PasswordForm from "../components/settings/PasswordForm";
import Footer from "../components/sidebar/Footer";

const Settings = () => {
	const user = useSelector(selectUser);

	// const dispatch = useDispatch();
	let modalActive = useSelector(selectModalActive);
	let modalName = useSelector(selectModalName);

	const { type } = useParams();

	return (
		<>
			{modalName === "img" && modalActive && <ChangeImgModal id={user._id} />}
			<div className='settings'>
				<SettingsMenu />
				<article className='settingsContent'>
					{type === "edit" && <EditForm />}
					{type === "password" && <PasswordForm />}
				</article>
			</div>
			<Footer />
		</>
	);
};

export default Settings;

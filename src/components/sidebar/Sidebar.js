import "../../styles/sidebar/sidebar.scss";
import useWindowDimensions from "../../utils/windowHook";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";

import ProfileComp from "../ProfileComp";
import Suggestions from "./Suggestions";
import Footer from "./Footer";
import luka from "../../icons/luka.jpg";

const Sidebar = () => {
	const { width } = useWindowDimensions();
	let leftOffset = Math.floor((width - 935) / 2 + 604 + 28);

	const user = useSelector(selectUser);

	return (
		<div className='sidebar' style={{ left: leftOffset + "px" }}>
			<ProfileComp
				username={user.name}
				caption={user.fullName}
				urlText='Switch'
				iconSize='big'
				image={luka}
			/>
			<Suggestions />
			<Footer />
		</div>
	);
};

export default Sidebar;

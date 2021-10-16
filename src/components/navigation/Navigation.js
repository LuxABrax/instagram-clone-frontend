import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { goHome } from "../../redux/navigationSlice";
import { selectLoggedIn } from "../../redux/authSlice";

import Menu from "./Menu";
import Search from "./Search";

import "../../styles/navigation/navigation.scss";

const Navigation = () => {
	const dispatch = useDispatch();
	const { push } = useHistory();
	const navActive = useSelector(selectLoggedIn);

	return (
		<div className={`navigation ${!navActive ? "hidden" : ""}`}>
			<div className='container'>
				<div
					className='logoContainer'
					onClick={() => {
						push("/home");
						dispatch(goHome());
					}}
				>
					<img
						className='logo'
						src='/images/instagram-logo.png'
						alt='instagram logo'
					/>
				</div>
				<Search />
				<div className='menuContainer'>
					<Menu />
				</div>
			</div>
		</div>
	);
};

export default Navigation;

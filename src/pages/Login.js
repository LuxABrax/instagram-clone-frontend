import "../styles/login.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setLogin } from "../features/authSlice";
import { changeNavActive } from "../features/navigation/navigationSlice";

import Footer from "../components/sidebar/Footer";

const Login = () => {
	const [mode, setMode] = useState("login");

	const dispatch = useDispatch();
	const { push } = useHistory();

	function handleLogin() {
		dispatch(changeNavActive(true));
		dispatch(setLogin(true));
		push("/home");
	}

	useEffect(() => {
		dispatch(changeNavActive(false));
	});

	return (
		<div className='loginPage'>
			{mode === "login" ? (
				<div className='logContainer'>
					<div className='previewContainer'></div>
					<div className='loginContainer'>
						<button onClick={handleLogin}>Log in</button>
						<button
							onClick={() => {
								setMode("register");
							}}
						>
							Switch to Register
						</button>
					</div>
				</div>
			) : (
				<div className='regContainer'>
					<button
						onClick={() => {
							setMode("login");
						}}
					>
						Switch to Log in
					</button>
				</div>
			)}

			<Footer />
		</div>
	);
};

export default Login;

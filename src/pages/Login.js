import "../styles/pages/login.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setLogin } from "../features/authSlice";
import { changeNavActive } from "../features/navigation/navigationSlice";

import Footer from "../components/sidebar/Footer";

const Login = () => {
	const [mode, setMode] = useState("login");
	const [showPass, setShowPass] = useState(false);

	const dispatch = useDispatch();
	const { push } = useHistory();

	function handleLogin(e) {
		e.preventDefault();
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
					<div className='previewContainer'>
						<div className='images'>
							<img src='/images/screenshot1.jpg' alt='screenshot' />
						</div>
					</div>
					<div className='loginContainer'>
						<div className='formContainer'>
							<div className='titleImg'>
								<img
									src='/images/instagram-logo-big.png'
									alt='Instagram title'
								/>
							</div>
							<form className='loginForm' onSubmit={handleLogin}>
								<div className='inputContainer'>
									<label for='email'>
										<span className={`typing`}>
											Phone number, email or username
										</span>
										<input id='email' className={`typing`} />
									</label>
								</div>
								<div className='inputContainer'>
									<label for='password'>
										<span className={`typing`}>Password</span>
										<input
											id='password'
											type={`${!showPass ? "password" : "text"}`}
											className={`typing`}
										/>
									</label>
									<div
										className={`showPass typing`}
										onClick={() => {
											setShowPass(!showPass);
										}}
									>{`${showPass ? "Hide" : "Show"}`}</div>
								</div>
								<button className='loginBtn' type='submit' disabled>
									Log In
								</button>
								<div className='splitContainer'>
									<div className='line'></div>
									<p>OR</p>
									<div className='line'></div>
								</div>
								<div className='facebookBtn'>
									<img src='/images/facebook.png' alt='facebook-logo' />
									<span>Log in with Facebook</span>
								</div>
								<p href='' className='forgot'>
									Forgot password?
								</p>
							</form>
						</div>

						<div className='registerContainer'>
							<p>
								Don't have an account?
								<span
									className='switchBtn'
									onClick={() => {
										setMode("register");
									}}
								>
									Sign up
								</span>
							</p>
						</div>
						<div className='appDownload'>
							<p>Get the Real app.</p>
							<div className='downloads'>
								<a
									target='_blank'
									rel='noreferrer'
									href='https://apps.apple.com/app/instagram/id389801252?vt=lo'
								>
									<img
										src='/images/downloadApp.png'
										alt='download from app store'
									/>
								</a>
								<a
									target='_blank'
									rel='noreferrer'
									href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=B5F2BFB5-5A2C-49C6-BF65-4DA9866D6C34&utm_content=lo&utm_medium=badge'
								>
									<img
										src='/images/downloadPlay.png'
										alt='download from play store'
									/>
								</a>
							</div>
						</div>
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

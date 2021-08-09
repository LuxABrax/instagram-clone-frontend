import "../styles/pages/login.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, setErrMessage } from "../features/authSlice";
import { useHistory } from "react-router";

import { useForm } from "../components/login/formHook";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
	VALIDATOR_MAXLENGTH,
	VALIDATOR_EMAIL,
} from "../components/login/validators";

import Input from "../components/login/Input";
import Preview from "../components/login/Preview";
import Switch from "../components/login/Switch";
import GetTheApp from "../components/login/GetTheApp";
import WithFacebook from "../components/login/WithFacebook";
import Footer from "../components/sidebar/Footer";

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const dispatch = useDispatch();
	const { push } = useHistory();

	const { status, errMessage } = useSelector(state => state.auth);

	const switchModeHandler = () => {
		dispatch(setErrMessage(""));
		if (!isLogin) {
			setFormData(
				{
					...formState.inputs,
					fullName: undefined,
					username: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					fullName: {
						value: "",
						isValid: false,
					},
					username: {
						value: "",
						isValid: false,
					},
				},
				false
			);
		}
		setIsLogin(prevMode => !prevMode);
	};

	async function handleLogin(e) {
		e.preventDefault();

		let email = formState.inputs.email.value;
		let password = formState.inputs.password.value;
		let name = "";
		let fullName = "";

		if (!isLogin) {
			name = formState.inputs.username.value;
			fullName = formState.inputs.fullName.value;
		}

		if (isLogin) {
			await dispatch(loginUser({ email, password }));
		} else {
			await dispatch(
				registerUser({
					name,
					email,
					password,
					fullName,
				})
			);
		}

		if (status === "success register" || status === "success login") {
			push("/home");
		}
	}

	return (
		<div className='loginPage'>
			<div className='logContainer'>
				{isLogin && (
					<div className='previewContainer'>
						<Preview />
					</div>
				)}
				<div className='loginContainer'>
					<div className='formContainer'>
						<div className='titleImg'>
							<img src='/images/instagram-logo-big.png' alt='Instagram title' />
						</div>

						{!isLogin && <WithFacebook isLogin={isLogin} />}

						<form className={`${!isLogin && "fix"}`} onSubmit={handleLogin}>
							<>
								<Input
									id='email'
									type='text'
									label={`${
										isLogin ? "Phone number, email or username" : "Email"
									}`}
									validators={
										isLogin
											? [VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(40)]
											: [
													VALIDATOR_REQUIRE(),
													VALIDATOR_EMAIL(),
													VALIDATOR_MAXLENGTH(40),
											  ]
									}
									onInput={inputHandler}
									isLogin={isLogin}
								/>
								<Input
									id='password'
									type='password'
									label='Password'
									validators={[VALIDATOR_MINLENGTH(6)]}
									onInput={inputHandler}
									isLogin={isLogin}
								/>
							</>
							{!isLogin && (
								<>
									<Input
										id='fullName'
										type='text'
										label='Full Name'
										validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
										onInput={inputHandler}
										isLogin={isLogin}
									/>
									<Input
										id='username'
										type='text'
										label='Username'
										validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
										onInput={inputHandler}
										isLogin={isLogin}
									/>
								</>
							)}

							<button
								className='loginBtn'
								type='submit'
								disabled={!formState.isValid}
							>
								{`${isLogin ? "Log In" : "Next"}`}
							</button>

							{!isLogin && errMessage.length > 0 && (
								<p className='loginError'>{errMessage}</p>
							)}

							{!isLogin && (
								<p className='policy'>
									By signing up, you agree to our Terms . Learn how we collect,
									use and share your data in our Data Policy and how we use
									cookies and similar technology in our Cookies Policy .
								</p>
							)}

							{isLogin && <WithFacebook isLogin={isLogin} />}
						</form>
					</div>

					<Switch isLogin={isLogin} switchModeHandler={switchModeHandler} />
					<GetTheApp />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Login;

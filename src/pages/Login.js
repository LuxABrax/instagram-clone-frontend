import "../styles/pages/login.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setLogin } from "../features/authSlice";
import { changeNavActive } from "../features/navigation/navigationSlice";
import { useForm } from "../components/login/formHook";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
	VALIDATOR_MAXLENGTH,
} from "../components/login/validators";

import Input from "../components/login/Input";
import Preview from "../components/login/Preview";
import Switch from "../components/login/Switch";
import GetTheApp from "../components/login/GetTheApp";
import WithFacebook from "../components/login/WithFacebook";
import Footer from "../components/sidebar/Footer";

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [loginErr, setLoginErr] = useState("");
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

	const switchModeHandler = () => {
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
			// console.log("after add ", formState.inputs);
		}
		setIsLogin(prevMode => !prevMode);
		// console.log("after switch ", formState.inputs);
	};

	const dispatch = useDispatch();
	const { push } = useHistory();

	function handleLogin(e) {
		e.preventDefault();
		console.log(formState.inputs);

		// setLoginErr(
		// 	"The username you entered doesn't belong to an account. Please check your username and try again."
		// );
		// setLoginErr(
		// 	"Sorry, your password was incorrect. Please double-check your password"
		// );
		dispatch(changeNavActive(true));
		dispatch(setLogin(true));
		push("/home");
	}

	useEffect(() => {
		dispatch(changeNavActive(false));
	});

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

						{!isLogin && <WithFacebook isLogin={isLogin} loginErr={loginErr} />}

						<form className={`${!isLogin && "fix"}`} onSubmit={handleLogin}>
							{isLogin ? (
								<>
									<Input
										id='email'
										type='text'
										label='Phone number, email or username'
										validators={[VALIDATOR_REQUIRE()]}
										onInput={inputHandler}
									/>
									<Input
										id='password'
										type='password'
										label='Password'
										validators={[VALIDATOR_MINLENGTH(6)]}
										onInput={inputHandler}
									/>
								</>
							) : (
								<>
									<Input
										id='email'
										type='email'
										label='Email'
										validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
										onInput={inputHandler}
									/>
									<Input
										id='fullName'
										type='text'
										label='Full Name'
										validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
										onInput={inputHandler}
									/>
									<Input
										id='username'
										type='text'
										label='Username'
										validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
										onInput={inputHandler}
									/>
									<Input
										id='password'
										type='password'
										label='Password'
										validators={[VALIDATOR_MINLENGTH(6)]}
										onInput={inputHandler}
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

							{!isLogin && (
								<p className='policy'>
									By signing up, you agree to our Terms . Learn how we collect,
									use and share your data in our Data Policy and how we use
									cookies and similar technology in our Cookies Policy .
								</p>
							)}

							{isLogin && (
								<WithFacebook isLogin={isLogin} loginErr={loginErr} />
							)}
						</form>
					</div>

					<Switch
						isLogin={isLogin}
						setIsLogin={setIsLogin}
						switchModeHandler={switchModeHandler}
					/>
					<GetTheApp />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Login;

import { useSelector } from "react-redux";
import "../../styles/login/withFacebook.scss";

const WithFacebook = ({ isLogin }) => {
	const loginErr = useSelector(state => state.users.errMessage);
	return (
		<>
			{!isLogin && (
				<div className='withFacebookTitle'>
					<h2 className='message'>
						Sign up to see photos and videos from your friends.
					</h2>
					<button className='facebookBtn1' type='button'>
						<img src='/images/facebookWhite.png' alt='facebook logo' />
						<span>Log in with Facebook</span>
					</button>
				</div>
			)}
			<div className='splitContainer'>
				<div className='line'></div>
				<p>OR</p>
				<div className='line'></div>
			</div>
			{isLogin && (
				<>
					<div className='facebookBtn'>
						<img src='/images/facebook.png' alt='facebook-logo' />
						<span>Log in with Facebook</span>
					</div>
					{loginErr.length > 0 && <p className='loginError'>{loginErr}</p>}
					<p href='' className='forgot'>
						Forgot password?
					</p>
				</>
			)}
		</>
	);
};

export default WithFacebook;

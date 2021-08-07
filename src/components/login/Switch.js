import "../../styles/login/switch.scss";

const Switch = ({ isLogin, switchModeHandler }) => {
	return (
		<div className='switchContainer'>
			<p>
				{`${isLogin ? "Don't have" : "Have"} an account?`}
				<span
					className='switchBtn'
					onClick={() => {
						switchModeHandler();
					}}
				>
					{`${isLogin ? "Sign up" : "Log in"}`}
				</span>
			</p>
		</div>
	);
};

export default Switch;

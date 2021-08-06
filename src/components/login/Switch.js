import "../../styles/login/switch.scss";

const Switch = ({ isLogin, setIsLogin }) => {
	return (
		<div className='switchContainer'>
			<p>
				{`${isLogin ? "Don't have" : "Have"} an account?`}
				<span
					className='switchBtn'
					onClick={() => {
						{
							isLogin ? setIsLogin(false) : setIsLogin(true);
						}
					}}
				>
					{`${isLogin ? "Sign up" : "Log in"}`}
				</span>
			</p>
		</div>
	);
};

export default Switch;

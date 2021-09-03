import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectUser } from "../../redux/authSlice";
import ProfileIcon from "../ProfileIcon";

const PasswordForm = () => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const user = useSelector(selectUser);
	const { type } = useParams();

	const handleSubmit = e => {
		e.preventDefault();
		console.log("change password");
	};

	return (
		<>
			<div className='editPhoto'>
				<div className='photo'>
					<ProfileIcon
						image={`http://localhost:5000/uploads/${user.photo}`}
						iconSize='mediumX'
					/>
				</div>
				<div className='userInfo'>
					<h1 className={`${type === "password" ? "hPas" : ""}`}>
						{user.name}
					</h1>
				</div>
			</div>
			<form onSubmit={handleSubmit}>
				<div className='formInput'>
					<div className='leftC'>
						<label htmlFor='oldPassword'>Old Password</label>
					</div>
					<div className='rightC'>
						<div className='fCont'>
							<input
								type='password'
								name='oldPassword'
								value={oldPassword}
								onChange={e => setOldPassword(e.target.value)}
								placeholder=''
							/>
						</div>
					</div>
				</div>
				<div className='formInput'>
					<div className='leftC'>
						<label htmlFor='newPassword'>New Password</label>
					</div>
					<div className='rightC'>
						<div className='fCont'>
							<input
								type='password'
								name='newPassword'
								value={newPassword}
								onChange={e => setNewPassword(e.target.value)}
								placeholder=''
							/>
						</div>
					</div>
				</div>
				<div className='formInput'>
					<div className='leftC'>
						<label htmlFor='confirmPassword'>Confirm New Password</label>
					</div>
					<div className='rightC'>
						<div className='fCont'>
							<input
								type='password'
								name='confirmPassword'
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								placeholder=''
							/>
						</div>
					</div>
				</div>
				<div className='formInput'>
					<div className='leftC dn'></div>
					<div className='rightC'>
						<div className='fCont'>
							<div className='buttonC'>
								<button type='submit'>Change Password</button>
								<button type='button' className='revBtn'>
									Forgot Password?
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default PasswordForm;

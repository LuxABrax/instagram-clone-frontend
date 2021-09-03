import axios from "../../axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { selectUser } from "../../redux/authSlice";
import { toggleModal } from "../../redux/modalSlice";
import ProfileIcon from "../ProfileIcon";

const EditForm = props => {
	const user = useSelector(selectUser);

	const [username, setUsername] = useState(user.name);
	const [nameValid, setNameValid] = useState(true);
	const [emailValid, setEmailValid] = useState(true);
	const [name, setName] = useState(user.fullName);
	const [email, setEmail] = useState(user.email);
	const [description, setDescription] = useState(user.description);

	const { type } = useParams();
	const { push } = useHistory();
	const dispatch = useDispatch();

	function changeImg() {
		dispatch(toggleModal("img"));
	}

	const checkEmailName = async tip => {
		let val = "";
		if (tip === "name") {
			val = username;
			if (val === user.name) {
				setNameValid(true);
				return;
			}
		} else if (tip === "email") {
			val = email;
			if (val === user.email) {
				setEmailValid(true);
				return;
			}
		}
		const response = await axios.post("/auth/checkemailname", {
			type: tip,
			value: val,
		});
		console.log(await response.data);
		if (response.data.success) {
			if (tip === "name") setNameValid(true);
			if (tip === "email") setEmailValid(true);
		} else {
			if (tip === "name") setNameValid(false);
			if (tip === "email") setEmailValid(false);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		console.log("submit");

		const res = await axios.put(`/users/${user._id}`, {
			name: username,
			fullName: name,
			email: email,
			description: description,
		});
		const data = await res.data;
		console.log(data);
	};
	return (
		<>
			<div className='editPhoto'>
				<div className='photo'>
					<ProfileIcon
						image={`http://localhost:5000/uploads/${user.photo}`}
						iconSize='mediumX'
						onClick={() => {
							if (type === "edit") changeImg();
						}}
					/>
				</div>
				<div className='userInfo'>
					<h1 className={`${type === "password" ? "hPas" : ""}`}>{username}</h1>
					{type === "edit" && (
						<button onClick={changeImg}>Change Profile Photo</button>
					)}
				</div>
			</div>
			<form onSubmit={handleSubmit}>
				<div className='formInput'>
					<div className='leftC'>
						<label htmlFor='name'>Name</label>
					</div>
					<div className='rightC'>
						<div className='fCont'>
							<input
								name='name'
								value={name}
								onChange={e => setName(e.target.value)}
								placeholder='Name'
							/>
							<div className='inputDescription'>
								<p>
									Help people discover your account by using the name you're
									known by: either your full name, nickname, or business name.
								</p>
								<p>You can only change your name twice within 14 days.</p>
							</div>
						</div>
					</div>
				</div>
				<div className='formInput'>
					<div className='leftC'>
						<label htmlFor='username'>Username</label>
					</div>
					<div className='rightC'>
						<div className='fCont'>
							<input
								name='username'
								value={username}
								onChange={e => setUsername(e.target.value)}
								onBlur={() => checkEmailName("name")}
								className={`${!nameValid ? "taken" : ""}`}
								placeholder='Username'
							/>
							<div className='inputDescription'>
								<p>
									In most cases, you'll be able to change your username back to{" "}
									{user.name} for another 14 days.{" "}
									<a
										href='https://help.instagram.com/876876079327341'
										target='_blank'
										rel='noreferrer'
									>
										Learn more
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='formInput em'>
					<div className='leftC'>
						<label htmlFor='email'>Email</label>
					</div>
					<div className='rightC'>
						<div className='fCont'>
							<input
								name='email'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								onBlur={() => checkEmailName("email")}
								className={`${!emailValid ? "taken" : ""}`}
								placeholder='Email'
							/>
						</div>
					</div>
				</div>
				<div className='formInput em'>
					<div className='leftC'>
						<label htmlFor='description'>Description</label>
					</div>
					<div className='rightC'>
						<div className='fCont'>
							<textarea
								name='description'
								value={description}
								onChange={e => setDescription(e.target.value)}
								placeholder='Description'
							/>
						</div>
					</div>
				</div>
				<div className='formInput'>
					<div className='leftC dn'></div>
					<div className='rightC'>
						<div className='fCont'>
							<div className='buttonC'>
								<button type='submit' disabled={!nameValid || !emailValid}>
									Submit
								</button>
								<button
									type='button'
									className='revBtn'
									onClick={() => push("/accounts/password")}
								>
									New Password
								</button>
								<button type='button' className='revBtn'>
									Delete Account
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default EditForm;

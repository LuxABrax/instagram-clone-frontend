import "../../styles/login/input.scss";
import { useEffect, useReducer, useState } from "react";
import { validate } from "./validators";
import axios from "../../features/axios";

const inputReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE":
			return {
				...state,
				value: action.value,
				isValid: validate(action.value, action.validators),
			};
		case "TOUCH": {
			return {
				...state,
				isTouched: true,
			};
		}
		default:
			return state;
	}
};

const Input = props => {
	const [showPass, setShowPass] = useState(false);
	const [validEoN, setValidEoN] = useState(false);

	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue || "",
		isTouched: false,
		isValid: props.initialValid || false,
	});

	const { id, type, label, onInput, isLogin } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		// console.log("inputState: ", id, value);
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	const changeHandler = e => {
		dispatch({
			type: "CHANGE",
			value: e.target.value,
			validators: props.validators,
		});
	};

	const checkEmailName = async () => {
		let tip;
		if (id === "email") tip = "email";
		if (id === "username") tip = "name";
		const response = await axios.post("/auth/checkemailname", {
			type: tip,
			value: inputState.value,
		});
		console.log(await response.data);
		if (response.data.success) {
			setValidEoN(true);
		} else {
			setValidEoN(false);
		}
	};

	const touchHandler = () => {
		if ((id === "email" || id === "username") && !isLogin) checkEmailName();
		dispatch({
			type: "TOUCH",
		});
	};

	return (
		<div className='inputContainer'>
			<label htmlFor={id}>
				<span className={`${inputState.value.length > 0 ? "typing" : ""}`}>
					{label}
				</span>
				<input
					id={id}
					type={`${
						type !== "password" ? type : showPass ? "text" : "password"
					}`}
					className={`${inputState.value.length > 0 ? "typing" : ""} ${
						isLogin ? "" : id === "password" ? "reg pass" : "reg"
					}`}
					value={inputState.value}
					onChange={changeHandler}
					onBlur={touchHandler}
					placeholder={props.placeholder || ""}
				/>
			</label>
			{!isLogin && inputState.isTouched && inputState.value.length > 0 && (
				<div className='showPass typing'>
					{id === "email" || id === "username" ? (
						validEoN && inputState.isValid ? (
							<img src='/images/verified.png' alt='available' className='c' />
						) : (
							<img src='/images/xmark.png' alt='not available' className='c' />
						)
					) : inputState.isValid ? (
						<img
							src='/images/verified.png'
							alt='available'
							className={`c ${id === "password" ? "p" : ""}`}
						/>
					) : (
						<img
							src='/images/xmark.png'
							alt='not available'
							className={`c ${id === "password" ? "p" : ""}`}
						/>
					)}
				</div>
			)}
			{type === "password" && (
				<div
					className={`showPass ${inputState.value.length > 0 ? "typing" : ""}`}
					onClick={() => {
						setShowPass(!showPass);
					}}
				>{`${showPass ? "Hide" : "Show"}`}</div>
			)}
		</div>
	);
};

export default Input;

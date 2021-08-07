import "../../styles/login/input.scss";
import { useEffect, useReducer, useState } from "react";
import { validate } from "./validators";

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

	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue || "",
		isTouched: false,
		isValid: props.initialValid || false,
	});

	const { id, type, label, onInput } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		console.log("inputState: ", id, value);
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	const changeHandler = e => {
		dispatch({
			type: "CHANGE",
			value: e.target.value,
			validators: props.validators,
		});
	};

	const touchHandler = () => {
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
					className={`${inputState.value.length > 0 ? "typing" : ""}`}
					value={inputState.value}
					onChange={changeHandler}
					onBlur={touchHandler}
					placeholder={props.placeholder || ""}
				/>
			</label>
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

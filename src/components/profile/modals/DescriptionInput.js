import { useState } from "react";
import "../../../styles/login/input.scss";

const DescriptionInput = () => {
	const [description, setDescription] = useState("");

	const handleChange = e => {
		setDescription(e.target.value);
	};
	return (
		<div className='inputContainer desc'>
			<label htmlFor='description' className='descLabel'>
				<span className={`${description.length > 0 ? "typing" : ""}`}>
					Add Description
				</span>
				<textarea
					id='description'
					className={`${description.length > 0 ? "typing" : ""}`}
					name='description'
					value={description}
					onChange={handleChange}
					maxLength={250}
				></textarea>
			</label>
		</div>
	);
};

export default DescriptionInput;

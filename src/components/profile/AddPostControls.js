import { ReactComponent as Close } from "../../icons/close.svg";

import "../../styles/profile/addPostControls.scss";

const AddPostControls = ({
	images,
	setImages,
	imgPosition,
	setImgPosition,
	noEdit,
}) => {
	const handleRemove = () => {
		setImages(i => i.filter((im, index) => index !== imgPosition));
		setImgPosition(imgPosition === 0 ? 0 : imgPosition - 1);
	};

	const handleMove = direction => {
		if (direction) {
			setImages(i => [
				...i.slice(0, imgPosition - 1),
				i[imgPosition],
				i[imgPosition - 1],
				...i.slice(imgPosition + 1),
			]);
			setImgPosition(imgPosition - 1);
		} else {
			setImages(i => [
				...i.slice(0, imgPosition),
				i[imgPosition + 1],
				i[imgPosition],
				...i.slice(imgPosition + 2),
			]);
			setImgPosition(imgPosition + 1);
		}
	};

	return (
		<div className='images-controls'>
			{noEdit === undefined && (
				<button className='remove-image' onClick={handleRemove} title='Remove'>
					<Close className='close' />
				</button>
			)}
			<button
				className={`arrows left-arrow ${imgPosition === 0 ? "hide" : ""}`}
				onClick={() => {
					setImgPosition(p => p - 1);
				}}
				title='Show left'
			/>
			<button
				className={`arrows right-arrow ${
					imgPosition === images.length - 1 ? "hide" : ""
				}`}
				onClick={() => {
					setImgPosition(p => p + 1);
				}}
				title='Show right'
			/>
			{images.length > 1 && noEdit === undefined && (
				<div className='position-controls'>
					<button
						className={`arrows left-arrow ${imgPosition === 0 ? "hide" : ""}`}
						title='Move left'
						onClick={() => {
							handleMove(true);
						}}
					/>

					<div className='positions'>
						{images.map((i, idx) => (
							<div
								className={`dot ${idx === imgPosition ? "act" : ""}`}
								onClick={() => setImgPosition(idx)}
							/>
						))}
					</div>
					<button
						className={`arrows right-arrow ${
							imgPosition === images.length - 1 ? "hide" : ""
						}`}
						title='Move right'
						onClick={() => {
							handleMove(false);
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default AddPostControls;

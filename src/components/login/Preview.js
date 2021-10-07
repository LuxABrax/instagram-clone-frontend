import { useEffect, useState } from "react";

import "../../styles/login/preview.scss";

const Preview = () => {
	const [active, setActive] = useState(1);

	useEffect(() => {
		let timer = setTimeout(() => {
			if (active !== 5) {
				setActive(a => a + 1);
			} else {
				setActive(1);
			}
		}, 5000);
		return () => {
			clearTimeout(timer);
		};
	}, [active, setActive]);

	return (
		<div className='pImages'>
			<img
				className={`previewImg ${
					active === 1 ? "show" : active === 2 ? "past" : ""
				}`}
				src='/images/screenshot1.jpg'
				alt='screenshot'
			/>
			<img
				className={`previewImg ${
					active === 2 ? "show" : active === 3 ? "past" : ""
				}`}
				src='/images/screenshot2.jpg'
				alt='screenshot'
			/>
			<img
				className={`previewImg ${
					active === 3 ? "show" : active === 4 ? "past" : ""
				}`}
				src='/images/screenshot3.jpg'
				alt='screenshot'
			/>
			<img
				className={`previewImg ${
					active === 4 ? "show" : active === 5 ? "past" : ""
				}`}
				src='/images/screenshot4.jpg'
				alt='screenshot'
			/>
			<img
				className={`previewImg ${
					active === 5 ? "show" : active === 1 ? "past" : ""
				}`}
				src='/images/screenshot5.jpg'
				alt='screenshot'
			/>
		</div>
	);
};

export default Preview;

import { useState } from "react";

import "../../styles/profile/gridImage.scss";

const GridImage = ({ idx, photo, id, openModal, likes, comments }) => {
	const [loaded, setLoaded] = useState(false);
	const [overlay, setOverlay] = useState(false);

	return (
		<div
			className='postContainer'
			key={idx}
			onClick={async () => {
				openModal(id);
			}}
			onPointerOver={() => setOverlay(true)}
			onPointerLeave={() => setOverlay(false)}
		>
			{overlay ? (
				<div className='overlay'>
					<ul className='overlay-list'>
						<li className='overlay-li'>
							<span className='o-icon o-heart'></span>
							<span>{likes}</span>
						</li>
						<li className='overlay-li'>
							<span className='o-icon o-comment'></span>
							<span>{comments}</span>
						</li>
					</ul>
				</div>
			) : null}

			{loaded ? null : <div className='gridImg skeleton' />}

			<img
				className='gridImg'
				src={`http://localhost:5000/uploads/posts/${photo}`}
				alt=''
				style={loaded ? {} : { display: "none" }}
				onLoad={() => setLoaded(true)}
			/>
		</div>
	);
};

export default GridImage;

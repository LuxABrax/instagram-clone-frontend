import { useState } from "react";
import { ReactComponent as Carousel } from "../icons/carousel.svg";

import "../styles/profile/gridImage.scss";

const GridImage = ({ post, openModal, isExplore, isBig }) => {
	const [loaded, setLoaded] = useState(false);
	const [overlay, setOverlay] = useState(false);

	const { _id: id, photo, isCarousel, likes, comments, description } = post;

	return (
		<div
			className={`${isExplore ? "image-container" : "postContainer"} ${
				isBig ? "isBig" : ""
			} ${loaded ? "" : "skeleton"}`}
			onClick={async () => {
				openModal(id);
			}}
			onPointerOver={() => setOverlay(true)}
			onPointerLeave={() => setOverlay(false)}
		>
			{isCarousel && (
				<div className='carousel-icon'>
					<Carousel className='icon' />
				</div>
			)}
			{overlay ? (
				<div className='overlay'>
					<ul className='overlay-list'>
						<li className='overlay-li'>
							<span className='o-icon o-heart'></span>
							<span>{likes.length}</span>
						</li>
						<li className='overlay-li'>
							<span className='o-icon o-comment'></span>
							<span>{comments.length}</span>
						</li>
					</ul>
				</div>
			) : null}

			<img
				className={`${isExplore ? "" : "gridImg"}`}
				src={`http://localhost:5000/uploads/posts/${photo}`}
				alt={description}
				style={loaded ? {} : { display: "none" }}
				onLoad={() => setLoaded(true)}
			/>
		</div>
	);
};

export default GridImage;

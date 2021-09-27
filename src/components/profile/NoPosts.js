import camera from "../../images/camera.png";
import "../../styles/profile/noPosts.scss";

const NoPosts = ({ isPopup, username }) => {
	return (
		<div className='noPosts'>
			<div className={`noPosts-container ${isPopup ? "isPopup" : ""}`}>
				<div className={`noPosts-image ${isPopup ? "isPopup" : ""}`}>
					<img src={camera} alt='camera' />
				</div>
				<div className={`noPosts-title ${isPopup ? "isPopup" : ""}`}>
					<h1>No Posts Yet</h1>
				</div>
				{isPopup && <p>When {username} posts, you'll see their photos and videos here</p>}
			</div>
		</div>
	);
};

export default NoPosts;

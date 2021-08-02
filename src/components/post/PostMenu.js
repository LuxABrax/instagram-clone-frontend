import React, { useState } from "react";
import "../../styles/postMenu.scss";
import { ReactComponent as Share } from "../../icons/directShare.svg";
import { ReactComponent as Comment } from "../../icons/comment.svg";
import { ReactComponent as Like } from "../../icons/heart.svg";
import { ReactComponent as LikeActive } from "../../icons/heartActive.svg";
import { ReactComponent as Bookmark } from "../../icons/save.svg";
import { ReactComponent as BookmarkActive } from "../../icons/saveActive.svg";

const PostMenu = () => {
	const [liked, setLiked] = useState(false);
	const [bookmarked, setBookmarked] = useState(false);
	return (
		<div className='postMenu'>
			<div className='interactions'>
				{liked ? (
					<LikeActive
						className='icon'
						onClick={() => setLiked(false)}
						style={{ height: 28 + "px" }}
					/>
				) : (
					<Like
						className='icon'
						onClick={() => setLiked(true)}
						style={{ height: 28 + "px" }}
					/>
				)}
				<Comment className='icon' />
				<Share className='icon' />
			</div>
			{bookmarked ? (
				<BookmarkActive className='icon' onClick={() => setBookmarked(false)} />
			) : (
				<Bookmark className='icon' onClick={() => setBookmarked(true)} />
			)}
		</div>
	);
};

export default PostMenu;

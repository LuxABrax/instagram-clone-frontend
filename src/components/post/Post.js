import React from "react";

const Post = () => {
	return (
		<div className='post__container'>
			<div className='post__header'>
				<img className='avatar' src='' alt='username' />
				<p className='profile-name'>profilename</p>
				<button className='options'>...</button>
			</div>
			<div className='post__content'>
				<img src='' alt='post, carousel or video' />
			</div>
			<div className='post__buttons'>
				<button className='heart'>heart</button>
				<button className='comment'>comment</button>
				<button className='message'>message</button>
				<div className='dots'>dots</div>
				<button className='save'>save</button>
			</div>
			<div className='post__footer'>
				<div className='likes__container'>
					<p>Likes: </p>
					<p>14.083</p>
				</div>
				<div className='description'>
					<div className='description__header'>
						<p className='username'>profilename</p>
						<span>description</span>
					</div>
					<div className='show-comments'>
						<button>Show all 55 comments</button>
					</div>
					<div className='comment__tab'>
						<img className='avatar' alt='username' />
						<input className='comment-input' placeholder='Add a comment...' />
						<div className='reactions'>
							<button>heart</button>
							<button>hands</button>
							<button>plus</button>
						</div>
					</div>
					<div className='post__time'>1 day ago</div>
				</div>
			</div>
		</div>
	);
};

export default Post;

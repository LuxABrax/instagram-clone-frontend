import "../../styles/profile/postModal.scss";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/modalSlice";

import ProfileComp from "../ProfileComp";
import PostMenu from "../post/PostMenu";
import Comment from "../post/Comment";
import AddComment from "../post/AddComment";
import { ReactComponent as More } from "../../icons/more.svg";

const PostModal = props => {
	const { accountName, image, comments, likedByText, likedByNumber, hours } =
		props;

	const { push } = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	}, []);

	function closeModal() {
		dispatch(toggleModal());
		push(`/profile/${accountName}`);
	}
	return (
		<div className='postModal'>
			<div className='background' onClick={() => closeModal()}></div>
			<div className='modalContent'>
				<img src={image} alt='' />
				<div className='postDesc'>
					<header>
						<ProfileComp iconSize='medium' username={accountName} />
						<More className='moreBtn' />
					</header>
					<div className='postDescBody'>
						<div className='comments'>
							{comments.map(comment => {
								return (
									<Comment
										key={comment.id}
										accountName={comment.user}
										comment={comment.text}
									/>
								);
							})}
						</div>
						<PostMenu />
						<div className='likedBy'>
							<ProfileComp iconSize='small' hideAccountName={true} />
							<span>
								Liked by <strong>{likedByText}</strong> and{" "}
								<strong>{likedByNumber} others</strong>
							</span>
						</div>
						<div className='timePosted'>{hours} HOURS AGO</div>
						<AddComment />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostModal;

import { useEffect } from "react";
import PostMenu from "../post/PostMenu";
import ProfileComp from "../ProfileComp";
import "../../styles/postModal.scss";

import { ReactComponent as More } from "../../icons/more.svg";
import { ReactComponent as Emoji } from "../../icons/emoji.svg";
import Comment from "../post/Comment";
import Post from "../post/Post";
import { toggleModal } from "../../features/modalSlice";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const PostModal = props => {
	const { accountName, image, comments, likedByText, likedByNumber, hours } =
		props;
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	}, []);
	const { push } = useHistory();
	const dispatch = useDispatch();

	function closeModal() {
		dispatch(toggleModal());
		push(`/profile/${accountName}`);
	}
	return (
		<div className='postModal' onClick={() => closeModal()}>
			<Post
				accountName='luxabrax'
				storyBorder={true}
				image='https://picsum.photos/600'
				comments={comments}
				likedByText='breskvica'
				likedByNumber={1929}
				hours={2}
			/>
		</div>
	);
};

export default PostModal;

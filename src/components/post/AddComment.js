import "../../styles/addComment.scss";
import { ReactComponent as Emoji } from "../../icons/emoji.svg";

const AddComment = () => {
	return (
		<div className='addComment'>
			<Emoji className='icon' />
			<div className='commentText'>Add a comment...</div>
			<div className='postText'>POST</div>
		</div>
	);
};

export default AddComment;

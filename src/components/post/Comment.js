import { useHistory } from "react-router";
import "../../styles/post/comment.scss";

const Comment = props => {
	const { accountName, comment } = props;
	const { push } = useHistory();

	const goToAccount = () => {
		push(`/profile/${accountName}`);
	};

	return (
		<div className='commentContainer'>
			<div className='accountName' onClick={goToAccount}>
				{accountName}
			</div>
			<div className='comment'>{comment}</div>
		</div>
	);
};

export default Comment;

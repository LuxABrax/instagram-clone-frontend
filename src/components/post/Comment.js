import { useHistory } from "react-router";
import PopupTrigger from "../PopupTrigger";
import "../../styles/post/comment.scss";

const Comment = props => {
	const { id, uid, accountName, comment } = props;
	const { push } = useHistory();

	const goToAccount = () => {
		push(`/profile/${accountName}`);
	};

	return (
		<div className='commentContainer'>
			<div className='accountName' onClick={goToAccount}>
				<PopupTrigger
					id={id}
					username={accountName}
					uid={uid}
					hoveredEl={"comm"}
				>
					{accountName}
				</PopupTrigger>
			</div>
			<div className='comment'>{comment}</div>
		</div>
	);
};

export default Comment;

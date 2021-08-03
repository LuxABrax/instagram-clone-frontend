import "../../styles/profMenu.scss";
import { ReactComponent as ArrDown } from "../../icons/arrDown.svg";

const ProfileMenu = () => {
	return (
		<div className='profileMenu'>
			<button className='message'>Message</button>
			<button className='follow'>Follow</button>
			<button>
				<ArrDown className='arr' />
			</button>
		</div>
	);
};

export default ProfileMenu;

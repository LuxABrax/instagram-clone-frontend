import ProfileIcon from "../ProfileIcon";
import "../../styles/navigation/searchedUser.scss";

const SearchedUser = ({ sUser }) => {
	const { name, fullName, photo, followers } = sUser;
	return (
		<div className='searched-user'>
			<ProfileIcon
				image={`http://localhost:5000/uploads/${photo}`}
				iconSize='mediumX'
			/>
			<div className='searched-title'>
				<p className='username'>{name}</p>
				<p className='fullName'>{`${fullName} • Followed by ${followers} people`}</p>
			</div>
		</div>
	);
};

export default SearchedUser;

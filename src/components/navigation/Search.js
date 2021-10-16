import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../../redux/authSlice";
import {
	getNotFollowedUsers,
	selectFollowedUsers,
	selectNotFollowedUsers,
} from "../../redux/usersSlice";

import SearchedUser from "./SearchedUser";

import "../../styles/navigation/search.scss";

const Search = () => {
	const [focus, setFocus] = useState(false);
	const [searchedText, setSearchedText] = useState("");
	const [searchedUsers, setSearchedUsers] = useState([]);

	const { _id } = useSelector(selectUser);
	const fUsers = useSelector(selectFollowedUsers);
	const nfUsers = useSelector(selectNotFollowedUsers);
	const users = [...fUsers, ...nfUsers];

	const { push } = useHistory();
	const dispatch = useDispatch();

	function removeDuplicates(data, key) {
		return [...new Map(data.map(item => [key(item), item])).values()];
	}

	const filterSearch = text => {
		const filtered = users.filter(
			u => u.name.indexOf(text.toLowerCase()) !== -1
		);
		const fil = removeDuplicates(filtered, item => item._id);
		setSearchedUsers(fil);
	};

	const handleChange = e => {
		const text = e.target.value;
		setSearchedText(text);
		filterSearch(text);
	};

	const handleClick = name => {
		setSearchedText("");
		setFocus(false);
		push(`/profile/${name}`);
	};

	useEffect(() => {
		if (nfUsers.length === 0) dispatch(getNotFollowedUsers(_id));
	}, [nfUsers, dispatch, _id]);

	return (
		<div className='search'>
			{!focus && (
				<>
					<img
						className='searchIcon'
						src='/images/search.png'
						alt='search icon'
					/>
					<span className='searchText'>
						{searchedText.length > 0 ? searchedText : "Search"}
					</span>
				</>
			)}

			<input
				type='text'
				autoCapitalize='none'
				autoComplete='false'
				placeholder='Search'
				className={`${focus ? "focused" : ""}`}
				value={searchedText}
				onChange={handleChange}
				onFocus={() => {
					setFocus(true);
				}}
			/>

			{focus && (
				<>
					<div
						className='cancel'
						onClick={() => {
							setSearchedText("");
							setFocus(false);
						}}
					></div>

					<div className='backdrop' onClick={() => setFocus(false)}></div>
				</>
			)}

			<div className={`dropdown-container ${focus ? "shown" : ""}`}>
				{focus && (
					<>
						<div className='triangle'></div>
						<div className='search-dropdown'>
							<ul>
								{searchedUsers.map((user, index) => {
									if (index > 53) return null;
									return (
										<li key={user._id} onClick={() => handleClick(user.name)}>
											<SearchedUser sUser={user} />
										</li>
									);
								})}
							</ul>
							<div className='dropdown-blur'></div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Search;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../../redux/authSlice";
import { getFollowedUsers, getNotFollowedUsers } from "../../redux/usersSlice";

import SearchedUser from "./SearchedUser";
import { ReactComponent as Close } from "../../icons/close.svg";

import "../../styles/navigation/search.scss";
import {
	getSearches,
	addSearch,
	removeSearches,
	removeSearch,
} from "../../redux/searchesSlice";

const Search = () => {
	const [focus, setFocus] = useState(false);
	const [users, setUsers] = useState([]);
	const [searchedText, setSearchedText] = useState("");
	const [searchedUsers, setSearchedUsers] = useState([]);

	const { _id } = useSelector(selectUser);
	const { status, searches } = useSelector(state => state.searches);
	const {
		status: usersStatus,
		followedUsers: fUsers,
		notFollowedUsers: nfUsers,
	} = useSelector(state => state.users);

	const getRecent = () => {
		const recent = users.filter(u => searches.includes(u._id));
		const rec = removeDuplicates(recent, item => item._id);
		setSearchedUsers(rec);
	};

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

	const handleFocus = () => {
		if (searchedText.length === 0) getRecent();
		setFocus(true);
	};

	const handleChange = e => {
		const text = e.target.value;
		setSearchedText(text);
		if (text.length === 0) {
			getRecent();
			return;
		}
		filterSearch(text);
	};

	const handleClick = async (name, id) => {
		await dispatch(addSearch({ userId: _id, sId: id }));
		setSearchedText("");
		setFocus(false);
		push(`/profile/${name}`);
	};

	const handleRemove = (e, id) => {
		e.stopPropagation();
		setSearchedUsers(s => s.filter(su => su._id !== id));
		dispatch(removeSearch({ userId: _id, sId: id }));
	};

	const handleRemoveAll = () => {
		setSearchedUsers([]);
		dispatch(removeSearches(_id));
	};

	useEffect(() => {
		if (status === "idle") dispatch(getSearches(_id));
	}, [status, _id, dispatch]);

	useEffect(() => {
		const statusArr = [
			"getting fUsers",
			"getting nfUsers",
			"get nfUsers success",
		];
		const getNFU = async () => {
			await dispatch(getNotFollowedUsers(_id));
		};
		const getFU = async () => {
			await dispatch(getFollowedUsers(_id));
		};
		if (nfUsers.length === 0 && !statusArr.includes(usersStatus)) getNFU();
		if (fUsers.length === 0 && !statusArr.includes(usersStatus)) getFU();
	}, [users, setUsers, usersStatus, nfUsers, fUsers, _id, dispatch]);

	useEffect(() => {
		if (nfUsers.length > 0) {
			setUsers(u => [...u, ...nfUsers]);
		}
	}, [nfUsers, setUsers]);

	useEffect(() => {
		if (fUsers.length > 0) {
			setUsers(u => [...u, ...fUsers]);
		}
	}, [fUsers, setUsers]);

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
				onFocus={handleFocus}
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
							<div className='search-scroll-container'>
								{searchedText.length === 0 && (
									<div className='search-header'>
										<h4>Recent</h4>
										<button onClick={handleRemoveAll}>Clear All</button>
									</div>
								)}
								{searchedUsers.length === 0 ? (
									<div className='noRecent-container'>
										<h5>No recent searches.</h5>
									</div>
								) : (
									<ul>
										{searchedUsers.map((user, index) => {
											if (index > 53) return null;
											return (
												<li
													key={user._id}
													onClick={() => handleClick(user.name, user._id)}
												>
													<SearchedUser sUser={user} />
													{searchedText.length === 0 && (
														<button
															onClick={e => {
																handleRemove(e, user._id);
															}}
														>
															<Close className='close' />
														</button>
													)}
												</li>
											);
										})}
									</ul>
								)}
							</div>

							<div className='dropdown-blur'></div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Search;

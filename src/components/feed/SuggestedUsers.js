import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../utils/windowHook";
import BezierEasing from "bezier-easing";
import SuggestedUser from "./SuggestedUser";

import "../../styles/feed/suggestedUsers.scss";

const SuggestedUsers = () => {
	const prevScrollX = useRef(0);
	const [suggestions, setSuggestions] = useState([]);
	const [leftArrow, setLeftArrow] = useState(false);
	const [rightArrow, setRightArrow] = useState(true);

	const users = useSelector(state => state.users.notFollowedUsers);

	const { width } = useWindowDimensions();

	if (users.length > 0 && suggestions.length === 0) {
		// dispatch(getNotFollowedUsers(user._id));
		setSuggestions([...users]);
	}

	const setArrows = (currentScrollX, totalWidth, parentWidth) => {
		let cardWidth = width <= 735 ? 161 : 200;
		const cardOffset = cardWidth / 2 + 12;

		if (currentScrollX >= cardOffset && !leftArrow) setLeftArrow(true);
		if (currentScrollX < cardOffset && leftArrow) setLeftArrow(false);

		if (currentScrollX < totalWidth - parentWidth - cardOffset && !rightArrow)
			setRightArrow(true);
		if (currentScrollX >= totalWidth - parentWidth - cardOffset && rightArrow)
			setRightArrow(false);
	};

	let easing = BezierEasing(0.215, 0.61, 0.355, 1);

	const easeScroll = left => {
		const list = document.getElementById("suggested-list");

		for (let i = 0; i <= 1.01; i += 0.01) {
			let scrollPos;
			let scrollLength = width <= 735 ? 483 : 600;
			let scrollStart = prevScrollX.current;
			let eI = easing(i);
			let eIT = left ? 500 * eI : 700 * eI;

			if (list.offsetWidth < 400) scrollLength = 322;
			setTimeout(() => {
				if (left) {
					scrollPos = scrollStart - scrollLength * eI;
				} else {
					scrollPos = scrollStart + scrollLength * eI;
				}

				if (eI >= 1) {
					scrollPos = left
						? scrollStart - scrollLength
						: scrollStart + scrollLength;
				}
				list.scrollLeft = scrollPos;

				if (eI >= 1) {
					prevScrollX.current = list.scrollLeft;
				}
			}, eIT);
		}
	};

	const onScroll = e => {
		const currentScrollX = e.target.scrollLeft;
		const totalWidth = e.target.scrollWidth;
		const parentWidth = e.target.offsetWidth;

		setArrows(currentScrollX, totalWidth, parentWidth);
	};

	const removeFromS = id => {
		if (suggestions.length === 1) {
			setSuggestions(suggestions.pop());
		} else {
			setSuggestions(s => {
				return s.filter(sU => sU._id !== id);
			});
		}
	};

	return (
		<div className='suggestedUsers'>
			<div className='suggested-header'>
				<span>Suggested for you</span>
				<button className='text-btn'>See all</button>
			</div>

			<div className='suggested-list-container'>
				<ul
					className='suggested-list scroll'
					id='suggested-list'
					onScroll={onScroll}
				>
					<li key='0' className='spacing-li'></li>
					{suggestions.length > 0 &&
						suggestions.map((suggestedUser, i) => {
							return (
								<li key={suggestedUser._id} className='suggestedUser-container'>
									<SuggestedUser
										id={suggestedUser._id}
										username={suggestedUser.name}
										name={suggestedUser.fullName}
										image={suggestedUser.photo}
										caption={`Followed by ${suggestedUser.followers} people`}
										removeFromS={removeFromS}
									/>
								</li>
							);
						})}
					<li key='1' className='spacing-li'></li>
				</ul>

				<button
					className={`arrowBtn left ${leftArrow ? "" : "hide"}`}
					onClick={() => {
						easeScroll(true);
					}}
				>
					<div className='arrBack'></div>
				</button>

				<button
					className={`arrowBtn right ${
						rightArrow && suggestions.length > 3 ? "" : "hide"
					}`}
					onClick={() => {
						easeScroll(false);
					}}
				>
					<div className='arrBack rightArr'></div>
				</button>
			</div>
		</div>
	);
};

export default SuggestedUsers;

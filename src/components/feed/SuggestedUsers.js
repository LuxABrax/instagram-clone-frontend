import { useRef, useState } from "react";
import useWindowDimensions from "../../utils/windowHook";

import SuggestedUser from "./SuggestedUser";

import "../../styles/feed/suggestedUsers.scss";

const SuggestedUsers = () => {
	const prevScrollX = useRef(0);
	const [goingRight, setGoingRight] = useState(false);
	const [leftArrow, setLeftArrow] = useState(false);
	const [rightArrow, setRightArrow] = useState(true);

	const { width } = useWindowDimensions();

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

	const handleArrow = () => {
		const list = document.getElementById("suggested-list");
		list.scrollLeft = 0;
	};

	const onScroll = e => {
		const currentScrollX = e.target.scrollLeft;
		const totalWidth = e.target.scrollWidth;
		const parentWidth = e.target.offsetWidth;

		setArrows(currentScrollX, totalWidth, parentWidth);

		if (prevScrollX.current < currentScrollX && !goingRight) {
			setGoingRight(true);
		}
		if (prevScrollX.current > currentScrollX && goingRight) {
			setGoingRight(false);
		}
		prevScrollX.current = currentScrollX;
		// console.log(goingRight, currentScrollX);
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
					<li className='spacing-li'></li>
					<li className='suggestedUser-container'>
						<SuggestedUser />
					</li>
					<li className='suggestedUser-container'>
						<SuggestedUser />
					</li>
					<li className='suggestedUser-container'>
						<SuggestedUser />
					</li>
					<li className='suggestedUser-container'>
						<SuggestedUser />
					</li>
					<li className='suggestedUser-container'>
						<SuggestedUser />
					</li>
					<li className='suggestedUser-container'>
						<SuggestedUser />
					</li>
					<li className='spacing-li'></li>
				</ul>
				<button
					className={`arrowBtn left ${leftArrow ? "" : "hide"}`}
					onClick={handleArrow}
				>
					<div className='arrBack'></div>
				</button>
				<button className={`arrowBtn right ${rightArrow ? "" : "hide"}`}>
					<div className='arrBack rightArr'></div>
				</button>
			</div>
		</div>
	);
};

export default SuggestedUsers;

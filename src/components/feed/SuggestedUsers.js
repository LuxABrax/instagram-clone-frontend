import { useRef, useState } from "react";
import useWindowDimensions from "../../utils/windowHook";
import BezierEasing from "bezier-easing";
import SuggestedUser from "./SuggestedUser";

import "../../styles/feed/suggestedUsers.scss";

const SuggestedUsers = () => {
	const prevScrollX = useRef(0);
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

	let easing = BezierEasing(0.215, 0.61, 0.355, 1);

	const easeScroll = left => {
		const list = document.getElementById("suggested-list");

		for (let i = 0; i <= 1.01; i += 0.01) {
			let scrollPos;
			let scrollLength = width <= 735 ? 483 : 600;
			let scrollStart = prevScrollX.current;
			let eI = easing(i);
			let eIT = left ? 500 * eI : 700 * eI;

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
					onClick={() => {
						easeScroll(true);
					}}
				>
					<div className='arrBack'></div>
				</button>
				<button
					className={`arrowBtn right ${rightArrow ? "" : "hide"}`}
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
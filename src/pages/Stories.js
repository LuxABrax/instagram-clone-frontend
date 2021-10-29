import { useEffect } from "react";
import useWindowDimensions from "../utils/windowHook";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import StoryCard from "../components/stories/StoryCard";
import { ReactComponent as Close } from "../icons/close.svg";

import "../styles/pages/stories.scss";

const Stories = () => {
	const { pName } = useParams();

	const { seen, filtered } = useSelector(state => state.stories);
	const { width } = useWindowDimensions();

	const { push } = useHistory();

	const handleClose = () => {
		push("/");
	};

	useEffect(() => {
		document.title = "Stories • Instagram Plus";
		return () => {
			document.title = "Instagram Plus";
		};
	}, []);

	return (
		<div className='stories-page' style={{ display: "flex" }}>
			<div className='stories-top'>
				<div className='logoContainer' onClick={handleClose}>
					<img
						className='logo'
						src='/images/instagram-logo-white.png'
						alt='instagram logo'
					/>
				</div>
				<button onClick={handleClose}>
					<Close />
				</button>
			</div>
			<div className='stories-container'>
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => {
					return (
						<div
							className='line'
							style={{ transform: `translateX(${(width * (n + 1)) / 12}px)` }}
						></div>
					);
				})}
				{seen
					? filtered.map((s, idx) => {
							return (
								<StoryCard
									idx={idx}
									story={s}
									username={s.user.name}
									active={s.user.name === pName}
								/>
							);
					  })
					: filtered.map((s, idx) => {
							if (s.user.hasUnseen)
								return (
									<StoryCard
										idx={idx}
										story={s}
										username={s.user.name}
										active={s.user.name === pName}
										onlyUnseen={true}
									/>
								);
							return null;
					  })}
			</div>
		</div>
	);
};

export default Stories;

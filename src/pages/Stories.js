import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import StoryCard from "../components/stories/StoryCard";
import { ReactComponent as Close } from "../icons/close.svg";

import "../styles/pages/stories.scss";

const Stories = () => {
	const { pName } = useParams();

	const { seen, filtered, activeIdx } = useSelector(state => state.stories);

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
				{
					<>
						{activeIdx.userIdx - 2 >= 0 && (
							<StoryCard
								idx={activeIdx.userIdx - 2}
								story={filtered[activeIdx.userIdx - 2]}
								username={filtered[activeIdx.userIdx - 2].user.name}
								active={filtered[activeIdx.userIdx - 2].user.name === pName}
								onlyUnseen={!seen}
							/>
						)}
						{activeIdx.userIdx - 1 >= 0 && (
							<StoryCard
								idx={activeIdx.userIdx - 1}
								story={filtered[activeIdx.userIdx - 1]}
								username={filtered[activeIdx.userIdx - 1].user.name}
								active={filtered[activeIdx.userIdx - 1].user.name === pName}
								onlyUnseen={!seen}
							/>
						)}
						<StoryCard
							idx={activeIdx.userIdx}
							story={filtered[activeIdx.userIdx]}
							username={filtered[activeIdx.userIdx].user.name}
							active={true}
							onlyUnseen={!seen}
						/>
						{activeIdx.userIdx + 2 < filtered.length && (
							<StoryCard
								idx={activeIdx.userIdx + 2}
								story={filtered[activeIdx.userIdx + 2]}
								username={filtered[activeIdx.userIdx + 2].user.name}
								active={filtered[activeIdx.userIdx + 2].user.name === pName}
								onlyUnseen={!seen}
								hide={
									filtered[activeIdx.userIdx + 2].user.hasUnseen === false &&
									!seen
										? true
										: false
								}
							/>
						)}
						{activeIdx.userIdx + 1 < filtered.length && (
							<StoryCard
								idx={activeIdx.userIdx + 1}
								story={filtered[activeIdx.userIdx + 1]}
								username={filtered[activeIdx.userIdx + 1].user.name}
								active={filtered[activeIdx.userIdx + 1].user.name === pName}
								onlyUnseen={!seen}
								hide={
									filtered[activeIdx.userIdx + 1].user.hasUnseen === false &&
									!seen
										? true
										: false
								}
							/>
						)}
					</>
				}
			</div>
		</div>
	);
};

export default Stories;

import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import StoryCard from "../components/stories/StoryCard";
import { ReactComponent as Close } from "../icons/close.svg";

import "../styles/pages/stories.scss";

const Stories = () => {
	const { pName, storyId } = useParams();

	const { seen, filtered, activeIdx } = useSelector(state => state.stories);
	const { push } = useHistory();

	return (
		<div className='stories-page' style={{ display: "flex" }}>
			<div className='stories-top'>
				<div
					className='logoContainer'
					onClick={() => {
						push("/");
					}}
				>
					<img
						className='logo'
						src='/images/instagram-logo.png'
						alt='instagram logo'
					/>
				</div>
				<p>
					Stories {pName} {storyId}
				</p>
				<button
					onClick={() => {
						push("/");
					}}
				>
					<Close />
				</button>
			</div>
			<div className='stories-container'>
				{seen
					? filtered.map((s, idx) => {
							return (
								<StoryCard
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
										story={s}
										username={s.user.name}
										active={s.user.name === pName}
									/>
								);
							return null;
					  })}
			</div>
		</div>
	);
};

export default Stories;

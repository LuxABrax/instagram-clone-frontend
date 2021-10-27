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
						src='/images/instagram-logo.png'
						alt='instagram logo'
					/>
				</div>
				<button onClick={handleClose}>
					<Close />
				</button>
			</div>
			<div className='stories-container'>
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

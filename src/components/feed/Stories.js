import "../../styles/feed/stories.scss";
import Story from "./Story";

const Stories = () => {
	return (
		<div className='stories'>
			<div className='scroll'>
				<Story />
				<Story seen={true} />
				<Story seen={true} />
				<Story />
				<Story seen={true} />
				<Story />
				<Story />
				<Story />
				<Story />
				<Story />
				<Story />
				<Story />
				<Story />
				<Story />
				<Story />
				<Story />
				<Story />
				<Story />
			</div>
		</div>
	);
};

export default Stories;

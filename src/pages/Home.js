import "../styles/pages/home.scss";

import Feed from "../components/feed/Feed";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='home'>
			<div className='container'>
				<Feed />
				<Sidebar />
			</div>
		</div>
	);
};

export default Home;

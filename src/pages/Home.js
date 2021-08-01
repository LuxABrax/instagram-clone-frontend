import React from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import "../styles/home.scss";

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

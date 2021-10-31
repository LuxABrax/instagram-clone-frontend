import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "./redux/authSlice";
import { useLocation } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import Stories from "./pages/Stories";
import Messages from "./pages/Meassages";

import "./styles/App.scss";

function App() {
	const loggedIn = useSelector(selectLoggedIn);
	let routes;

	let location = useLocation();

	if (!loggedIn) {
		routes = (
			<Switch>
				<Route path='/login' exact>
					<Login />
				</Route>
				<Redirect to='/login' />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/direct/inbox' exact>
					<Messages />
				</Route>
				<Route path='/direct/t/:roomId' exact>
					<Messages />
				</Route>
				<Route path='/explore' exact>
					<Explore />
				</Route>
				<Route path='/profile/:pName' exact>
					<Profile />
				</Route>
				<Route path='/profile/:pName/saved' exact>
					<Profile />
				</Route>
				<Route path='/profile/:pName/feed' exact>
					<Profile />
				</Route>
				<Route path='/profile/:pName/p/:pId' exact>
					<Profile />
				</Route>
				<Route path='/accounts/:type' exact>
					<Settings />
				</Route>
				<Route path='/stories/:pName/:storyId' exact>
					<Stories />
				</Route>
				<Redirect to='/' />
			</Switch>
		);
	}

	return (
		<div className='App'>
			<Navigation />
			<main
				className={
					location.pathname.substring(1, 8) === "stories" ? "noMargin" : ""
				}
			>
				{routes}
			</main>
		</div>
	);
}

export default App;

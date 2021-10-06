import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import "./styles/App.scss";
import Navigation from "./components/navigation/Navigation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "./redux/authSlice";

function App() {
	const loggedIn = useSelector(selectLoggedIn);
	// if (!loggedIn) return <Login setLoggedIn={setLoggedIn} />;
	let routes;
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
				<Redirect to='/' />
			</Switch>
		);
	}

	return (
		<div className='App'>
			<Router>
				<Navigation />
				<main>{routes}</main>
			</Router>
		</div>
	);
}

export default App;

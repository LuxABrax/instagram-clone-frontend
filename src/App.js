import React from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";

import "./styles/App.scss";
import Navigation from "./components/Navigation";
import CounterPage from "./pages/CounterPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
	return (
		<div className='App'>
			<Router>
				<Navigation />
				<Switch>
					<Route path='/' exact>
						<Home />
					</Route>
					<Route path='/counter' exact>
						<CounterPage />
					</Route>
					<Route path='/profile' exact>
						<Profile />
					</Route>
					<Redirect to='/' />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

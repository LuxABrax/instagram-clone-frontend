import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";

import "./styles/App.scss";
import Navigation from "./components/navigation/Navigation";
import CounterPage from "./pages/CounterPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
	return (
		<div className='App'>
			<Router>
				<Navigation />
				<main>
					<Switch>
						<Route path='/' exact>
							<Home />
						</Route>
						<Route path='/counter' exact>
							<CounterPage />
						</Route>
						<Route path='/profile/:pName' exact>
							<Profile />
						</Route>
						<Route path='/profile/:pName/p/:pId' exact>
							<Profile />
						</Route>
						<Redirect to='/' />
					</Switch>
				</main>
			</Router>
		</div>
	);
}

export default App;

import './App.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import HomePage from "./components/homePage";
import AdvancedSearch from './components/advancedSearch';
import SignIn from './components/signIn';
import SavedSearches from './components/savedSearches';
import ReSavedSearches from './components/reSavedSearches';
import Results from './components/results';
import ReResults from './components/reresults';
import ProtectedRoute from './components/ProtectedRoute';

//This is where the single page application structure is built, it has all the routing and the nav bar at the top of the page, all pages are shown in the Switch below
function App() {
  return (
	  <Router>
		<div className="App">
			<div>
				<div className="content-wrapper">
					<div className="nav-bar-wrapper">
					<nav className= "home-link"><Link to="/" style = {{textDecoration: 'none', color: 'white', float: 'left', marginTop: '15px', marginLeft: '25px', textTransform: 'uppercase'}}>Home</Link></nav>
					{/*This ProtectedRoute swaps between the "sign in" and "searches" button depending on whether there is a person signed in or not*/}
					<ProtectedRoute>
					</ProtectedRoute> 
						<div className="menu-icon"></div>
						</div>
						<Switch>
							<Route path="/advancedSearch"> <AdvancedSearch /> </Route>
							<Route path="/results"> <Results /> </Route>
							<Route path="/reresults"> <ReResults /> </Route>
							<Route path="/signIn"> <SignIn /> </Route>
							<Route path="/savedSearches"> <SavedSearches /> </Route>
							<Route path="/ReSavedSearches"> <ReSavedSearches /> </Route>
							<Route path="/"> <HomePage /> </Route>
						</Switch>
						<div className= "bottom-nav-bar">
						<footer>
							<div className="col left">
								<p className="goal-header">Our Goal:</p>
								<p className= "goal-text">To provide an interface to graph results from the OCLC Catalog to use for research</p>
							</div>
							<div className="col center">Contact us: percariouscielingfan@gmail.com</div>
							<div className= "col right">Copyright : 2021</div>
						</footer>
						</div>
				</div>
			</div>
		</div>
	</Router>
  ); 
}

export default App;
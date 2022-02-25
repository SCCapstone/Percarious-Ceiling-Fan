import './App.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import HomePage from "./components/homePage";
import AdvancedSearch from './components/advancedSearch';
import SignIn from './components/signIn';
import Results from './components/results';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
	  <Router>
		<div className="App">
			<div>
				<div class="content-wrapper">
					<div class="nav-bar-wrapper">
					<nav class = "home-link"><Link to="/" style = {{textDecoration: 'none', color: 'white', float: 'left', marginTop: '15px', marginLeft: '25px', textTransform: 'uppercase'}}>Home</Link></nav>
					<nav class = "home-link"><Link to="/signIn" style = {{textDecoration: 'none', color: 'white', float: 'left', marginTop: '15px', marginLeft: '35px', textTransform: 'uppercase'}}>Sign In</Link></nav>
						<div class="menu-icon"></div>
						</div>
						<AuthContextProvider>
						<Switch>
							<Route path="/advancedSearch"> <AdvancedSearch /> </Route>
							<Route path="/results"> <Results /> </Route>
							<Route path="/signIn"> <SignIn /> </Route>
							<Route path="/"> <HomePage /> </Route>
						</Switch>
						</AuthContextProvider>
						<div class = "bottom-nav-bar">
						<footer>
							<div class ="col left">
								<p class ="goal-header">Our Goal:</p>
								<p class = "goal-text">To provide an interface to graph results from the OCLC Catalog to use for research</p>
							</div>
							<div class ="col center">Contact us: percariouscielingfan@gmail.com</div>
							<div class = "col right">Copyright : 2021</div>
						</footer>
						</div>
				</div>
			</div>
		</div>
	</Router>
  );
}

export default App;
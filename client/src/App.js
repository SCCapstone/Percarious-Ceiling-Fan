import './App.css';
import { BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
import HomePage from "./components/homePage";
import AdvancedSearch from './components/advancedSearch';
import Results from './components/results';

function App() {
  return (
	  <Router>
		<div className="App">
			<div>
				<div class="content-wrapper">
					<div class="nav-bar-wrapper">
					<nav class = "home-link"><Link to="/" style = {{textDecoration: 'none', color: 'white'}}>Home</Link></nav>
						<div class="menu-icon"></div>
						</div>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/advancedsearch" element={<AdvancedSearch />} />
							<Route path="/results" element={<Results />} />
						</Routes>
						<div class = "bottom-nav-bar">
						<footer>
							<div class ="col left">
								<p class ="goal-header">Our Goal:</p>
								<p class = "goal-text">To provide an interface to graph results from the OCLC Catalog to use for research</p>
							</div>
							<div class ="col center">Contact us: testEmail@gmail.com</div>
							<div class = "col right">Copyright:2021 hi evan</div>
						</footer>
						</div>
				</div>
			</div>
		</div>
	</Router>
  );
}

export default App;

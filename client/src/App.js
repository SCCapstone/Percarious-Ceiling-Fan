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
					<nav class = "home-link"><Link to="/">Home</Link></nav>
						<div class="menu-icon"></div>
						</div>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/advancedsearch" element={<AdvancedSearch />} />
							<Route path="/results" element={<Results />} />
						</Routes>
						<div class = "bottom-nav-bar">
						<footer>
							<p class ="left">Our Goal: FILL IN </p>
							<p class ="center">Contact us: testEmail@gmail.com</p>
							<p class = "right">Copyright:2021</p>
						</footer>
						</div>
				</div>
			</div>
		</div>
	</Router>
  );
}

export default App;

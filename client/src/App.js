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
					<nav><Link to="/">Home</Link></nav>
						<div class="menu-icon"></div>
						</div>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/advancedsearch" element={<AdvancedSearch />} />
							<Route path="/results" element={<Results />} />
						</Routes>
						<div class="bottom-nav-bar">
						<div class="left-side">
							<p class="goal-header">Our goal:</p>
							<p>blah blah blah info info info</p>
						</div>
						<div class="right-side">
							<p class="contact-header">Contact Us:</p>
							<p>#2709 : testEmail@gmail.com</p>
							<p>#</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Router>
  );
}

export default App;

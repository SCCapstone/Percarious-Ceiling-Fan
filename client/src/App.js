import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./components/homePage";
import AdvancedSearch from './components/advancedSearch';
import Results from './components/results';

function App() {
  return (
    <div className="App">
		<div>
		<div class="content-wrapper">
		<div class="nav-bar-wrapper">
		<div class="menu-icon"></div>
		</div>
		<BrowserRouter>
		<Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/advancedsearch" element={<AdvancedSearch />} />
		  <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
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
  );
}

export default App;

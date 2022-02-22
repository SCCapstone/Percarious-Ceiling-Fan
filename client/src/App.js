import './App.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import HomePage from "./components/homePage";
import AdvancedSearch from './components/advancedSearch';
import Results from './components/results';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyApxySs35Gvjx5ImJpPsi5YQgLGUIGuA9Q",
	authDomain: "oclc-advanced-search-system.firebaseapp.com",
	projectId: "oclc-advanced-search-system",
	storageBucket: "oclc-advanced-search-system.appspot.com",
	messagingSenderId: "683111933545",
	appId: "1:683111933545:web:48f08c8e006652439224f8",
	measurementId: "G-NPEH2715VT"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

function App() {
  return (
	  <Router>
		<div className="App">
			<div>
				<div class="content-wrapper">
					<div class="nav-bar-wrapper">
					<nav class = "home-link"><Link to="/" style = {{textDecoration: 'none', color: 'white', float: 'left', marginTop: '15px', marginLeft: '25px', textTransform: 'uppercase'}}>Home</Link></nav>
						<div class="menu-icon"></div>
						</div>
						<Switch>
							<Route path="/advancedSearch"> <AdvancedSearch /> </Route>
							<Route path="/results"> <Results /> </Route>
							<Route path="/"> <HomePage /> </Route>
						</Switch>
						<div class = "bottom-nav-bar">
						<footer>
							<div class ="col left">
								<p class ="goal-header">Our Goal:</p>
								<p class = "goal-text">To provide an interface to graph results from the OCLC Catalog to use for research</p>
							</div>
							<div class ="col center">Contact us: testEmail@gmail.com</div>
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
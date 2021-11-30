//import '../../public/styles.css'
import React from 'react';
import axios from "axios"; //for SQL command stuff

class AdvancedSearch extends React.Component{
	state = {
		connection: "",
		anyWords: "",
		exactPhrase: "",
		exclude: "",
		tags: "",
		startYear: "",
		endYear: "",
		languages: "",
		regions: ""
	}

	componentDidMount() {
		console.log('this runs');
		this.getConnectionTest();
	};

	getConnectionTest = () => {
		axios.get('http://localhost:3001/')
		.then((response) => response.data)
		.then(response => {this.setState({connection: response})})
	};

	onSubmitClick = () => {
		axios.get('http://localhost:3001/advancedSearch',{
			params: {
				anyWords: this.state.anyWords,
				exactPhrase: this.state.exactPhrase,
				exclude: this.state.exclude,
				tags: this.state.tags,
				startYear: this.state.startYear,
				endYear: this.state.endYear,
				languages: this.state.languages,
				regions: this.state.regions
			}
		})
		.then((response) => response.data)
		.then(response => {this.setState({results: response})}) //results from advancedSearch
		//need to route to results page with this.results info
	}

	render() {
		return (
		<div>
		<title>Advanced Search</title>
		<body>
			<div class = "advanced-search-body">
			<div id="search-list">
				<div attribute="searchTerms">
					
				</div>
				<div class = "any-words" attribute="searchTerms">
					<p attribute="searchPrompt">Any of these words:</p>
					<input attribute = "searchInput" id= "anyWords" value={this.state.anyWords} onChange={e => this.setState({ anyWords: e.target.value})}></input>
				</div>
				<div attribute="searchTerms" class = "exact-words">
					<p attribute="searchPrompt">Exact words or phrases:</p>
					<input attribute = "searchInput" id="exactPhrase" value={this.state.exactPhrase} onChange={e => this.setState({ exactPhrase: e.target.value})}></input>
				</div>
				<div attribute="searchTerms" class ="exclude-words">
					<p attribute="searchPrompt">None of these words:</p>
					<input attribute = "searchInput" id="exclude" value={this.state.exclude} onChange={e => this.setState({ exclude: e.target.value})}></input>
				</div>
				<div attribute="searchTerms" class = "query-tag">
					<p attribute="searchPrompt">Tags to query:</p>
					<input attribute = "searchInput" id="tags" value={this.state.tags} onChange={e => this.setState({ tags: e.target.value})}></input>
				</div>
				<div attribute="searchTerms" class ="year-range">
					<div class='years'>
					<p attribute="searchPrompt">Year range:</p>
					<input attribute = "searchInput" id="startYear" value={this.state.startYear} onChange={e => this.setState({ startYear: e.target.value})}></input>
					</div>
					<div class= 'years'>
					<p attribute = "searchPrompt">to:</p>
					<input attribute = "searchInput" id="endYear" value={this.state.endYear} onChange={e => this.setState({ endYear: e.target.value})}></input>
					</div>
				</div>
				<div attribute="searchTerms" class = "languages">
					<p attribute="searchPrompt">Languages:</p>
					<input attribute = "searchInput" id="languages" value={this.state.languages} onChange={e => this.setState({ languages: e.target.value})}></input>
				</div>
				<div attribute="searchTerms" class="region">
					<p attribute="searchPrompt">Region:</p>
					<input attribute = "searchInput" id="regions" value={this.state.regions} onChange={e => this.setState({ regions: e.target.value})}></input>
				</div>
			</div>
			<div id="search button">
				<button>Search</button>
			</div>
			</div>
		</body>
			</div>
		)
	}
};

export default AdvancedSearch;

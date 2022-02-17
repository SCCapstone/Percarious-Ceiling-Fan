//import '../../public/styles.css'
import React from 'react';
import axios from "axios"; //for SQL command stuff
import { Link } from 'react-router-dom';
//import TagSelector from './tagsComponent';

class AdvancedSearch extends React.Component {
	state = {
		connection: "",
		anyWords: "",
		exactPhrase: "",
		exclude: "",
		author: "",
		title: "",
		publisher: "",//author, title
		startYear: "",
		tags: "",
		endYear: "",
		languages: "",
		regions: "",
		genre: ""
		//fullArray: [connection, anyWords, exactPhrase]
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
				//author: this.state.author,
				//title: this.state.title,
				//publisher: this.state.publisher,
			}
		})
		.then((response) => response.data)
		.then(response => {this.setState({results: response})}) //results from advancedSearch
		//need to route to results page with this.results info
	}

	render() {
		let buttonStyling = {
			padding: '1px',
			outline: 'none',
			margin: '10px',
			height: '40px',
			width: '100px',
			backgroundColor: 'white'
		}
		return (
			<div>
				<title>Advanced Search</title>
				<body>

					<div className = "advanced-search-body">
						<div id="search-list">
							<div className = "any-words searchTerms">
								<p className="searchPrompt">Any of these words:</p>
								<input className = "searchInput" id= "anyWords" value={this.state.anyWords} onChange={e => this.setState({ anyWords: e.target.value})}></input>
							</div>
							<div  className = "searchTerms exact-words">
								<p className="searchPrompt">Exact words or phrases:</p>
								<input className = "searchInput" id="exactPhrase" value={this.state.exactPhrase} onChange={e => this.setState({ exactPhrase: e.target.value})}></input>
							</div>
							<div className="searchTerms exclude-words">
								<p className="searchPrompt">None of these words:</p>
								<input className = "searchInput" id="exclude" value={this.state.exclude} onChange={e => this.setState({ exclude: e.target.value})}></input>
							</div>
							
							
							<div className="searchTerms query-tag">
								<p className="searchPrompt">Tags to query:</p>
								<input className = "searchInput" id="tags" placeholder="'Author' 'Title' and/or 'Publisher'" value={this.state.tags} onChange={e => this.setState({ tags: e.target.tags})}></input>
								{/*
								<tagSelector>

								</tagSelector>
								<p className="searchPrompt">Author:</p>
								<input type = "checkbox" 
									className = "searchInput" 
									id="author" 
									value={this.state.author} 
									onChange={e => this.setState({ author: e.target.value}), console.log('author change'+this.state.author)}></input>
								<p className="searchPrompt">Title:</p>
								<input type = "checkbox" className = "searchInput" id="title" value={this.state.title} onChange={e => this.setState({ title: e.target.value})}></input>
								<p className="searchPrompt">Publisher:</p>
								<input type = "checkbox" className = "searchInput" id="publisher" value={this.state.publisher} onChange={e => this.setState({ publisher: e.target.value})}></input>
								*/}
							</div>
							<div className="searchTerms year-range">
								<div className='years'>
									<p className="searchPrompt">Year range:</p>
									<input className = "searchInput" id="startYear" value={this.state.startYear} onChange={e => this.setState({ startYear: e.target.value})}></input>
								</div>
								<div className= 'years'>
									<p className = "searchPrompt">to:</p>
									<input className = "searchInput" id="endYear" value={this.state.endYear} onChange={e => this.setState({ endYear: e.target.value})}></input>
								</div>
							</div>
							<div className="searchTerms languages">
								<p className="searchPrompt">Languages:</p>
								<input className = "searchInput" id="languages" value={this.state.languages} onChange={e => this.setState({ languages: e.target.value})}></input>
							</div>
							<div className="searchTerms region">
								<p className="searchPrompt">Region:</p>
								<input className = "searchInput" id="regions" value={this.state.regions} onChange={e => this.setState({ regions: e.target.value})}></input>
							</div>
						</div>
						<div id="search button">
							<button  style={buttonStyling}>
							    <Link to={{
									pathname: '/results',
									anyWords: this.state.anyWords,
									exactPhrase: this.state.exactPhrase,
									exclude: this.state.exclude,
									tags: this.state.tags,
									startYear: this.state.startYear,
									endYear: this.state.endYear,
									languages: this.state.languages,
									regions: this.state.regions
								}}>Search
								</Link>
							</button>
						</div>
					</div>
				</body>
			</div>
		)
	}
};

export default AdvancedSearch;

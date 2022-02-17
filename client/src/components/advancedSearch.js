//import '../../public/styles.css'
import React from 'react';
import axios from "axios"; //for SQL command stuff
import { Link } from 'react-router-dom';


class AdvancedSearch extends React.Component {
	state = {
		connection: "",
		anyWords: "",
		exactPhrase: "",
		exclude: "",

		startYear: "",
		tags:{
			author: false,
			title: true,
			publisher: false
		  },
		endYear: "",
		languages: "",
		regions: "",
		genre: ""
	}

	  
	checkChange = (e) =>{
        var {name, checked} = e.target ;

        this.setState((e)=> {
          var selectedTag=e.tags;
          return selectedTag[name]=checked;
        });
      };
	
	componentDidMount() {
		console.log('this runs');
		
	};

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
								<div>
									<span class='searchPrompt'>Author:</span>
									<input type="checkbox" className = "searchInput" id='author' name="author" onChange={this.checkChange}/> <br/>
									<span class='searchPrompt'>Title:</span>
									<input type="checkbox" className = "searchInput" name="title" defaultChecked={this.state.tags.title} onChange={this.checkChange}/> <br/>
									<span class='searchPrompt'>Publisher:</span>
									<input type="checkbox" className = "searchInput" name="publisher"onChange={this.checkChange}/> <br/>
									
								</div>
								
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
									author: this.state.tags.author,
									title: this.state.tags.title,
									publisher: this.state.tags.publisher,
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

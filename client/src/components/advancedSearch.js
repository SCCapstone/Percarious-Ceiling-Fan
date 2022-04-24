//import '../../public/styles.css'
import React from 'react';
import ProtectedAdvancedRoute from './ProtectedAdvancedRoute';

class AdvancedSearch extends React.Component {
	state = {
		connection: "",
		anyWords: "",
		exactPhrase: "",
		exclude: "",

		startYear: "",
		tags:{
			author: false,
			title: false,
			publisher: false
		  },
		endYear: "",
		languages: "",
		regions: "",
		genre: "", 
		chart: ""
	}

	  
	checkChange = (e) =>{
        var {name, checked} = e.target ;

        this.setState((e)=> {
          var selectedTag=e.tags;
          return selectedTag[name]=checked;
        });
    };

	chartCheck = (e) =>{
		this.setState({
			chart: e.target.value
		})
	}

	render() {
		let buttonStyling = {
			padding: '10px',
			margin: '10px',
			backgroundColor: '#6675b0',
			borderRadius: '10px',
			color: 'white',
			width: '200px',
			outline: 'none'
		}
		let optionStyling = {
			backgroundColor: 'white',
			borderRadius: '20px',
			height: '150px',
			width: '30%',
			outline: '2px dotted #6675b0',
			margin: 'auto'
		}
		let containerStyling = {
			display: 'grid',
			fontSize: '0.85em',
			fontWeight: 'bold',
			color: '#6675b0'
		}
		let dropdownStyling = {
			padding:'10px'
		}

		let optionContainer = {
			padding: '5px',
			backgroundColor: 'white',
			margin:'auto',
			width: '30%',
			textAlign: 'center',
			borderRadius: '10px',
			outline: '2px dotted #6675b0',
			fontWeight: 'bolder',
			marginTop: "30px"
		}

		let formStyling ={
		
			padding: '20px',
			backgroundColor:'white',
			borderRadius:'20px',
			outline:'2px dotted #6675b0'
		}
		
		return (
			<div>
				<title>Advanced Search</title>
				<body>
					<h1 style={{fontSize: "2em"}}>Advanced Search</h1>
					<div className = "advanced-search-body">
					<form>
					<div className="option-container" style = {optionContainer}>
						<div style = {dropdownStyling}>
						<p className="searchPrompt" style={{marginTop: '0px', textDecoration:'underline'}}>Graph Type:</p>
								<div style={{display: 'flex', justifyContent: 'center', padding:'10px' }}>
									<span className='searchPrompt'>Bar:</span>
									<input type="radio" name = "searchInput"  value="bar" onChange={this.chartCheck} required/> <br/>
									<span className='searchPrompt'>Pie:</span>
									<input type="radio" name = "searchInput" value="pie" onChange={this.chartCheck}/> <br/>
									<span className='searchPrompt'>Line:</span>
									<input type="radio" name = "searchInput"  value="line" onChange={this.chartCheck}/> <br/>
									
								</div>
					</div>
					</div>
						<div id="search-list" style={containerStyling}>
							<div className = "any-words searchTerms">
								<p className="searchPrompt">Any of these words:</p>
								<input className = "searchInput" id= "anyWords" value={this.state.anyWords} onChange={e => this.setState({ anyWords: e.target.value}) }required></input>
							</div> 
							<div  className = "searchTerms exact-words">
								<p className="searchPrompt">Exact words or phrases:</p>
								<input className = "searchInput" id="exactPhrase" value={this.state.exactPhrase} onChange={e => this.setState({ exactPhrase: e.target.value})}></input>
							</div>
							<div className="searchTerms exclude-words">
								<p className="searchPrompt">None of these words:</p>
								<input className = "searchInput" id="exclude" value={this.state.exclude} onChange={e => this.setState({ exclude: e.target.value})}></input>
							</div>
							
							
							<div className="searchTerms query-tag" style = {optionStyling}>
								<form>
								<p className="searchPrompt" style={{ textDecoration:'underline'}}>Tags to query:</p>
								<div>
									<span className='searchPrompt'>Author:</span>
									<input type="checkbox" className = "searchInput" id='author' name="author" onChange={this.checkChange}/> <br/>
									<span className='searchPrompt'>Title:</span>
									<input type="checkbox" className = "searchInput" name="title" defaultChecked={this.state.tags.title} onChange={this.checkChange}/> <br/>
									<span className='searchPrompt'>Publisher:</span>
									<input type="checkbox" className = "searchInput" name="publisher"onChange={this.checkChange}/> <br/>
									
								</div>
								</form>
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

							<ProtectedAdvancedRoute anyWords={this.state.anyWords}
									exactPhrase={this.state.exactPhrase}
									exclude={this.state.exclude}
									author={this.state.tags.author}
									title={this.state.tags.title}
									publisher={this.state.tags.publisher}
									startYear={this.state.startYear}
									endYear={this.state.endYear}
									languages={this.state.languages}
									regions={this.state.regions}
									chart={this.state.chart}></ProtectedAdvancedRoute> 
						</div>
						</form>
					</div>
				</body>
			</div>
		)
	}
};

export default AdvancedSearch;

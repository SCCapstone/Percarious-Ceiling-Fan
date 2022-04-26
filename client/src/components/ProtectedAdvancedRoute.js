import React, { useState } from "react"
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import FirebaseService from "../services/firebase.service";
import { useAuthContext } from "../contexts/AuthContext";
/**
 * SaveSearch takes in all the inputs from the advanced search and the name given by the user
 *  and saves a search to the firebase database (to be accessed in saved searches page) 
 */
function SaveSearch(uId,name, anyWords, exactPhrase,exclude,author,title,publisher,startYear,
	endYear,languages,regions,chart) {
	console.log("Running SaveAdvancedSearch ", uId, name, anyWords, exactPhrase, exclude,author,title,publisher,startYear,
	endYear,languages,regions,chart);
	const newSearch = {
		userId: uId, 
		name: name, 
		anyWords: anyWords,
		exactPhrase: exactPhrase,
		exclude: exclude,
		author: author,
		title: title,
		publisher: publisher,
		startYear: startYear,
		endYear: endYear,
		languages: languages,
		regions: regions,
		chart: chart
	};
	FirebaseService.addSearch(newSearch);
};
/**
 * ProtectedAdvancedRoute exists for changing what is displayed on the advanced search page depending on if the user is
 * signed in and the required fields are filled out
 */
const ProtectedAdvancedRoute = (anyWords) => {
   const { user } = useAuthContext();
   const [name, setName] = useState("")

	let formStyling ={
		
		padding: '20px',
		backgroundColor:'white',
		borderRadius:'20px',
		outline:'2px dotted #6675b0'
	}

   if(!user) { //if the user is not logged in then the "save search" button is not visible in advanced search
	   if((anyWords.author != false || anyWords.title != false || anyWords.publisher != false) && (anyWords.chart != "") &&
	   		(anyWords.anyWords != "" || anyWords.exactPhrase != "" || anyWords.exclude != "" || 
		    (anyWords.startYear != "" && anyWords.endYear != "") || anyWords.languages != "" || anyWords.regions != "")) {
		//if the required fields are filled out then the search button is active
				   return (
					<Link style= {{textDecoration: 'none', color: 'white', padding: '5px'}} to={{
						pathname: '/results',
						anyWords: anyWords.anyWords,
						exactPhrase: anyWords.exactPhrase,
						exclude: anyWords.exclude,
						author: anyWords.author,
						title: anyWords.title,
						publisher: anyWords.publisher,
						startYear: anyWords.startYear,
						endYear: anyWords.endYear,
						languages: anyWords.languages,
						regions: anyWords.regions,
						chart: anyWords.chart
					}}><button style={{borderRadius: '10px', color: 'white', backgroundColor: '#6675b0'}}>Search</button>
					</Link>
				   )
		}
		else {
		//if the required fields are not filled in the search button is not active
			return (<div><button style={{borderRadius:'10px', color:'white', backgroundColor: 'darkGrey'}}  id="searchbutton" className = "ui-large-primary-button">Search</button></div>)
		}
    }
	else {//if the user is logged in then the "save search" button is visible in advanced search
		if((anyWords.author != false || anyWords.title != false || anyWords.publisher != false) && (anyWords.chart != "") &&
		(anyWords.anyWords != "" || anyWords.exactPhrase != "" || anyWords.exclude != "" || 
		 (anyWords.startYear != "" && anyWords.endYear != "") || anyWords.languages != "" || anyWords.regions != "")) {
		//if the required fields are filled out then the search button and save search button are active
			return (
					<div>
						<Link style= {{textDecoration: 'none', color: 'white', padding: '5px'}} to={{
							pathname: '/results',
							anyWords: anyWords.anyWords,
							exactPhrase: anyWords.exactPhrase,
							exclude: anyWords.exclude,
							author: anyWords.author,
							title: anyWords.title,
							publisher: anyWords.publisher,
							startYear: anyWords.startYear,
							endYear: anyWords.endYear,
							languages: anyWords.languages,
							regions: anyWords.regions,
							chart: anyWords.chart
						}}><button style={{borderRadius: '10px', color: 'white', backgroundColor: '#6675b0'}}>Search</button>
						</Link>
						<Popup trigger={<button style={{borderRadius: '10px', color: 'white', backgroundColor: '#6675b0'}}>Save Search</button>}>
								{close => (
								<div id="myForm" className="formPopup" style={formStyling}>
									<form action ="/action_page.php" className= "form-container" >
										<h3 style={{textAlign:"center"}}>Save Search</h3>
										<label for="saveName" style={{padding:'5px'}}><b>Save Name:</b></label>
										<input type = 'text' value={name} onChange={e => {setName(e.target.value)}} placeholder='enter name'></input>
										<button type='button' className="btn" onClick={() => {SaveSearch(user.uid,name,anyWords.anyWords,anyWords.exactPhrase,anyWords.exclude,anyWords.author,
										anyWords.title,anyWords.publisher,anyWords.startYear,anyWords.endYear,anyWords.languages,anyWords.regions,anyWords.chart); close();}} style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: '#6675b0'}}>Submit</button>
									</form>
								</div>
								)}
						</Popup>
					</div>
					)
			}
			else {
			//if the required fields are not filled out then the search button and save search button are not active
				return(<div>
					<button style={{borderRadius: '10px', color: 'white', backgroundColor: 'darkGrey'}} id="searchbutton" className = "ui-large-primary-button">Search</button>
					<button style={{borderRadius: '10px', color: 'white', backgroundColor: 'darkGrey'}} id="searchbutton" className = "ui-large-primary-button">Save Search</button>
				</div>)
			}
	}
};


export default ProtectedAdvancedRoute;
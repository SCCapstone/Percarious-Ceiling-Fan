import React, { useState } from "react"
import Popup from 'reactjs-popup';
import FirebaseService from "../services/firebase.service";
import { useAuthContext } from "../contexts/AuthContext";

function SaveBasicSearch(uId,name, anyWords, exactPhrase,exclude,author,title,publisher,startYear,
	endYear,languages,regions,chart) {
	console.log("Running SaveAdvancedSearch ", uId, name, anyWords, exactPhrase,exclude,author,title,publisher,startYear,
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

const ProtectedBasicRoute = (anyWords) => {
   const { user } = useAuthContext();
   const [name, setName] = useState("")

	let formStyling ={
		
		padding: '20px',
		backgroundColor:'white',
		borderRadius:'20px',
		outline:'2px dotted #6675b0'
	}

   console.log("Current User (homePage)", user);

   if(!user) {
        return <div></div>
    }
	else {
		return (
			<Popup trigger={<button style={{borderRadius: '10px', padding: '5px', color: 'white', backgroundColor: '#6675b0'}}>Save Search</button>}>
				{close => (
				<div id="myForm" className="formPopup" style={formStyling}>
					<form action ="/action_page.php" className= "form-container" >
						<h3 style={{textAlign:"center"}}>Save Search</h3>
						<label for="saveName" style={{padding:'5px'}}><b>Save Name:</b></label>
						<input type = 'text' value={name} onChange={e => {setName(e.target.value)}} placeholder='enter name'></input>
						<button type='button' className="btn" onClick={() => {SaveBasicSearch(user.uid,name,anyWords.anyWords,anyWords.exactPhrase,anyWords.exclude,anyWords.author,
						anyWords.title,anyWords.publisher,anyWords.startYear,anyWords.endYear,anyWords.languages,anyWords.regions,anyWords.chart); close();}} style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: '#6675b0'}}>Submit</button>
					</form>
				</div>
				)}
			</Popup>
		)
	}
};


export default ProtectedBasicRoute;
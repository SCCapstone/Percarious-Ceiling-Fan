import React, { useState } from "react"
import Popup from 'reactjs-popup';
import FirebaseService from "../services/firebase.service";
import { useAuthContext } from "../contexts/AuthContext";

function SaveBasicSearch(uId,name,search,field,chart) {
	console.log("Running SaveBasicSearch ", uId, name, search, field, chart);
	const newSearch = {
		userId: uId, 
		name: name, 
		search: search, 
		field: field, 
		chart: chart
	};
	FirebaseService.addSearch(newSearch);
};

const ProtectedBasicRoute = (search) => {
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
				<div id="myForm" className="formPopup" style={formStyling}>
					<form action ="/action_page.php" className= "form-container" >
						<h3 style={{textAlign:"center"}}>Save Search</h3>
						<label for="saveName" style={{padding:'5px'}}><b>Save Name:</b></label>
						<input type = 'text' value={name} onChange={e => {setName(e.target.value)}} placeholder='enter name'></input>
						<button type='submit' className="btn" onClick={() => {SaveBasicSearch(user.uid,name,search.search,search.field,search.chart)}} style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: '#6675b0'}}>Submit</button>
					</form>
				</div>
			</Popup>
		)
	}
};


export default ProtectedBasicRoute;
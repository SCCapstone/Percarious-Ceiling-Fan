import React, { useState } from "react"
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import FirebaseService from "../services/firebase.service";
import { useAuthContext } from "../contexts/AuthContext";
/**
 * SaveSearch takes in all the inputs from the basic search (homepage) and the name given by the user
 *  and saves a search to the firebase database (to be accessed in saved searches page) 
 */
function SaveSearch(uId,name,search,field,chart) {
	const newSearch = {
		userId: uId, 
		name: name, 
		search: search, 
		field: field, 
		chart: chart
	};
	FirebaseService.addSearch(newSearch);
};
/**
 * ProtectedBasicRoute exists for changing what is displayed on the basic search (homepage) depending on if the user is
 * signed in and the required fields are filled out
 */
const ProtectedBasicRoute = (search) => {
   const { user } = useAuthContext();
   const [name, setName] = useState("")

	let formStyling ={
		
		padding: '20px',
		backgroundColor:'white',
		borderRadius:'20px',
		outline:'2px dotted #6675b0'
	}

   if(!user) {//if the user is not logged in then the "save search" button is not visible in basic search
	   if (search.search != "" && search.field != "" && search.chart != ""){
	   //if the required fields are filled out then the search button is active
		return ( <Link style ={{textDecoration:'none', color: 'white'}} to={{
				pathname: '/results',
				search: search.search,
				field: search.field,
				chart: search.chart
			}}>
				<button  style= {{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor:"#6675b0"}} id="searchbutton" className = "ui-large-primary-button">Search</button> 
			</Link>
			)
	   }
	   else {
		//if the required fields are not filled in the search button is not active
        return <div><button style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: 'darkGrey'}}  id="searchbutton" className = "ui-large-primary-button">Search</button></div>
		}
    }
	else {//if the user is logged in then the "save search" button is visible in basic search
		if (search.search != "" && search.field != "" && search.chart != ""){
		//if the required fields are filled out then the search button and save search button are active
			return (
				<div>
				<Link style ={{textDecoration:'none', color: 'white'}} to={{
						pathname: '/results',
						search: search.search,
						field: search.field,
						chart: search.chart
					}}>
					<button style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: '#6675b0'}} id="searchbutton" className = "ui-large-primary-button">Search</button>
				</Link>

				<Popup trigger={<button style={{marginLeft:'5px', borderRadius: '10px', color: 'white', backgroundColor: '#6675b0'}}>Save Search</button>}>
				{close => (
				<div id="myForm" className="formPopup" style={formStyling}>
					<form action ="/action_page.php" className= "form-container" >
						<h3 style={{textAlign:"center"}}>Save Search</h3>
						<label for="saveName" style={{padding:'5px'}}><b>Save Name:</b></label>
						<input type = 'text' value={name} onChange={e => {setName(e.target.value)}} placeholder='enter name'></input>
						<button type='button' onClick={() => {SaveSearch(user.uid,name,search.search,search.field,search.chart); close();}} className="btn" style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: '#6675b0'}}>Submit</button>
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
					<button style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: 'darkGrey'}}  id="searchbutton" className = "ui-large-primary-button">Search</button>
					<button style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: 'darkGrey'}}  id="searchbutton" className = "ui-large-primary-button">Save Search</button>
				</div>)
		}
	}
};


export default ProtectedBasicRoute;
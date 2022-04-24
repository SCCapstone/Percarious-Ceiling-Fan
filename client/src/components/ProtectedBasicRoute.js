import React, { useState } from "react"
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
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

   if(!user) {
	   if (search.search != "" && search.field != "" && search.chart != ""){
		return ( <Link style ={{textDecoration:'none', color: 'white'}} to={{
				pathname: '/results',
				search: search.search,
				field: search.field,
				chart: search.chart
			}}>
				<button  style= {{backgroundColor:"#6675b0"}} id="searchbutton" className = "ui-large-primary-button">Search</button> 
			</Link>
			)
	   }
	   else {
        return <div><button id="searchbutton" className = "ui-large-primary-button">Enter Required Fields to Search</button></div>
		}
    }
	else {
		if (search.search != "" && search.field != "" && search.chart != ""){
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
						<button type='button' onClick={() => {SaveBasicSearch(user.uid,name,search.search,search.field,search.chart); close();}} className="btn" style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: '#6675b0'}}>Submit</button>
						</form>
					</div>
					)}
				</Popup>
				</div>
			)
				
		   }
		else {
			return(<div>
					<button style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: 'darkGrey'}}  id="searchbutton" className = "ui-large-primary-button">Enter Required Fields to Search</button>
					<button style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: 'darkGrey'}}  id="searchbutton" className = "ui-large-primary-button">Enter Required Fields to Save Search</button>
				</div>)
		}
	}
};


export default ProtectedBasicRoute;
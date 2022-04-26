import React from "react"
import { Link } from 'react-router-dom';
/**
 * ProtectedReResultsRoute exists for changing whether the search button is active or not in the results page
 * on search rerun, based on if the required fields are filled out or not
 */
const ProtectedResultsRoute = (search) => {

	   if (search.search != "" && search.field != "" && search.chart != ""){
		//if the required fields are filled out then the search button is active
		return (
				<Link style ={{textDecoration:'none', color: 'white'}} to={{
					pathname: '/results',
					search: search.search,
					field: search.field,
					chart: search.chart
				}}>
					<button style= {{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor:"#6675b0"}} id="searchbutton" className = "ui-large-primary-button">Search</button>
				</Link>
			)
	   }
	   else {
		//if the required fields are not filled out then the search button is not active
        return <button style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: 'darkGrey'}}  id="searchbutton" className = "ui-large-primary-button">Search</button>
		}
};


export default ProtectedResultsRoute;
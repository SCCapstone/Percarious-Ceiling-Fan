import React from "react"
import { Link } from 'react-router-dom';

const ProtectedResultsRoute = (search) => {

	   if (search.search != "" && search.field != "" && search.chart != ""){
		return (
				<Link style ={{textDecoration:'none', color: 'white'}} to={{
					pathname: '/reresults',
					search: search.search,
					field: search.field,
					chart: search.chart
				}}>
					<button style= {{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor:"#6675b0"}} id="searchbutton" className = "ui-large-primary-button">Search</button>
				</Link>
			)
	   }
	   else {
        return <button style={{marginLeft:'5px', borderRadius:'20px', color:'white', backgroundColor: 'darkGrey'}}  id="searchbutton" className = "ui-large-primary-button">Search</button>
		}
};


export default ProtectedResultsRoute;
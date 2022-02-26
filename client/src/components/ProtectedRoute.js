import React from "react"
import {Link} from 'react-router-dom'
import { useAuthContext } from "../contexts/AuthContext"

const ProtectedRoute = () => {
   const { user } = useAuthContext();
   console.log("Protected User ", user);
   if(!user) {
        return <nav class = "home-link"><Link to="/signIn" style = {{textDecoration: 'none', color: 'white', float: 'left', marginTop: '15px', marginLeft: '35px', textTransform: 'uppercase'}}>Sign In</Link></nav>
    }
	else {
		return <nav class = "home-link"><Link to="/savedSearches" style = {{textDecoration: 'none', color: 'white', float: 'left', marginTop: '15px', marginLeft: '35px', textTransform: 'uppercase'}}>Searches</Link></nav>
	}
};


export default ProtectedRoute;
import React from "react"
import {Link, useHistory} from 'react-router-dom'
import { useAuthContext } from "../contexts/AuthContext"
import { Button} from 'react-bootstrap';

const ProtectedRoute = () => {
	const { logOut } = useAuthContext();
   const { user } = useAuthContext();
   const history = useHistory()
   const logoutHandler = async () => {
    try {
      await logOut();
      history.push("/")
    } catch (err) {
      console.log(err)
    }
  };
   if(!user) {
        return <nav className= "home-link"><Link to="/signIn" style = {{textDecoration: 'none', color: 'white', float: 'left', marginTop: '15px', marginLeft: '35px', textTransform: 'uppercase'}}>Sign In</Link></nav>
    }
	else {
		return <nav className= "home-link"><Link to="/savedSearches" style = {{textDecoration: 'none', color: 'white', float: 'left', marginTop: '15px', marginLeft: '35px', textTransform: 'uppercase'}}>Searches</Link><div className="button" style= {{paddingTop: '10px'}}><Button style= {{color:'white', backgroundColor:'#3A2F7D', padding: '10px', borderRadius: '5px', float:"right", marginRight:"5px"}} variant="primary" onClick={logoutHandler}>LOG OUT</Button></div></nav> 
	}
};


export default ProtectedRoute;
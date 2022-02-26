import React from "react";
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { useAuthContext } from "../contexts/AuthContext";
const ProtectedRoute = ({ children }) => {
    let  user  = true//useAuthContext();
    if(useAuthContext()!=false) {
        return <nav class = "home-link"><Link to="/signIn" style = {{textDecoration: 'none', color: 'white', float: 'left', marginTop: '15px', marginLeft: '35px', textTransform: 'uppercase'}}>Sign In</Link></nav>
        
    } else {
        return <nav class = "home-link"><Link to="/savedSearches" style = {{textDecoration: 'none', color: 'white', float: 'left', marginTop: '15px', marginLeft: '35px', textTransform: 'uppercase'}}>Saved Searches</Link></nav>

    }
    return children;
};


export default ProtectedRoute;
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { useAuthContext } from "../contexts/AuthContext";
const ProtectedRoute = ({ children }) => {
    let  { user }  = useAuthContext()

    if(!user) {
        return <nav class = "home-link"><Link to="/signIn" style = {{textDecoration: 'none', color: 'white', float: 'left', marginTop: '15px', marginLeft: '35px', textTransform: 'uppercase'}}>Sign In</Link></nav>
    }
    return children;
};


export default ProtectedRoute;
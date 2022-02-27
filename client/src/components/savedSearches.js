import React, { useEffect, useState } from "react";
import FirebaseService from "../services/firebase.service";
import { useAuthContext } from "../contexts/AuthContext";
import {Button} from "react-bootstrap"
import { useHistory } from "react-router-dom"

const SavedSearches = () => {
  const { logOut } = useAuthContext();
  const { user } = useAuthContext();
  const history = useHistory()
  const [searches, setSearches] = useState([]);
  useEffect(() => {
    getSearches();
  }, []);

  const logoutHandler = async () => {
    try {
      await logOut();
      history.push("/")
    } catch (err) {
      console.log(err)
    }
  };

  const getSearches = async () => {
    if(user){
    const data = await FirebaseService.getSearches(user.uid);
  	//setSearches(data);
    }
  };

  console.log(searches)
 
  return (
	<div>
    <div className="containerWrapper">
      <div style= {{backgroundColor:'white', width:'50%', margin: 'auto', borderRadius:'5px', outline: 'solid 3px #6675b0'}}><h1 style={{color:'#6675b0', padding: '10px'}}>Saved Searches:</h1></div>
    {searches.map((search) =>(
        <hr>
          <div className = "card">
            <div className="meta">{search.search}</div>
           <p></p>
          </div>
        </hr>
    ))}
		<div className="button">
			<Button style= {{color:'white', backgroundColor:'#6675b0', padding: '10px', borderRadius: '5px'}} variant="primary" onClick={logoutHandler}>Log Out</Button>
		</div>
    </div>
	</div>
  );
};

export default SavedSearches;
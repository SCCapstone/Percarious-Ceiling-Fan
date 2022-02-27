import React, { useEffect, useState } from "react";
import FirebaseService from "../services/firebase.service";
import { useAuthContext } from "../contexts/AuthContext";
import {Button} from "react-bootstrap"
import { useHistory } from "react-router-dom"



const SavedSearches = () => {
  const { logOut } = useAuthContext();
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
    const data = await FirebaseService.getSearches();
	setSearches(data);
    //console.log(data);
    //setSearches(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const searchList = document.getElementById('searchList')
  const renderCafe = () => { // this will get called to create each element with a loop for each saved doc
    let li = document.createElement('li');
    let name = document.createElement('span');

    name.textContent = FirebaseService().name //needs to change to get the save name variable
    li.appendChild(name)
    searchList.appendChild(li)

  };

  console.log(FirebaseService.getSearches().id)
  return (
	<div>
    <div className="containerWrapper">
      <div style= {{backgroundColor:'white', width:'50%', margin: 'auto', borderRadius:'5px', outline: 'solid 3px #6675b0'}}><h1 style={{color:'#6675b0', padding: '10px'}}>Saved Searches:</h1></div>
		<div className="savedWrapper" style={{}}>
    <ul id = "searchList">Access your saved Searches Here:</ul>
    </div>
		<div className="button">
			<Button style= {{color:'white', backgroundColor:'#6675b0', padding: '10px', borderRadius: '5px'}} variant="primary" onClick={logoutHandler}>Log Out</Button>
		</div>
    </div>
	</div>
  );
};

export default SavedSearches;
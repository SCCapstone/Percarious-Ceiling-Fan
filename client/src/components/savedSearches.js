import React, { useEffect, useState } from "react";
import FirebaseService from "../services/firebase.service";
import { useAuthContext } from "../contexts/AuthContext";
import {Button} from "react-bootstrap"
import { useHistory } from "react-router-dom"
import {db} from "../firebase";


  const SavedSearches = () => {
    const { logOut } = useAuthContext();
    const history = useHistory()
    const [searches, setSearches] = useState([]);
    
    useEffect(() => {
      
      db.collection("searches").onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach(doc => {
          console.log("graph type", doc.data().Graph)
          data.push({Graph: doc.data().Graph, Search: doc.data().Search })
        })

      })
     // getSearches();
     setData(data);
     }, 

  []);

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
    //console.log(data.docs);
    //setSearches(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
	<div>
     <div className="container">
      <h1>Answers:</h1>
     
    </div>
		<div className="button">
			<Button variant="primary" onClick={logoutHandler}>Log Out</Button>
		</div>
	</div>
  );
};

export default SavedSearches;
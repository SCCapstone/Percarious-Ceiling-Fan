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
     // console.log(useAuthContext());
    } catch (err) {
      console.log(err)
    }
  };

  const getSearches = async () => {
    //const data = await FirebaseService.getSearches();
    //console.log(data.docs);
    //setSearches(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
	<div>
		{searches.map((search) => (
		<div className="card">
		<div className="meta">{search.search}</div>
		<p></p>
		</div>
		))}

    <div className="button">
      <Button variant="primary" onClick={logoutHandler}>Log Out</Button>
    </div>
	</div>
  );
};

export default SavedSearches;
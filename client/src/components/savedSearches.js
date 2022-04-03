import React, { useEffect, useState } from "react";
import FirebaseService from "../services/firebase.service";
import { useAuthContext } from "../contexts/AuthContext";
import {Button} from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"

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
    const data = await FirebaseService.getSearches(user.uid);
	if(data){
		setSearches(data);   
	}
  };

  const deleteSearch = async (id) => {
	  console.log(id);
	  FirebaseService.deleteSearch(id);
  };

  return (
	<div>
    <div className="containerWrapper" style={{overflowY: 'scroll', marginBottom: '200px'}}>
      <div style= {{backgroundColor:'white', width:'50%', margin: 'auto', borderRadius:'5px', outline: 'solid 3px #6675b0'}}><h1 style={{color:'#6675b0', padding: '10px'}}>Saved Searches:</h1></div>
    <div className = "card-container" style={{height: '80%'}}>
    {searches.map((search) =>(
          <div className = "card" >
			<div className="meta" style={{ width:'20%', margin: 'auto', borderRadius: '7px', backgroundColor: 'white', color: 'black', flexDirection: 'row', flexWrap:'wrap'}}>
				<Link style ={{textDecoration:'none', color: 'black'}} to={{
					pathname: '/results',
					saved: search
					}}>
					<div>
						<h2>{search.name}</h2>
						<p>Chart Type: {search.chart}</p>
						<p>Searching For: {search.search}{search.anyWords}</p>
					</div>
				</Link>
				<Button style= {{color:'white', backgroundColor:'#b32738', padding: '5px', borderRadius: '5px'}} onClick={() => deleteSearch(search.id)}>Delete</Button>
			</div>
          </div>
    ))}
    </div>
		<div className="button" style= {{paddingTop: '10px'}}>
			<Button style= {{color:'white', backgroundColor:'#6675b0', padding: '10px', borderRadius: '5px'}} variant="primary" onClick={logoutHandler}>Log Out</Button>
		</div>
    </div>
	</div>
  );
};

export default SavedSearches;
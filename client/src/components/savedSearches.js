import React, { useEffect, useState } from "react";
import FirebaseService from "../services/firebase.service";
import { useAuthContext } from "../contexts/AuthContext";
import {Button} from "react-bootstrap"
import { Link } from "react-router-dom"

const SavedSearches = () => {
  const { user } = useAuthContext();
  const [searchesA, setSearchesA] = useState([]);
  const [searchesB, setSearchesB] = useState([]);
  
 //runs to call the getsearches method when page is loaded
  useEffect(() => {
    getSearches();
  	}, []);


/* 
pulls saved searches that match userID from firebase service for visual display 
basA includes all saved basic searches
advA includes all saved advanced searches
*/
  const getSearches = async () => {
    const data = await FirebaseService.getSearches(user.uid);
	if(data){
		let advA = [];
		let basA = [];
		data.forEach(element => {
			if(!element.search){
				advA.push(element);
			}
			else {
				basA.push(element);
			}
		});
		setSearchesA(advA);
		setSearchesB(basA);   
	}
  };

  //used to delete a firebase saved search based on an on-click button call
  const deleteSearch = async (id) => {
	  console.log(id);
	  FirebaseService.deleteSearch(id);
  };


  //returns saved searches render, links are used to make each card runable again
  return (
	<div>
    <div className="containerWrapper" style={{overflowY: 'scroll', marginBottom: '200px'}}>
      <div style= {{backgroundColor:'white', width:'50%', margin: 'auto', borderRadius:'5px', outline: 'solid 3px #6675b0'}}><h1 style={{color:'#6675b0', padding: '10px'}}>Saved Searches:</h1></div>
	  <div className = "card-container" style={{height: '80%'}}>
    {searchesB?.map((bSearch) =>(
          <div className = "card" >
			<div className="meta" style={{ width:'20%', margin: 'auto', borderRadius: '7px', backgroundColor: 'white', color: 'black', flexDirection: 'row', flexWrap:'wrap'}}>
				<Link style ={{textDecoration:'none', color: 'black'}} to={{
					pathname: '/results',
					saved: bSearch
					}}>
					<div>
						<h2>{bSearch.name}</h2>
						<p>Basic Search</p>
						<p>Chart Type: {bSearch.chart}</p>
						<p>Field Type: {bSearch.field}</p>
						<p>Searching For: {bSearch.search}</p>
					</div>
				</Link>
				<Button style= {{color:'white', backgroundColor:'#b32738', padding: '5px', borderRadius: '5px'}} onClick={() => deleteSearch(bSearch.id)}>
				<Link to="/reSavedSearches" style = {{textDecoration: 'none', color: 'white', textTransform: 'uppercase'}}>Delete</Link>
				</Button>
			</div>
          </div>
    ))}
    </div>
	<div className = "card-container" style={{height: '80%'}}>
    {searchesA?.map((aSearch) =>(
          <div className = "card" >
			<div className="meta" style={{ width:'20%', margin: 'auto', borderRadius: '7px', backgroundColor: 'white', color: 'black', flexDirection: 'row', flexWrap:'wrap'}}>
				<Link style ={{textDecoration:'none', color: 'black'}} to={{
					pathname: '/results',
					saved: aSearch
					}}>
					<div>
						<h2>{aSearch.name}</h2>
						<p>Advanced Search</p>
						<p>Chart Type: {aSearch.chart}</p>
						<p>Any: {aSearch.anyWords}</p>
						<p>Exact: {aSearch.exactPhrase}</p>
						<p>Exclude: {aSearch.exclude}</p>
						<p>Title: {aSearch.title.toString()} | Author: {aSearch.author.toString()} | Publisher: {aSearch.publisher.toString()}</p>
						<p>Year Range: {aSearch.startYear} to {aSearch.endYear}</p>
						<p>Language(s): {aSearch.languages}</p>
						<p>Regions: {aSearch.regions}</p>
					</div>
				</Link>
				<Button style= {{color:'white', backgroundColor:'#b32738', padding: '5px', borderRadius: '5px'}} onClick={() => deleteSearch(aSearch.id)}>
				<Link to="/reSavedSearches" style = {{textDecoration: 'none', color: 'white', textTransform: 'uppercase'}}>Delete</Link>
				</Button>
			</div>
          </div>
    ))}
    </div>
    </div>
	</div>
  );
};

export default SavedSearches;
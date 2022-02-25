import React, { useEffect, useState } from "react";
import FirebaseService from "../services/firebase.service";

const SavedSearches = () => {
  const [searches, setSearches] = useState([]);
  useEffect(() => {
    getSearches();
  }, []);

  const getSearches = async () => {
    const data = await FirebaseService.getSearches();
    console.log(data.docs);
    setSearches(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
	<div>
		{searches.map((search) => (
		<div className="card">
		<div className="meta">{search.search}</div>
		<p></p>
		</div>
		))}
	</div>
  );
};

export default SavedSearches;
import { db } from "../firebase"
import { collection, query, where, getDocs, addDoc, doc, deleteDoc} from "firebase/firestore"

//This file is needed for firebase, the service that stores user data and user searches
const searchCollectionRef = collection(db, "searches");
class FirebaseService {
	//This function adds a search to firebase database of searches
	addSearch = (newSearch) => {
		return addDoc(searchCollectionRef, newSearch);
	}
	//This function pulls searches from the firebase database of searches depending on the currently logged in user
	getSearches = async (uid) => {
		if(uid) {
			console.log(uid);
			const q = query(collection(db, "searches"), where("userId", "==", uid));
			const querySnapshot = await getDocs(q);
			let searches = []
			querySnapshot.forEach((doc) => {
				let search = doc.data();
				search.id = doc.id;
				searches.push(search)
			});
			return searches
		}
	}
	//This function deletes a search from firebase database of searches
	deleteSearch = (id) => {
		const searchDoc = doc(db, "searches", id);
		return deleteDoc(searchDoc);
	  };
}

export default new FirebaseService();
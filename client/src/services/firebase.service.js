import { db } from "../firebase"
import { collection, getDocs, addDoc, doc} from "firebase/firestore"

const searchCollectionRef = collection(db, "searches");
class FirebaseService {
	addSearch = (newSearch) => {
		return addDoc(searchCollectionRef, newSearch);
	}
	getSearches = (userid) => {
		const searchDoc = doc(db, "searches", userid);
		return getDocs(searchDoc);
	}
}

export default new FirebaseService();
import { db } from "../firebase"
import { collection, query, where, getDocs, addDoc} from "firebase/firestore"
// import { useAuthContext } from "../contexts/AuthContext"

const searchCollectionRef = collection(db, "searches");
class FirebaseService {
	addSearch = (newSearch) => {
		return addDoc(searchCollectionRef, newSearch);
	}
	getSearches = async (uid) => {
		const q = query(collection(db, "searches"), where("userId", "==", uid)); //GetCurrUser().id
		const querySnapshot = await getDocs(q);
		let searches = []
		querySnapshot.forEach((doc) => {
			searches.push({...doc.data(), id: doc.id})
		});
		return searches
	}
}

export default new FirebaseService();
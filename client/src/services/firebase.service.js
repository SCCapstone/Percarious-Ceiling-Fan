import { db } from "../firebase"
import { collection, query, where, getDocs, addDoc} from "firebase/firestore"

const searchCollectionRef = collection(db, "searches");
class FirebaseService {
	addSearch = (newSearch) => {
		return addDoc(searchCollectionRef, newSearch);
	}
	getSearches = async (uid) => {
		console.log(uid);
		const q = query(collection(db, "searches"), where("userId", "==", uid));
		const querySnapshot = await getDocs(q);
		let searches = []
		querySnapshot.forEach((doc) => {
			searches.push(doc.data())
		});
		return searches
	}
}

export default new FirebaseService();
import { db } from "../firebase"
import { collection, query, where, getDocs, addDoc} from "firebase/firestore"

const searchCollectionRef = collection(db, "searches");
class FirebaseService {
	addSearch = (newSearch) => {
		return addDoc(searchCollectionRef, newSearch);
	}
	getSearches = async () => {
		const q = query(collection(db, "searches"), where("userId", "==", "TODO, CURRENT USER"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.id, " => ", doc.data());
		});
	}
}

export default new FirebaseService();
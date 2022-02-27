import { db } from "../firebase"
import { collection, query, where, getDocs, addDoc} from "firebase/firestore"
// import { useAuthContext } from "../contexts/AuthContext"

const searchCollectionRef = collection(db, "searches");
// const GetCurrUser = () => {
// 	const { user } = useAuthContext();
// 	return user;
// };
class FirebaseService {
	addSearch = (newSearch) => {
		return addDoc(searchCollectionRef, newSearch);
	}
	getSearches = async () => {
		const q = query(collection(db, "searches"), where("userId", "==", "Placeholder")); //GetCurrUser().id
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.id, " => ", doc.data());
		});
	}
}

export default new FirebaseService();
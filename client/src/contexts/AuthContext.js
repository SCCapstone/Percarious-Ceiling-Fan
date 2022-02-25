import React, { createContext, useContext, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";

const authContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState("");
	function logIn(email,password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		 return () => {
			 unsubscribe();
		 }
	}, []);
	return <authContext.Provider value={}>{ children }</authContext.Provider>
}

export function useAuthContext() {
	return useContext(authContext);
}

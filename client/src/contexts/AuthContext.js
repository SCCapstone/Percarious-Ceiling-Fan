import React, { createContext, useContext, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import { auth } from "../firebase";
import { useState } from 'react';

const authContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState({});

	function logIn(email,password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logOut() {
		return signOut(auth);
	  }

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log("Auth ", currentUser);
			setUser(currentUser);
		});
		 return () => {
			 unsubscribe();
		 };
	}, []);

	return (
		<authContext.Provider
      value={{ user, logIn, logOut }}
    >
      {children}
    </authContext.Provider>
	);

}

export function useAuthContext() {
	return useContext(authContext);
}

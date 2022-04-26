import React, { createContext, useContext, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import { auth } from "../firebase";
import { useState } from 'react';

//This is a helper file that does most of the authentication and allows us to access the current user throughout the entire site
const authContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState({});

	function logIn(email,password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logOut() {
		return signOut(auth);
	  }

	function getCurrUser() {
		return user;
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
      value={{ user, logIn, logOut, getCurrUser }}
    >
      {children}
    </authContext.Provider>
	);

}

export function useAuthContext() {
	return useContext(authContext);
}

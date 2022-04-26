import React, { createContext, useContext, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import { auth } from "../firebase";
import { useState } from 'react';

const authContext = createContext();
//This is a helper file that does most of the authentication and allows us to access the current user throughout the entire site
export function AuthContextProvider({ children }) {
	const [user, setUser] = useState({});
	//this function logs the user in through firebase
	function logIn(email,password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	//this function logs the user out through firebase
	function logOut() {
		return signOut(auth);
	  }
	//this function returns the current set user
	function getCurrUser() {
		return user;
	}
	//This does the work of setting the user for apps purpose as the current firebase user
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

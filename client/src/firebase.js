
import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import 'firebase/auth'

const firebaseConfig = {
    
        apiKey: "AIzaSyApxySs35Gvjx5ImJpPsi5YQgLGUIGuA9Q",
        authDomain: "oclc-advanced-search-system.firebaseapp.com",
        projectId: "oclc-advanced-search-system",
        storageBucket: "oclc-advanced-search-system.appspot.com",
        messagingSenderId: "683111933545",
        appId: "1:683111933545:web:48f08c8e006652439224f8",
        measurementId: "G-NPEH2715VT"
      
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export default app
import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import 'firebase/auth'

const app = firebase.initializeApp({
    
        apiKey: "AIzaSyApxySs35Gvjx5ImJpPsi5YQgLGUIGuA9Q",
        authDomain: "oclc-advanced-search-system.firebaseapp.com",
        projectId: "oclc-advanced-search-system",
        storageBucket: "oclc-advanced-search-system.appspot.com",
        messagingSenderId: "683111933545",
        appId: "1:683111933545:web:48f08c8e006652439224f8",
        measurementId: "G-NPEH2715VT"
      
})

const app = initializeApp(firebaseConfig);
export const auth = app.auth()
export default app
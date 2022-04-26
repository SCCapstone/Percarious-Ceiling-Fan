import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//These are just things to set up firebase, there is no need to touch this unless changing project owners
const firebaseConfig = {
  apiKey: "AIzaSyApxySs35Gvjx5ImJpPsi5YQgLGUIGuA9Q",
  authDomain: "oclc-advanced-search-system.firebaseapp.com",
  projectId: "oclc-advanced-search-system",
  storageBucket: "oclc-advanced-search-system.appspot.com",
  messagingSenderId: "683111933545",
  appId: "1:683111933545:web:48f08c8e006652439224f8",
  measurementId: "G-NPEH2715VT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
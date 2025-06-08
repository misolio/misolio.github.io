import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";  


const firebaseConfig = {
  apiKey: "AIzaSyD8UpQNTRnOY7qMh7wWLereN2K5PuSqlXQ",
  authDomain: "lab-4-6aed5.firebaseapp.com",
  projectId: "lab-4-6aed5",
  storageBucket: "lab-4-6aed5.firebasestorage.app",
  messagingSenderId: "747831672247",
  appId: "1:747831672247:web:14beac9a9cf2cb2aacbc32",
  measurementId: "G-J8QFGQRZZT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const db = getFirestore(app); 

export { app, analytics, auth, db }; 
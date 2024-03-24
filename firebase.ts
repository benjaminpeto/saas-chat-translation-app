import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBFvQm5qjjnjlMlfi3fZPyP3QY9NKtXEFk",
	authDomain: "saas-chat-translation-ap-861ba.firebaseapp.com",
	projectId: "saas-chat-translation-ap-861ba",
	storageBucket: "saas-chat-translation-ap-861ba.appspot.com",
	messagingSenderId: "916293459233",
	appId: "1:916293459233:web:5382f81d0ac98d71587260",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };

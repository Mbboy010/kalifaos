// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhNbUUT5hFpZUM75C9gzQsxvWkq0lzoyU",
  authDomain: "kalifaos.firebaseapp.com",
  projectId: "kalifaos",
  storageBucket: "kalifaos.firebasestorage.app",
  messagingSenderId: "113072950533",
  appId: "1:113072950533:web:3bf278a563396f7c59bb6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)
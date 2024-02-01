// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBkg7FxJTizltPePzGR4Wib1sZgUftDwUc",
  authDomain: "clone-409620.firebaseapp.com",
  projectId: "youtube-clone-409620",
  storageBucket: "youtube-clone-409620.appspot.com",
  messagingSenderId: "501204847248",
  appId: "1:501204847248:web:833eccc88844c43bf96615",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

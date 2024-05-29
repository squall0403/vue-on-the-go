import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuucjlB-Mi2qo8Ujig9qKuw__QG0dANUs",
  authDomain: "wewallet-weelearn.firebaseapp.com",
  projectId: "wewallet-weelearn",
  storageBucket: "wewallet-weelearn.appspot.com",
  messagingSenderId: "743313162945",
  appId: "1:743313162945:web:93d6ca41724b335c4dca40",
  measurementId: "G-15B2Q6W9CS",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

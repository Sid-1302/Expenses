
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxkUarg8HL_QLBRgQOnLg7x3y3l73cgjk",
  authDomain: "expense-tracker-35a36.firebaseapp.com",
  projectId: "expense-tracker-35a36",
  storageBucket: "expense-tracker-35a36.appspot.com",
  messagingSenderId: "413158802117",
  appId: "1:413158802117:web:22852b88f676b7b23326ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
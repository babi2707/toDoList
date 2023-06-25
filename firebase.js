// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUkPCCXFi99DW2UPnyMAJpFKtqDBLo2e4",
  authDomain: "todo-barbara.firebaseapp.com",
  projectId: "todo-barbara",
  storageBucket: "todo-barbara.appspot.com",
  messagingSenderId: "839368344937",
  appId: "1:839368344937:web:35e93af088660b0b34e9f8",
  measurementId: "G-2ZM4RFHQLY",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, doc, getDoc, updateDoc, deleteDoc };

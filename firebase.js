// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtD-19ZTRHj7BY58hMsOzKRp0VR-p-2z0",
    authDomain: "todolist-b2b6c.firebaseapp.com",
    projectId: "todolist-b2b6c",
    storageBucket: "todolist-b2b6c.appspot.com",
    messagingSenderId: "98131185925",
    appId: "1:98131185925:web:84868f07453554608c676c",
    measurementId: "G-PV82LTR01D"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, doc, getDoc, updateDoc, deleteDoc };

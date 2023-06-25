// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAeYXSaf7CLNCvdOXLNvOmb29D_UK9qqNk",
  authDomain: "newtodo-776c3.firebaseapp.com",
  projectId: "newtodo-776c3",
  storageBucket: "newtodo-776c3.appspot.com",
  messagingSenderId: "683413439169",
  appId: "1:683413439169:web:499778a1bf3b4391680a40",
  measurementId: "G-53YZC7Z9KG"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, doc, getDoc, updateDoc, deleteDoc };

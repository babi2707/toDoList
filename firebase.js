// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcKKjbTEdgzMNSHD4VywapIwfQtCVv2A4",
    authDomain: "todolist-6914b.firebaseapp.com",
    projectId: "todolist-6914b",
    storageBucket: "todolist-6914b.appspot.com",
    messagingSenderId: "75921281373",
    appId: "1:75921281373:web:30360b994439071aaf18b4",
    measurementId: "G-D1E4CLG12K"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, doc, getDoc, updateDoc, deleteDoc };

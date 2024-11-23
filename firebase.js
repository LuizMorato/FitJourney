import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDorR3lOJtSz6nmZ6M6CNo8hmmc5pCLtI0",
  authDomain: "smart-eats-users.firebaseapp.com",
  projectId: "smart-eats-users",
  storageBucket: "smart-eats-users.firebasestorage.app",
  messagingSenderId: "645328212049",
  appId: "1:645328212049:web:4fc0bc1254496f24fae870"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize os serviços corretamente
const auth = getAuth(app);  // Certifique-se de passar a instância do app
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged };

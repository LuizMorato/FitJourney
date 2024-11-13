// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDorR3lOJtSz6nmZ6M6CNo8hmmc5pCLtI0",
  authDomain: "smart-eats-users.firebaseapp.com",
  projectId: "smart-eats-users",
  storageBucket: "smart-eats-users.firebasestorage.app",
  messagingSenderId: "645328212049",
  appId: "1:645328212049:web:4fc0bc1254496f24fae870"
};

// Verifica se a app já foi inicializada antes de inicializar novamente
const app = initializeApp(firebaseConfig);

// Agora você pode usar Auth e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

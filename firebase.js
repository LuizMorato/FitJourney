// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // Correto, vem de 'firebase/app'
import { initializeAuth, getAuth, getReactNativePersistence, PhoneAuthProvider, signInWithCredential } from "firebase/auth"; // getReactNativePersistence vem de 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsjG4YFxHoAeYEYA1G88fmSZ1zvsNKsnk",
  authDomain: "fit-journey-users.firebaseapp.com",
  projectId: "fit-journey-users",
  storageBucket: "fit-journey-users.appspot.com",
  messagingSenderId: "112270504735",
  appId: "1:112270504735:web:983e61b0de94fc28a7362a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Certifique-se de que isso vem de 'firebase/auth'
});

export { auth, PhoneAuthProvider, firebaseConfig, signInWithCredential };

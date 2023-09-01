// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDceIiFvFCqHuocZGSSTVO9H4AzB3g3Pj0",
  authDomain: "peliculas-api-18b69.firebaseapp.com",
  projectId: "peliculas-api-18b69",
  storageBucket: "peliculas-api-18b69.appspot.com",
  messagingSenderId: "855060964975",
  appId: "1:855060964975:web:53c3727248e604e4b00f9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
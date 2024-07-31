// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "music-recommendation-a1fd1.firebaseapp.com",
  projectId: "music-recommendation-a1fd1",
  storageBucket: "music-recommendation-a1fd1.appspot.com",
  messagingSenderId: "956057374884",
  appId: "1:956057374884:web:b6bc2945377f67721b5631",
  measurementId: "G-SLGWRJ95PT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
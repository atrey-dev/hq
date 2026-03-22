// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCWeAJLO3qn8I8ZUM0v9beJq86aR1yG0o",
  authDomain: "atrey-dev.firebaseapp.com",
  projectId: "atrey-dev",
  storageBucket: "atrey-dev.firebasestorage.app",
  messagingSenderId: "1042021544635",
  appId: "1:1042021544635:web:347f6d5617991e2ceeef9e",
  measurementId: "G-NPLM0DZH7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
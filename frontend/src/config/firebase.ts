// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOxhyJRAjtbf49q9FwXmgCRUHxAqIVS3I",
  authDomain: "gate-pass-application-d4f68.firebaseapp.com",
  projectId: "gate-pass-application-d4f68",
  storageBucket: "gate-pass-application-d4f68.firebasestorage.app",
  messagingSenderId: "699987305033",
  appId: "1:699987305033:web:a4f3f00a2a844851181598",
  measurementId: "G-HRZJCGM197"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
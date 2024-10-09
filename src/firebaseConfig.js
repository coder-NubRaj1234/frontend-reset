// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG1BhUDkdcxGcWbOFMqSAi1Pu2p_aHjBA",
  authDomain: "pradipblogs.firebaseapp.com",
  projectId: "pradipblogs",
  storageBucket: "pradipblogs.appspot.com",
  messagingSenderId: "513957317151",
  appId: "1:513957317151:web:4c276a7179d46a18b3632a",
  measurementId: "G-D8BHYGB3JQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };

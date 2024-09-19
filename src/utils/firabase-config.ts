import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfLQgpgQd421KdWqyvwmWONuwbhLDZ26A",
  authDomain: "task4-8ecfb.firebaseapp.com",
  projectId: "task4-8ecfb",
  storageBucket: "task4-8ecfb.appspot.com",
  messagingSenderId: "525787050649",
  appId: "1:525787050649:web:56e08dee0d11312f96fe08",
  measurementId: "G-DL8ZFREJZ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

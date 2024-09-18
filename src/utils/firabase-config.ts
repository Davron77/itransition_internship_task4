import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export default app;

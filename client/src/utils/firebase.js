
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "interviewguru-c0f1c.firebaseapp.com",
    projectId: "interviewguru-c0f1c",
    storageBucket: "interviewguru-c0f1c.firebasestorage.app",
    messagingSenderId: "275813163983",
    appId: "1:275813163983:web:72c3d610b63f98454568ba"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth, provider }
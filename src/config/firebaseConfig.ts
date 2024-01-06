// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7cUMwCMWutXhKPaQ3wXKPpagcbYFyHWI",
  authDomain: "recruitflow-70764.firebaseapp.com",
  projectId: "recruitflow-70764",
  storageBucket: "recruitflow-70764.appspot.com",
  messagingSenderId: "86464715153",
  appId: "1:86464715153:web:e408f894724383dc09e230",
  measurementId: "G-5T9KEHGTNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const auth = getAuth();
class AuthService {
  static async signInWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

}

export default AuthService;
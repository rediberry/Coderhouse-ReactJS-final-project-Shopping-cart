import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGy3E3QXT4e14DmuUuEI59Ty1ZhVI4FJM",
  authDomain: "changas-store.firebaseapp.com",
  projectId: "changas-store",
  storageBucket: "changas-store.appspot.com",
  messagingSenderId: "988883537106",
  appId: "1:988883537106:web:8ff2b90cac00958b9f710b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const productsCollection = collection(db, 'products');


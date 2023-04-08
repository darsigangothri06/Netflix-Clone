import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCb2lDb1n4bUyfL7IRfIgsf9s51e3pbIII",
  authDomain: "netflix-clone-0698.firebaseapp.com",
  projectId: "netflix-clone-0698",
  storageBucket: "netflix-clone-0698.appspot.com",
  messagingSenderId: "813053236753",
  appId: "1:813053236753:web:667545b705aa10502003b0",
  measurementId: "G-E07SQTWYLX"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)

import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEnv } from "./getEnv";

const firebaseConfig = {
  apiKey: getEnv("VITE_FIRE_BASE_API"),
  authDomain: "inventory-management-c9504.firebaseapp.com",
  projectId: "inventory-management-c9504",
  storageBucket: "inventory-management-c9504.firebasestorage.app",
  messagingSenderId: "382998078507",
  appId: "1:382998078507:web:973a6017a6cea99179766e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { products } from "../data/asyncMock";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
};
// console.log("se conecta");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);


// Agregar productos a la base de datos:
//
// products.forEach((prod) => {
//   addDoc(collection(db, "products"), prod)
//     .then((data) => console.log(`se agregó el producto ${data.id}`))
//     .catch((error) => console.log(error));
// });
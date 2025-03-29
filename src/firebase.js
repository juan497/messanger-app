//import firebase from "firebase";
import { initializeApp  } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCjmRngto0UYmZKgP8oOUulvRE1DbyfFJs",
    authDomain: "messanger-app-63fdb.firebaseapp.com",
    projectId: "messanger-app-63fdb",
    storageBucket: "messanger-app-63fdb.firebasestorage.app",
    messagingSenderId: "252545220537",
    appId: "1:252545220537:web:e10d16155be7b14fa1c068",
    measurementId: "G-CQ04KMD0D2"
  };



  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

export default  db ;
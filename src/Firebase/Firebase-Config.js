import {initializeApp} from 'firebase/app'
import {getFirestore} from '@firebase/firestore'
import {getAuth} from 'firebase/auth'
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO17gUiPwEbPPpDSWY_chrlssjJW7ir-8",
  authDomain: "groupslatest-6e969.firebaseapp.com",
  projectId: "groupslatest-6e969",
  storageBucket: "groupslatest-6e969.appspot.com",
  messagingSenderId: "758769434670",
  appId: "1:758769434670:web:5a4df318e438a465779fbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Db=getFirestore(app);
export const Authentication=getAuth(app)

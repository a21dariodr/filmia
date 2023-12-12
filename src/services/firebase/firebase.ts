import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// Firebase initialization configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD8_oZeglhJbK5vdSJFV7Gq3EgVYbxk6aQ',
    authDomain: 'filmia-ee910.firebaseapp.com',
    projectId: 'filmia-ee910',
    storageBucket: 'filmia - ee910.appspot.com',
    messagingSenderId: '871935945294',
    appId: '1:871935945294:web:d4f46e4993f12ac170311f',
    measurementId: 'G-XTYQG689SB'
}

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const firebase = { app, auth, db }

// Makes initialized Firebase authentication and Firestore db services avalilable in the whole app
export default firebase

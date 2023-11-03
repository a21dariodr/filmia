import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// Configuración para inicializar Firebase
const firebaseConfig = import.meta.env.PROD
    ? {
          apiKey: 'import.meta.env.VITE_FIREBASE_APIKEY',
          authDomain: 'import.meta.env.VITE_FIREBASE_AUTHDOMAIN',
          projectId: 'import.meta.env.VITE_FIREBASE_PROJECTID',
          storageBucket: 'import.meta.env.VITE_FIREBASE_STORAGEBUCKET',
          messagingSenderId: 'import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID',
          appId: 'import.meta.env.VITE_FIREBASE_APPID',
          measurementId: 'import.meta.env.VITE_FIREBASE_MEASUREMENTID'
      }
    : {
          apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
          appId: import.meta.env.VITE_FIREBASE_APPID,
          measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
      }

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const firebase = { app, auth, db }

export default firebase

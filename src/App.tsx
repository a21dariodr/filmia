import './App.css'
import { Button } from '@material-tailwind/react'
import { initializeApp } from 'firebase/app'

const App = () => {
  // Configuración para inicializar Firebase
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
  }

  const firebaseApp = initializeApp(firebaseConfig)
  const tmdApiKey = import.meta.env.VITE_TMD_ACCESS_TOKEN

  if (firebaseApp && tmdApiKey) console.log('App iniciada')
    
  return (
    <>
      <h1>Filmia</h1>
      <Button>Button</Button>
      <h2>Prueba de despliegue automático con pipeline</h2>
    </>
  )
}

export default App

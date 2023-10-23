import firebase from './util/firebase/firebase'
import FirebaseAuthService from './services/auth/FirebaseAuthService'
import { onAuthStateChanged } from 'firebase/auth'
import './App.css'
import { Button } from '@material-tailwind/react'

const App = () => {
    const tmdApiKey = import.meta.env.VITE_TMD_ACCESS_TOKEN
    const firebaseAuth = new FirebaseAuthService()

    if (firebase && firebaseAuth && tmdApiKey) console.log('App iniciada')

    // Vincula un observador al objeto de autenticación global
    onAuthStateChanged(firebase.auth, user => {
        if (user) {
            const uid = user.uid
            console.log(uid);
            
        }
    })

    return (
        <>
            <h1>Filmia</h1>
            <Button>Button</Button>
            <h2>Prueba de despliegue automático con pipeline</h2>
        </>
    )
}

export default App

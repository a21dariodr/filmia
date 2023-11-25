import firebase from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import {
    createUserWithEmailAndPassword,
    signInWithRedirect,
    getRedirectResult,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    deleteUser,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence,
    inMemoryPersistence
} from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

// Servicio para manejar autenticación a través de Firebase Authenticator
export default class FirebaseAuthService {
    private readonly auth = firebase.auth
    private navigate = useNavigate()

    // En todos los métodos, si el usuario no desea mantener la sesión iniciada, se modifica la persistencia de los métodos de Firebase
    public async createUserWithEmail(email: string, password: string, keepLogin: boolean) {
        if (keepLogin) await setPersistence(this.auth, browserLocalPersistence)
        else await setPersistence(this.auth, inMemoryPersistence)
        return createUserWithEmailAndPassword(this.auth, email, password)
    }

    public async signInGoogle(keepLogin: boolean) {
        if (keepLogin) await setPersistence(this.auth, browserLocalPersistence)
        else await setPersistence(this.auth, inMemoryPersistence)
        return signInWithRedirect(this.auth, googleProvider)
    }

    public getSignInGoogleResult() {
        return getRedirectResult(this.auth)
    }

    public async signInWithEmail(email: string, password: string, keepLogin: boolean) {
        if (keepLogin) await setPersistence(this.auth, browserLocalPersistence)
        else await setPersistence(this.auth, inMemoryPersistence)
        return signInWithEmailAndPassword(this.auth, email, password)
    }

    public logOut() {
		localStorage.clear()
        signOut(this.auth)
            .then(() => this.navigate('/'))
            .catch(error => error)
    }

    public dropUser() {
        deleteUser(this.auth.currentUser!)
            .then(response => response)
            .catch(error => error)
    }

    public resetPassword(email: string) {
        return sendPasswordResetEmail(this.auth, email)
    }
}

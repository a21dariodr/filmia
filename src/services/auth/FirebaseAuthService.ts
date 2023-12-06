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

/* Service for managing authentication through Firebase Authenticator
 * In all of the cases, Firebase methods persistence is modified if the user doesn't want to keep the session started
 */
export default class FirebaseAuthService {
    private readonly auth = firebase.auth
    private navigate = useNavigate()

    // Signs up a new user with email and password
    public async createUserWithEmail(email: string, password: string, keepLogin: boolean) {
        if (keepLogin) await setPersistence(this.auth, browserLocalPersistence)
        else await setPersistence(this.auth, inMemoryPersistence)
        return createUserWithEmailAndPassword(this.auth, email, password)
    }

	// Signs up or logs in a user with a Google account
    public async signInGoogle(keepLogin: boolean) {
        if (keepLogin) await setPersistence(this.auth, browserLocalPersistence)
        else await setPersistence(this.auth, inMemoryPersistence)
        return signInWithRedirect(this.auth, googleProvider)
    }

	// Obtains the result of a Google account authentication
    public getSignInGoogleResult() {
        return getRedirectResult(this.auth)
    }

	// Logs in a user with email and password
    public async signInWithEmail(email: string, password: string, keepLogin: boolean) {
        if (keepLogin) await setPersistence(this.auth, browserLocalPersistence)
        else await setPersistence(this.auth, inMemoryPersistence)
        return signInWithEmailAndPassword(this.auth, email, password)
    }

	// Logs out a user
    public logOut() {
		localStorage.clear()
        signOut(this.auth)
            .then(() => this.navigate('/'))
            .catch(error => error)
    }

	// Deletes a user account
    public dropUser() {
        deleteUser(this.auth.currentUser!)
            .then(response => response)
            .catch(error => error)
    }

	// Resets a user password
    public resetPassword(email: string) {
        return sendPasswordResetEmail(this.auth, email)
    }
}

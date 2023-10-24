import firebase from '../../util/firebase/firebase'
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    deleteUser
} from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

// Servicio para manejar autenticación a través de Firebase Authenticator
export default class FirebaseAuthService {

    private readonly auth = firebase.auth

    public createUserWithEmail(email: string, password: string) {
        createUserWithEmailAndPassword(this.auth, email, password)
            .then( userCredential => userCredential.user )
            .catch( error => error )
    }

    public signInGoogle() {
        signInWithPopup(this.auth, googleProvider)
            .then(userCredential => userCredential.user)
            .catch(error => error)
    }

    public signInWithEmail(email: string, password: string) {
        signInWithEmailAndPassword(this.auth, email, password)
            .then( userCredential => userCredential.user )
            .catch( error => error )
    }

    public logOut() {
        signOut(this.auth)
            .then ( result => result)
            .catch ( error => error )
    }

    public dropUser() {
        deleteUser(this.auth.currentUser!)
            .then ( response => response)
            .catch ( error => error )
    }
}

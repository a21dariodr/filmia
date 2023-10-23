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

// Servicio para manejar autenticación a través de Firebase
export default class FirebaseAuthService {

    public createUserWithEmail(email: string, password: string) {
        createUserWithEmailAndPassword(firebase.auth, email, password)
            .then( userCredential => userCredential.user )
            .catch( error => error )
    }

    public signInGoogle() {
        signInWithPopup(firebase.auth, googleProvider)
            .then( userCredential => userCredential.user )
            .catch( error => error )
    }

    public signInWithEmail(email: string, password: string) {
        signInWithEmailAndPassword(firebase.auth, email, password)
            .then( userCredential => userCredential.user )
            .catch( error => error )
    }

    public logOut() {
        signOut(firebase.auth)
            .then ( result => result)
            .catch ( error => error )
    }

    public dropUser() {
        deleteUser(firebase.auth.currentUser!)
            .then ( response => response)
            .catch ( error => error )
    }
}

import firebase from '../../util/firebase/firebase'
import { useNavigate } from 'react-router-dom'
import {
    createUserWithEmailAndPassword,
	signInWithRedirect,
	getRedirectResult,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    deleteUser,
	sendPasswordResetEmail
} from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

// Servicio para manejar autenticación a través de Firebase Authenticator
export default class FirebaseAuthService {
    private readonly auth = firebase.auth
    private navigate = useNavigate()

    public createUserWithEmail(email: string, password: string) {
        createUserWithEmailAndPassword(this.auth, email, password)
            .then(userCredential => {
                localStorage.setItem("userEmail", userCredential.user.email!)
                console.log('User email: ', userCredential.user.email)
                this.navigate("/")
            })
            .catch(error => error)
    }

    public signInGoogle() {
		signInWithRedirect(this.auth, googleProvider)
    }

	public getSignInGoogleResult() {
		getRedirectResult(this.auth)
            .then(userCredential => {
				if (userCredential) {
					localStorage.setItem('userEmail', userCredential.user.email!)
                    console.log('User email: ', userCredential.user.email)
                    this.navigate('/')
				}
            })
            .catch(error => error)
	}

    public signInWithEmail(email: string, password: string) {
        signInWithEmailAndPassword(this.auth, email, password)
            .then(userCredential => {
                localStorage.setItem('userEmail', userCredential.user.email!)
                console.log('User email: ', userCredential.user.email)
                this.navigate("/")
            })
            .catch(error => error)
    }

    public logOut() {
		localStorage.removeItem('userEmail')
        signOut(this.auth)
            .then(() => this.navigate("/"))
            .catch(error => error)
    }

    public dropUser() {
        deleteUser(this.auth.currentUser!)
            .then((response) => response)
            .catch(error => error)
    }

	public resetPassword(email: string) {
		sendPasswordResetEmail(this.auth, email)
            .then(() => {
                console.log("Enviado email de recuperación")
                this.navigate("/")
            })
            .catch(error => error)
	}
}

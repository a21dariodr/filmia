import firebase from '../firebase/firebase'
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore/lite'
import { useSelector } from 'react-redux'
import { getId } from '../../state-slices/userSlice'

// Servicio para obtener y guardar datos en la DB Firestore de Firebase
export default class FirebaseFirestoreService {
    private readonly firestore = firebase.db
    private userId = useSelector(getId)

    // Se accede a cada elemento devuelto con .foreach(doc => doc.id / doc.data)
    public async getUserFilms() {
        const filmsRef = collection(this.firestore, 'usuarios', this.userId, 'peliculas')
        return await getDocs(filmsRef)
    }

    public async addUserFilm(filmId: string, puntuacion: number | null, vista: boolean) {
        const filmDoc = doc(this.firestore, 'usuarios', this.userId, 'peliculas', filmId)
        return await setDoc(filmDoc, {
            puntuacion,
            vista
        })
    }

    public async updateUserFilm(filmId: string, puntuacion: number | null, vista: boolean) {
        const filmDoc = doc(this.firestore, 'usuarios', this.userId, 'peliculas', filmId)
		return await setDoc(filmDoc, {
			puntuacion,
			vista
		}, { merge: true })
    }

    public async deleteUserFilm(filmId: string) {
        const filmDoc = doc(this.firestore, 'usuarios', this.userId, 'peliculas', filmId)
        return await deleteDoc(filmDoc)
    }
}

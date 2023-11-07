import firebase from '../firebase/firebase'
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore/lite'

// Servicio para obtener y guardar datos en la DB Firestore de Firebase
export default class FirebaseFirestoreService {
    private readonly firestore = firebase.db

    // Se accede a cada elemento devuelto con .foreach(doc => doc.id / doc.data)
    public async getUserFilms(userId: string) {
        const filmsRef = collection(this.firestore, 'usuarios', userId, 'peliculas')
        return await getDocs(filmsRef)
    }

    public async addUserFilm(userId: string, filmId: string, puntuacion: number | null = null, vista: boolean = false) {
        const filmDoc = doc(this.firestore, 'usuarios', userId, 'peliculas', filmId)
        await setDoc(filmDoc, {
            puntuacion: puntuacion,
            vista: vista
        })
    }

    public async updateUserFilm(userId: string, filmId: string, puntuacion?: number, vista?: boolean) {
        const filmDoc = doc(this.firestore, 'usuarios', userId, 'peliculas', filmId)
        if (puntuacion && vista) {
            await setDoc(filmDoc, {
                puntuacion: puntuacion,
                vista: vista
            })
        } else if (puntuacion) {
            await setDoc(filmDoc, { puntuacion: puntuacion }, { merge: true })
        } else {
            await setDoc(filmDoc, { vista: vista }, { merge: true })
        }
    }

    public async deleteUserFilm(userId: string, filmId: string) {
        const filmDoc = doc(this.firestore, 'usuarios', userId, 'peliculas', filmId)
        await deleteDoc(filmDoc)
    }
}

import firebase from '../firebase/firebase'
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore/lite'
import { useSelector } from 'react-redux'
import { getId } from '../../state-slices/userSlice'
import { Film } from '../../models/Film'

// Servicio para obtener y guardar datos en la DB Firestore de Firebase
export default class FirebaseFirestoreService {
    private readonly firestore = firebase.db
    private userId = useSelector(getId)

    // Se accede a cada elemento devuelto con .foreach(doc => doc.id / doc.data)
    public async getUserFilms() {
        const filmsRef = collection(this.firestore, 'usuarios', this.userId, 'peliculas')
        const filmsDocs = await getDocs(filmsRef)
        return this.filmsMapper(filmsDocs)
    }

    public async addUserFilm(film: Film) {
        const filmDoc = doc(this.firestore, 'usuarios', this.userId, 'peliculas', film.id.toString())
		const genres = film.genres?.join(',')
        return await setDoc(filmDoc, {
            title: film.title,
            originalTitle: film.originalTitle,
            duration: film.duration,
            releaseYear: film.releaseYear,
            genres,
            posterPath: film.posterPath,
			voteAverage: film.voteAverage,
            score: film.score,
            watched: film.watched
        })
    }

    public async updateUserFilm(film: Film) {
        const filmDoc = doc(this.firestore, 'usuarios', this.userId, 'peliculas', film.id.toString())
        return await setDoc(
            filmDoc,
            {
                score: film.score,
                watched: film.watched
            },
            { merge: true }
        )
    }

    public async deleteUserFilm(film: Film) {
        const filmDoc = doc(this.firestore, 'usuarios', this.userId, 'peliculas', film.id.toString())
        return await deleteDoc(filmDoc)
    }

    private filmsMapper(filmsDocs: any): Film[] {
        const films: Film[] = []
        filmsDocs.forEach((filmDoc: any) => {
			const id = filmDoc.id
			const filmData = filmDoc.data()
			
			const title = filmData.title
			const originalTitle = filmData.originalTitle
			const duration = filmData.duration
            const releaseYear = filmData.releaseYear
            const genres = filmData.genres.split(',')
			const posterPath = filmData.posterPath
			const voteAverage = filmData.voteAverage
			const score = filmData.score
			const watched = filmData.watched
			
			const film = new Film(id, title, originalTitle, releaseYear, posterPath, voteAverage)

            film.duration = duration
			film.genres = genres
			film.score = score
            film.watched = watched
			
            films.push(film)
        })
        return films
    }
}

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

    public async addUserFilm(filmId: number, film: Film) {
        const filmDoc = doc(this.firestore, 'usuarios', this.userId, 'peliculas', filmId.toString())
        return await setDoc( filmDoc, { ...film } )
    }

    public async updateUserFilm(filmId: string, puntuacion: number | null, vista: boolean) {
        const filmDoc = doc(this.firestore, 'usuarios', this.userId, 'peliculas', filmId)
        return await setDoc(
            filmDoc,
            {
                puntuacion,
                vista
            },
            { merge: true }
        )
    }

    public async deleteUserFilm(filmId: string) {
        const filmDoc = doc(this.firestore, 'usuarios', this.userId, 'peliculas', filmId)
        return await deleteDoc(filmDoc)
    }

    private filmsMapper(filmsDocs: any): Film[] {
        const films: Film[] = []
        filmsDocs.forEach((filmDoc: any) => {
			const filmData = filmDoc.data()

			const id = filmData._id
			const title = filmData._title
			const originalTitle = filmData._originalTitle
			const originalLanguage = filmData._originalLanguage
			const duration = filmData._duration
			const releaseYear = filmData._releaseYear
			const genres = filmData._genres
			const overview = filmData._overview
			const posterPath = filmData._posterPath
			const productionCountries = filmData._productionCountries
			const productionCompanies = filmData._productionCompanies
			const voteAverage = filmData._voteAverage
			const revenue = filmData._revenue
			const popularity = filmData._popularity
			const score = filmData._score
			const watched = filmData._watched
			const cast = filmData._cast
			const crew = filmData._crew
			
			const film = new Film(id, title, originalTitle, releaseYear, posterPath, voteAverage)

			film.originalLanguage = originalLanguage
            film.duration = duration
			film.genres = genres
            film.overview = overview
			film.productionCountries = productionCountries
            film.productionCompanies = productionCompanies
			film.revenue = revenue
            film.popularity = popularity
			film.score = score
            film.watched = watched
			film.cast = cast
			film.crew = crew
			
            films.push(film)
        })
        return films
    }
}

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getId } from '../state-slices/userSlice'
import { useTranslation } from 'react-i18next'
import FirebaseFirestoreService from '../services/db/FirebaseFirestoreService'
import TheMovieDatabaseApiService from '../services/api/TheMovieDatabaseApiService'
import { Film } from '../models/Film'
import Atropos from 'atropos/react'
import { Button } from '@material-tailwind/react'

const Gallery = () => {
    const { t } = useTranslation()
	const navigate = useNavigate()
	const firestore = new FirebaseFirestoreService()
	const tmd = new TheMovieDatabaseApiService()
	const [ userFilms, setUserFilms ] = useState<Film[]>([])
	const userId = useSelector(getId)

	const newFilmHandler = () => navigate('/newFilm')

	console.debug('User films: ', userFilms)

	useEffect( () => {
		const fetchUserFilms = async () => {
			const filmsDocs = await firestore.getUserFilms()
			const filmsInfo: any[] = []

			filmsDocs.forEach( filmDoc => filmsInfo.push( {
				id: filmDoc.id,
            	score: filmDoc.data().puntuacion,
            	watched: filmDoc.data().vista
			}))

			const filmsPromise = filmsInfo.map( async filmInfo => {
				const film = await tmd.getMovieById(filmInfo.id)
				film.score = filmInfo.score
                film.watched = filmInfo.watched
                return film
			})

			// TODO añadir a Redux con dispatch tras crear state slice para Films!!
			Promise.all( filmsPromise )
				.then( films => setUserFilms(films))
		}

		fetchUserFilms()
	}, [ userId ])

    return (
        <>
            <h2>{t('deploy_test')}</h2>

            <Button onClick={newFilmHandler} size="md" className="text-xs bg-violet-700 hover:bg-violet-600">
                {t('common.add_film')}
            </Button>

            {userFilms.map(film => (
                <p key={film.id}>
                    {film.title}
                    {<Atropos className="inline w-32">
						<img src={film.posterPath} className="inline-block w-32" />
					</Atropos>}
                    {film.watched ? 'Vista' : 'No vista'} {film.score}
                </p>
            ))}
        </>
    )
}

export default Gallery

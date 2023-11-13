import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import FirebaseFirestoreService from '../services/db/FirebaseFirestoreService'
import TheMovieDatabaseApiService from '../services/api/TheMovieDatabaseApiService'
import { Film } from '../models/Film'
import { Button } from '@material-tailwind/react'

const Gallery = () => {
    const { t } = useTranslation()
	const navigate = useNavigate()
	const firestore = new FirebaseFirestoreService()
	const tmd = new TheMovieDatabaseApiService()
	const [ userFilms, setUserFilms ] = useState<Film[]>([])

	const newFilmHandler = () => navigate('/newFilm')

	console.debug('User films: ', userFilms)

	useEffect( () => {
		const films: Film[] = [];

		firestore.getUserFilms()
			.then( (filmsDocs) => {
                filmsDocs.forEach(doc => {
                    const id = doc.id
                    const data = doc.data()
                    const score = data.puntuacion
                    const watched = data.vista

                    tmd.getMovieById(id).then( film => {
                        film.score = score
                        film.watched = watched

                        films.push(film)
                    })
                })

                // TODO añadir array de películas a Redux tras finalizar el mapeo! (CREAR ANTES EL STATESLICE PARA LAS PELIS!!)
				console.debug('Films: ', films)
				setUserFilms(films)
            })
	}, [])

    return (
        <>
            <h2>
                {t('deploy_test')}
            </h2>

            <Button onClick={newFilmHandler} size="md" className="text-xs bg-violet-700 hover:bg-violet-600">
                {t('common.add_film')}
            </Button>

			{userFilms.map( (film) => (<p key={film.id}>{film.title} {film.watched}</p>) )}
        </>
    )
}

export default Gallery

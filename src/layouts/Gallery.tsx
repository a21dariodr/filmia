import { useEffect } from 'react'
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

	const newFilmHandler = () => navigate('/newFilm')

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
                console.log('Films: ', films)
            })
	})

    return (
        <>
            <h2>
                {t('deploy_test')}
            </h2>

            <Button onClick={newFilmHandler} size="md" className="text-xs bg-violet-700 hover:bg-violet-600">
                {t('common.add_film')}
            </Button>
        </>
    )
}

export default Gallery

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getId } from '../state-slices/userSlice'
import { setFilms, getFilms } from '../state-slices/filmsSlice'
import { useTranslation } from 'react-i18next'
import FirebaseFirestoreService from '../services/db/FirebaseFirestoreService'
import { Film } from '../models/Film'
import Atropos from 'atropos/react'
import { Button } from '@material-tailwind/react'

const Gallery = () => {
    const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const firestore = new FirebaseFirestoreService()
	const [ userFilms, setUserFilms ] = useState<Film[]>([])
	const userId = useSelector(getId)
	const filmsList = useSelector(getFilms)
	
	const newFilmHandler = () => navigate('/newFilm')

	console.debug('User films: ', userFilms)
	console.debug('List',filmsList)

	useEffect( () => {
		firestore.getUserFilms()
			.then( (films: Film[]) => {
				if (films) dispatch(setFilms(films))
				setUserFilms(films)
			})
	}, [ userId ])

    return (
        <>
            <h2>{t('deploy_test')}</h2>

            <Button onClick={newFilmHandler} size="md" className="text-xs bg-violet-700 hover:bg-violet-600">
                {t('common.add_film')}
            </Button>

            {userFilms.map(film => (
                <div key={film.id}>
                    {film.title}
                    {<Atropos className="inline w-32">
						<img src={film.posterPath} className="inline-block w-32" />
					</Atropos>}
                    {film.watched ? 'Vista' : 'No vista'} {film.score}
                </div>
            ))}
        </>
    )
}

export default Gallery

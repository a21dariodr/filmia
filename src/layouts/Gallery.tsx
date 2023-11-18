import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getId } from '../state-slices/userSlice'
import { setFilms, getFilms } from '../state-slices/filmsSlice'
import { useTranslation } from 'react-i18next'
import FirebaseFirestoreService from '../services/db/FirebaseFirestoreService'
import { Film } from '../models/Film'
import Atropos from 'atropos/react'
import { Button, Switch } from '@material-tailwind/react'

const Gallery = () => {
    const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const firestore = new FirebaseFirestoreService()
	const [ userFilms, setUserFilms ] = useState<Film[]>([])
	const filmsList = useSelector(getFilms)
	const userId = useSelector(getId)
	const [ atropos, setAtropos ] = useState(true)
	
	const newFilmHandler = () => navigate('/newFilm')

	console.debug('User films: ', userFilms)
	console.debug('List',filmsList)

	const atroposHandler = () => setAtropos(!atropos)

	useEffect( () => {
		firestore.getUserFilms()
			.then( (films: Film[]) => {
				if (films) dispatch(setFilms(films))
				setUserFilms(films)
			})
	}, [ userId ])

    return (
        <main className="w-full px-3 md:px-5">
            <div className="flex gap-x-2 md:gap-x-5 justify-center align-middle">
                <Switch label={t('gallery.3d_effect')} checked={atropos} onChange={atroposHandler} className="checked:bg-violet-700" crossOrigin="anonymous" />

                <Button onClick={newFilmHandler} size="md" className="text-xs bg-violet-700 hover:bg-violet-600">
                    {t('common.add_film')}
                </Button>
            </div>

            <div id="films" className="flex flex-wrap justify-center gap-3 md:gap-5 w-full my-2 md:my-4">
                {userFilms.map(film => (
                    <div key={film.id} className="flex flex-wrap w-40 md:w-60">
                        {atropos ? (
                            <Atropos rotateTouch={'scroll-y'} className="">
                                <figure className="relative">
                                    <img src={film.posterPath} className="rounded-md" alt="Poster" />
                                </figure>
                                <figcaption data-atropos-offset="5" className="absolute bottom-2 left-2 w-[calc(100%-1rem)] rounded-md border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                                    <div className="font-bold">{film.title}</div>
                                    <div>
                                        {film.watched ? 'Vista' : 'No vista'} {film.score}
                                    </div>
                                </figcaption>
                            </Atropos>
                        ) : (
                            <figure className="relative">
                                <img src={film.posterPath} className="rounded-md" alt="Poster" />
                                <figcaption className="absolute bottom-2 left-2 w-[calc(100%-1rem)] rounded-md border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                                    <div className="font-bold">{film.title}</div>
                                    <div>
                                        {film.watched ? 'Vista' : 'No vista'} {film.score}
                                    </div>
                                </figcaption>
                            </figure>
                        )}
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Gallery

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getId } from '../state-slices/userSlice'
import { setFilms, getFilms } from '../state-slices/filmsSlice'
import { useTranslation } from 'react-i18next'
import FirebaseFirestoreService from '../services/db/FirebaseFirestoreService'
import { Film } from '../models/Film'
import Atropos from 'atropos/react'
import { Button, ButtonGroup, Switch } from '@material-tailwind/react'

const Gallery = () => {
    const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const firestore = new FirebaseFirestoreService()
	const [ userFilms, setUserFilms ] = useState<Film[]>([])
	const filmsList = useSelector(getFilms)
	const userId = useSelector(getId)
	const [ atropos, setAtropos ] = useState(true)
	const [ smallCards, setSmallCards ] = useState(false)
	
	const newFilmHandler = () => navigate('/newFilm')

	console.debug('User films: ', userFilms)
	console.debug('Redux filmList', filmsList)
	console.debug('Small cards: ', smallCards)

	const atroposHandler = () => setAtropos(!atropos)

	const bigCardsHandler = () => {
		const bigCardsButton = document.querySelector('#bigCards')
		const smallCardsButton = document.querySelector('#smallCards')
		const filmDivs = document.querySelectorAll('div.film')

		if (smallCards) {
			bigCardsButton?.classList.add('brightness-50')
            smallCardsButton?.classList.remove('brightness-50')
			filmDivs.forEach( filmDiv => {
				filmDiv.classList.add('w-40', 'md:w-60')
				filmDiv.classList.remove('w-24', 'md:w-32')
			})
			setSmallCards(false)
		}
	}

	const smallCardsHandler = () => {
		const bigCardsButton = document.querySelector('#bigCards')
        const smallCardsButton = document.querySelector('#smallCards')
		const filmDivs = document.querySelectorAll('div.film')

		if (!smallCards) {
            smallCardsButton?.classList.add('brightness-50')
            bigCardsButton?.classList.remove('brightness-50')
			filmDivs.forEach(filmDiv => {
				filmDiv.classList.add('w-24', 'md:w-32')
                filmDiv.classList.remove('w-40', 'md:w-60')
            })
			setSmallCards(true)
        }
    }

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

                <Button onClick={newFilmHandler} size="sm" className="text-xs bg-violet-700 hover:bg-violet-600">
                    {t('common.add_film')}
                </Button>

                <ButtonGroup size="sm">
                    <Button onClick={bigCardsHandler} id="bigCards" className="brightness-50">
                        <span className="material-symbols-outlined">zoom_in</span>
                    </Button>
                    <Button onClick={smallCardsHandler} id="smallCards">
                        <span className="material-symbols-outlined">zoom_out</span>
                    </Button>
                </ButtonGroup>
            </div>

            <div id="films" className="flex flex-wrap justify-center gap-3 md:gap-5 w-full my-2 md:my-4">
                {userFilms.map(film => (
                    <div key={film.id} className="film flex flex-wrap w-40 md:w-60">
                        {atropos ? (
                            <Atropos rotateTouch={'scroll-y'}>
                                <figure className="relative">
                                    <img src={film.posterPath} className="rounded-md" alt="Poster" />
                                </figure>
                                <figcaption data-atropos-offset="5" className="absolute bottom-2 left-2 w-[calc(100%-1rem)] rounded-md border border-white bg-white/75 p-2 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                                    <div className="font-bold">{film.title}</div>
                                    <div>
                                        {film.watched ? 'Vista' : 'No vista'} {film.score}
                                    </div>
                                </figcaption>
                            </Atropos>
                        ) : (
                            <figure className="relative">
                                <img src={film.posterPath} className="rounded-md" alt="Poster" />
                                <figcaption className="absolute bottom-2 left-2 w-[calc(100%-1rem)] rounded-md border border-white bg-white/75 p-2 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
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

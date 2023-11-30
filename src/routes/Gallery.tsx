import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFilms } from '../state-slices/filmsSlice'
import { useTranslation } from 'react-i18next'
import FirebaseFirestoreService from '../services/db/FirebaseFirestoreService'
import { Film } from '../models/Film'
import Atropos from 'atropos/react'
import { Button, ButtonGroup, Chip, Switch } from '@material-tailwind/react'
import '../styles/Gallery.css'

const Gallery = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const firestore = new FirebaseFirestoreService()
    const [userFilms, setUserFilms] = useState<Film[]>([])
    const userId = localStorage.getItem('userId')!
    const [atropos, setAtropos] = useState(true)
    const [smallCards, setSmallCards] = useState(false)
	const [titleSearch, setTitleSearch] = useState<string>('')
	const [processedUserFilms, setProcessedUserFilms] = useState<Film[]>([])

	console.debug('User films: ', userFilms)
    console.debug('Small cards: ', smallCards)

    const newFilmHandler = () => navigate('/newFilm')

	const filmClickHandler = (film: Film) => navigate('/films/' + film.id)

    const atroposHandler = () => setAtropos(!atropos)

    const bigCardsHandler = () => {
        const bigCardsButton = document.querySelector('#bigCards')
        const smallCardsButton = document.querySelector('#smallCards')

        if (smallCards) {
            bigCardsButton?.classList.add('brightness-50')
            smallCardsButton?.classList.remove('brightness-50')
            setSmallCards(false)
        }
    }

    const smallCardsHandler = () => {
        const bigCardsButton = document.querySelector('#bigCards')
        const smallCardsButton = document.querySelector('#smallCards')

        if (!smallCards) {
            smallCardsButton?.classList.add('brightness-50')
            bigCardsButton?.classList.remove('brightness-50')
            setSmallCards(true)
        }
    }

	const onTitleSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitleSearch(event.target.value)

		if (event.target.value !== '') {
			const searchText = event.target.value.toLowerCase()
            const searchRegexp = new RegExp(`.*${searchText}.*`)
            const filteredResults = userFilms.filter(film => film.title.toLowerCase().match(searchRegexp) || film.originalTitle.toLowerCase().match(searchRegexp))
            setProcessedUserFilms(filteredResults)
			console.log('Filtered search results', filteredResults)
		} else {
			setProcessedUserFilms(userFilms)
		}
	}

    useEffect(() => {
        firestore.getUserFilms().then((films: Film[]) => {
            if (films) dispatch(setFilms(films))
            setUserFilms(films)
			setProcessedUserFilms(films)
        })
    }, [userId])

    return (
        <main className="w-full px-3 md:px-5">
            <div className="inline-flex w-full md:w-1/2 gap-x-2 md:gap-x-5 justify-center align-middle mb-1 md:mb-0">
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

            <div className='inline-flex w-full md:w-1/2 gap-x-2 md:gap-x-5 justify-center align-middle my-2 md:mt-0"'>
                <div className="search w-30 md:w-34 p-2 md:px-3 text-xs md:text-sm font-bold outline-none hover:bg-indigo-200 bg-indigo-100  rounded-lg md:rounded-xl">
                    <span className="material-symbols-outlined align-middle font-bold text-sm md:text-base">search</span>
                    <input id="search" type="text" placeholder={t('common.search')} value={titleSearch} onChange={onTitleSearchHandler} className="placeholder:text-gray-700
						bg-indigo-100 text-dark-gray-900 ml-2 align-middle" />
                </div>
            </div>

            <div id="films" className="flex flex-wrap justify-center gap-3 md:gap-5 w-full my-2 md:my-4">
                {processedUserFilms.map(film => (
                    <div
                        onClick={() => filmClickHandler(film)}
                        onKeyDown={() => filmClickHandler(film)}
                        key={film.id}
                        className={'flex flex-wrap ' + (!smallCards ? 'w-40 md:w-60 text-xs md:text-base' : 'smallCards w-24 md:w-32 text-[9px] md:text-xs')}>
                        {atropos ? (
                            <Atropos rotateTouch={'scroll-y'} className="w-full h-full">
                                <figure className="relative w-full h-full">
                                    {film.posterPath ? (
                                        <img src={film.posterPath} className="rounded-md" alt="Poster" />
                                    ) : (
                                        <div className="flex flex-wrap h-full place-content-center border bg-white">
                                            <span className="material-symbols-outlined text-indigo-600 text-8xl">image</span>
                                            <p className="text-sm md:text-lg font-bold text-indigo-600">{t('film.image_error')}</p>
                                        </div>
                                    )}
                                </figure>
                                <figcaption
                                    data-atropos-offset="5"
                                    className="filmInfo absolute bottom-2 left-2 w-[calc(100%-1rem)] rounded-md border border-white bg-white/75 p-1
									shadow-lg shadow-black/5 saturate-200 backdrop-blur-3xl">
                                    <div className="font-black uppercase text-center pb-1">{film.title}</div>
                                    <div className="flex flex-wrap gap-1 justify-center">
                                        <Chip size="sm" value={film.releaseYear} className="chip chipYear" />
                                        <Chip
                                            size="sm"
                                            value={
                                                <span>
                                                    <span className="material-symbols-outlined align-middle text-sm">timer</span>
                                                    {' ' + film.duration} {t('film.film_duration_units_abbreviation')}
                                                </span>
                                            }
                                            className="chip chipDuration lowercase bg-violet-800 pl-1"
                                        />
                                        <Chip
                                            size="sm"
                                            value={
                                                film.watched ? (
                                                    <span>
                                                        <span className="material-symbols-outlined align-sub text-sm">star</span>
                                                        {' ' + (film.score ? film.score : '0.0')}
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <span className="material-symbols-outlined align-middle text-sm">close</span>
                                                        {' ' + (film.score ? film.score : '0.0')}
                                                    </span>
                                                )
                                            }
                                            className="chip capitalize bg-amber-900 pl-1"
                                        />
                                    </div>
                                </figcaption>
                            </Atropos>
                        ) : (
                            <figure className="relative">
                                {film.posterPath ? (
                                    <img src={film.posterPath} className="rounded-md" alt="Poster" />
                                ) : (
                                    <div className="flex flex-wrap h-full place-content-center border bg-white">
                                        <span className="material-symbols-outlined text-indigo-600 text-8xl">image</span>
                                        <p className="text-sm md:text-lg font-bold text-indigo-600">{t('film.image_error')}</p>
                                    </div>
                                )}
                                <figcaption
                                    data-atropos-offset="5"
                                    className="filmInfo absolute bottom-2 left-2 w-[calc(100%-1rem)] rounded-md border border-white bg-white/75 p-1
									shadow-lg shadow-black/5 saturate-200 backdrop-blur-3xl">
                                    <div className="font-black uppercase text-center pb-1">{film.title}</div>
                                    <div className="flex flex-wrap gap-1 justify-center">
                                        <Chip size="sm" value={film.releaseYear} className="chip chipYear" />
                                        <Chip
                                            size="sm"
                                            value={
                                                <span>
                                                    <span className="material-symbols-outlined align-middle text-sm">timer</span>
                                                    {' ' + film.duration} {t('film.film_duration_units_abbreviation')}
                                                </span>
                                            }
                                            className="chip chipDuration lowercase bg-violet-800 pl-1"
                                        />
                                        <Chip
                                            size="sm"
                                            value={
                                                film.watched ? (
                                                    <span>
                                                        <span className="material-symbols-outlined align-sub text-sm">star</span>
                                                        {' ' + (film.score ? film.score : '0.0')}
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <span className="material-symbols-outlined align-middle text-sm">close</span>
                                                        {' ' + (film.score ? film.score : '0.0')}
                                                    </span>
                                                )
                                            }
                                            className="chip capitalize bg-amber-900 pl-1"
                                        />
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

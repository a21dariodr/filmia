import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setFilms, getFilms } from '../state-slices/filmsSlice'
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
    const filmsList = useSelector(getFilms)
    const userId = localStorage.getItem('userId')!
    const [atropos, setAtropos] = useState(true)
    const [smallCards, setSmallCards] = useState(false)

    const newFilmHandler = () => navigate('/newFilm')

    console.debug('User films: ', userFilms)
    console.debug('Redux filmList', filmsList)
    console.debug('Small cards: ', smallCards)

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

    useEffect(() => {
        firestore.getUserFilms().then((films: Film[]) => {
            if (films) dispatch(setFilms(films))
            setUserFilms(films)
        })
    }, [userId])

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
                                                        {' ' + film.score}
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <span className="material-symbols-outlined align-middle text-sm">close</span>
                                                        {' 0.0'}
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
                                                        {' ' + film.score}
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <span className="material-symbols-outlined align-middle text-sm">close</span>
                                                        {' 0.0'}
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

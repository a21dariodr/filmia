import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFilms } from '../state-slices/filmsSlice'
import { useTranslation } from 'react-i18next'
import FirebaseFirestoreService from '../services/db/FirebaseFirestoreService'
import { Film } from '../models/Film'
import Atropos from 'atropos/react'
import { Button, ButtonGroup, Chip, List, ListItem, Menu, MenuHandler, MenuItem, MenuList, Switch } from '@material-tailwind/react'
import { ChevronUpIcon } from '@heroicons/react/24/solid'
import '../styles/Gallery.css'

const Gallery = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const firestore = new FirebaseFirestoreService()
    const userId = localStorage.getItem('userId')!

	const [userFilms, setUserFilms] = useState<Film[]>([])
	const [processedUserFilms, setProcessedUserFilms] = useState<Film[]>([])
    const [atropos, setAtropos] = useState(true)
    const [smallCards, setSmallCards] = useState(false)

	const [titleSearch, setTitleSearch] = useState<string>('')
	const [sortOrder, setSortOrder] = useState<string>('asc')
	const [sortField, setSortField] = useState<string>('title')

	const [filterChanges, setFilterChanges] = useState<number>(0)
	const [filterGenre, setFilterGenre] = useState<boolean>(false)
	const [filterGenreValue, setFilterGenreValue] = useState<string>('Acción')
	const [filterWatched, setFilterWatched] = useState<boolean>(false)
	const [filterWatchedValue, setFilterWatchedValue] = useState<boolean>(false)
	const [openFilterWatchedMenu, setOpenFilterWatchedMenu] = useState<boolean>(false)
	const [openFilterGenreMenu, setOpenFilterGenreMenu] = useState<boolean>(false)
	
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

	const onSortHandler = (field: string) => {
		if (sortField !== field) {
			console.debug('Changing sort field to: ', field)
			setSortField(field)
		}

		const sortedFilms = (processedUserFilms.length > 0 || filterGenre || filterWatched) ? [...processedUserFilms] : [...userFilms]
		sortedFilms.sort((a: Film, b: Film): number => {
			switch (field) {
                case 'title':
                    if (sortOrder === 'asc') return a.title.localeCompare(b.title)
                    else return b.title.localeCompare(a.title)
                case 'originalTitle':
                    if (sortOrder === 'asc') return a.originalTitle.localeCompare(b.originalTitle)
                    else return b.originalTitle.localeCompare(a.originalTitle)
                case 'duration':
					if (sortOrder === 'asc') {
						if (!a.duration) return -1
						else if (!b.duration) return 1
						else return a.duration - b.duration
					} else {
						if (!a.duration) return 1
                        else if (!b.duration) return -1
                        else return b.duration - a.duration
					}
				case 'releaseYear':
					if (sortOrder === 'asc') {
						if (!a.releaseYear) return -1
						else if (!b.releaseYear) return 1
                        else return a.releaseYear - b.releaseYear
					} else {
						if (!a.releaseYear) return 1
                        else if (!b.releaseYear) return -1
                        else return b.releaseYear - a.releaseYear
					}
				case 'voteAverage':
					if (sortOrder === 'asc') {
						if (!a.voteAverage) return -1
						else if (!b.voteAverage) return 1
                        else return a.voteAverage - b.voteAverage
					} else {
						if (!a.voteAverage) return 1
                        else if (!b.voteAverage) return -1
                        else return b.voteAverage - a.voteAverage
					}
				default:
					if (sortOrder === 'asc') {
						if (!a.score) return -1
						else if (!b.score) return 1
                        else return a.score - b.score
					} else {
						if (!a.score) return 1
                        else if (!b.score) return -1
                        else return b.score - a.score
					}
            }
		})

		console.debug('Sorting by ', field, ' ', sortOrder)
		setProcessedUserFilms(sortedFilms)
	}

	const onChangeSortOrderHandler = (field: string) => {
        if (sortOrder === 'asc') {
			console.debug('Changing sort order to DESC')
			setSortOrder('desc')

			if (sortField !== field) {
                console.debug('Changing sort field to: ', field)
                setSortField(field)
            }
		} 
        else {
			console.debug('Changing sort order to ASC')
			setSortOrder('asc')
			
			if (sortField !== field) {
                console.debug('Changing sort field to: ', field)
                setSortField(field)
            }
		}
    }

	const onFilterHandler = () => {
		let filteredFilms: Film[] = []

		if (filterGenre) {
			console.debug('Filtering by genre')
            const filteredFilmsByGenre = userFilms.filter((film: Film): boolean => {
                if (!film.genres || film.genres.length === 0) return false
                else return film.genres.includes(filterGenreValue)
            })
            filteredFilms.push(...filteredFilmsByGenre)
        }

		if (filterWatched) {
			console.debug('Filtering by watched')
			const filmsToFilter = filterGenre ? filteredFilms : userFilms
            const filteredFilmsByWatched = filmsToFilter.filter((film: Film): boolean => film.watched === filterWatchedValue)
			filteredFilms = filteredFilmsByWatched
        }

		if (filterGenre || filterWatched) {
			setProcessedUserFilms(filteredFilms)
		} else {
			setProcessedUserFilms(userFilms)
		}

		setFilterChanges(filterChanges + 1)
	}

	useEffect(() => {
		onFilterHandler()
	}, [filterGenre, filterGenreValue, filterWatched, filterWatchedValue])

	useEffect(() => {
		onSortHandler(sortField)
    }, [userFilms, titleSearch, sortOrder, filterChanges])

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
                <Switch checked={atropos} onChange={atroposHandler} className="switch checked:bg-violet-700" crossOrigin="anonymous" />
                <p className="flex place-items-center text-sm md:text-base ml-1 md:ml-[-8px]">{t('gallery.3d_effect')}</p>

                <Button onClick={newFilmHandler} size="sm" className="bg-violet-700 hover:bg-violet-600">
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
                <div className="search flex items-center w-30 md:w-34 p-3 md:px-4 text-xs md:text-sm font-bold outline-none hover:bg-indigo-200 bg-indigo-100 rounded-lg md:rounded-xl">
                    <span className="material-symbols-outlined font-bold text-sm md:text-base">search</span>
                    <input
                        id="search"
                        type="text"
                        placeholder={t('common.search')}
                        value={titleSearch}
                        onChange={onTitleSearchHandler}
                        className="placeholder:text-gray-700
						bg-indigo-100 text-dark-gray-900 ml-2 align-middle"
                    />
                </div>
                <Menu>
                    <MenuHandler>
                        <Button className="px-2 md:px-3 capitalize !font-black text-sm md:text-base text-black bg-white hover:bg-slate-100 shadow-none">{t('common.sort')}</Button>
                    </MenuHandler>
                    <MenuList className="p-0 md:p-2 border-2">
                        <List className="outline-none">
                            <ListItem className="text-sm md:text-base">
                                <span onClick={() => onSortHandler('title')} onKeyDown={() => onSortHandler('title')} className="hover:font-extrabold hover:text-red-900">
                                    {t('film.film_title')}
                                </span>
                                <span onClick={() => onChangeSortOrderHandler('title')} onKeyDown={() => onChangeSortOrderHandler('title')} className="material-symbols-outlined hover:font-extrabold hover:text-red-900 text-base ml-4">
                                    swap_vert
                                </span>
                            </ListItem>
                            <ListItem className="text-sm md:text-base">
                                <span onClick={() => onSortHandler('originalTitle')} onKeyDown={() => onSortHandler('originalTitle')} className="hover:font-extrabold hover:text-red-900">
                                    {t('film.film_original_title')}
                                </span>
                                <span onClick={() => onChangeSortOrderHandler('originalTitle')} onKeyDown={() => onChangeSortOrderHandler('originalTitle')} className="material-symbols-outlined hover:font-extrabold hover:text-red-900 text-base ml-4">
                                    swap_vert
                                </span>
                            </ListItem>
                            <ListItem className="text-sm md:text-base">
                                <span onClick={() => onSortHandler('duration')} onKeyDown={() => onSortHandler('duration')} className="hover:font-extrabold hover:text-red-900">
                                    {t('film.film_duration')}
                                </span>
                                <span onClick={() => onChangeSortOrderHandler('duration')} onKeyDown={() => onChangeSortOrderHandler('duration')} className="material-symbols-outlined hover:font-extrabold hover:text-red-900 text-base ml-4">
                                    swap_vert
                                </span>
                            </ListItem>
                            <ListItem className="text-sm md:text-base">
                                <span onClick={() => onSortHandler('releaseYear')} onKeyDown={() => onSortHandler('releaseYear')} className="hover:font-extrabold hover:text-red-900">
                                    {t('film.film_release_year')}
                                </span>
                                <span onClick={() => onChangeSortOrderHandler('releaseYear')} onKeyDown={() => onChangeSortOrderHandler('releaseYear')} className="material-symbols-outlined hover:font-extrabold hover:text-red-900 text-base ml-4">
                                    swap_vert
                                </span>
                            </ListItem>
                            <ListItem className="text-sm md:text-base">
                                <span onClick={() => onSortHandler('voteAverage')} onKeyDown={() => onSortHandler('voteAverage')} className="hover:font-extrabold hover:text-red-900">
                                    {t('film.film_vote_average')}
                                </span>
                                <span onClick={() => onChangeSortOrderHandler('voteAverage')} onKeyDown={() => onChangeSortOrderHandler('voteAverage')} className="material-symbols-outlined hover:font-extrabold hover:text-red-900 text-base ml-4">
                                    swap_vert
                                </span>
                            </ListItem>
                            <ListItem className="text-sm md:text-base">
                                <span onClick={() => onSortHandler('score')} onKeyDown={() => onSortHandler('score')} className="hover:font-extrabold hover:text-red-900">
                                    {t('film.film_score')}
                                </span>
                                <span onClick={() => onChangeSortOrderHandler('score')} onKeyDown={() => onChangeSortOrderHandler('score')} className="material-symbols-outlined hover:font-extrabold hover:text-red-900 text-base ml-4">
                                    swap_vert
                                </span>
                            </ListItem>
                        </List>
                    </MenuList>
                </Menu>

                {/* isRequired doesn't add any functionality, it's only purpose is to solve an error in the Material Tailwind library */}
                <Menu dismiss={{ itemPress: false, isRequired: { isRequired: false } }}>
                    <MenuHandler>
                        <Button className="px-2 md:px-3 capitalize !font-black text-sm md:text-base text-black bg-white hover:bg-slate-100 shadow-none">{t('common.filter')}</Button>
                    </MenuHandler>
                    <MenuList id="filters" className="p-0 md:p-2 border-2 max-h-200">
                        <List className="outline-none">
                            <ListItem>
                                <Switch checked={filterGenre} onChange={() => setFilterGenre(!filterGenre)} className="switch checked:bg-violet-700" crossOrigin="anonymous" />
                                <Menu placement="bottom" open={openFilterGenreMenu} handler={setOpenFilterGenreMenu} allowHover offset={15}>
                                    <MenuHandler className="flex items-center justify-between">
                                        <MenuItem>
                                            {t('film.film_genres')}
                                            <ChevronUpIcon strokeWidth={2.5} className={`h-3.5 w-3.5 transition-transform ${openFilterWatchedMenu ? 'rotate-90' : ''}`} />
                                        </MenuItem>
                                    </MenuHandler>
                                    <MenuList className="max-h-72">
                                        <List className="outline-none">
                                            <ListItem selected={filterGenreValue === 'Acción'} onClick={() => setFilterGenreValue('Acción')}>
                                                {t('gallery.select.genre.action')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Animación'} onClick={() => setFilterGenreValue('Animación')}>
                                                {t('gallery.select.genre.animation')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Aventura'} onClick={() => setFilterGenreValue('Aventura')}>
                                                {t('gallery.select.genre.adventure')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Bélica'} onClick={() => setFilterGenreValue('Bélica')}>
                                                {t('gallery.select.genre.war')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Ciencia ficción'} onClick={() => setFilterGenreValue('Ciencia ficción')}>
                                                {t('gallery.select.genre.science_fiction')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Comedia'} onClick={() => setFilterGenreValue('AventComediaura')}>
                                                {t('gallery.select.genre.comedy')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Crimen'} onClick={() => setFilterGenreValue('Crimen')}>
                                                {t('gallery.select.genre.crime')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Documental'} onClick={() => setFilterGenreValue('Documental')}>
                                                {t('gallery.select.genre.documentary')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Drama'} onClick={() => setFilterGenreValue('Drama')}>
                                                {t('gallery.select.genre.drama')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Familia'} onClick={() => setFilterGenreValue('Familia')}>
                                                {t('gallery.select.genre.family')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Fantasía'} onClick={() => setFilterGenreValue('Fantasía')}>
                                                {t('gallery.select.genre.fantasy')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Historia'} onClick={() => setFilterGenreValue('Historia')}>
                                                {t('gallery.select.genre.history')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Misterio'} onClick={() => setFilterGenreValue('Misterio')}>
                                                {t('gallery.select.genre.mystery')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Música'} onClick={() => setFilterGenreValue('Música')}>
                                                {t('gallery.select.genre.music')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Película de TV'} onClick={() => setFilterGenreValue('Película de TV')}>
                                                {t('gallery.select.genre.tv_movie')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Romance'} onClick={() => setFilterGenreValue('Romance')}>
                                                {t('gallery.select.genre.romance')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Suspense'} onClick={() => setFilterGenreValue('Suspense')}>
                                                {t('gallery.select.genre.thriller')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Terror'} onClick={() => setFilterGenreValue('Terror')}>
                                                {t('gallery.select.genre.horror')}
                                            </ListItem>
                                            <ListItem selected={filterGenreValue === 'Western'} onClick={() => setFilterGenreValue('Western')}>
                                                {t('gallery.select.genre.western')}
                                            </ListItem>
                                        </List>
                                    </MenuList>
                                </Menu>
                            </ListItem>
                            <ListItem>
                                <Switch checked={filterWatched} onChange={() => setFilterWatched(!filterWatched)} className="switch checked:bg-violet-700" crossOrigin="anonymous" />
                                <Menu placement="bottom" open={openFilterWatchedMenu} handler={setOpenFilterWatchedMenu} allowHover offset={15}>
                                    <MenuHandler className="flex items-center justify-between">
                                        <MenuItem>
                                            {t('gallery.select.watched.label')}
                                            <ChevronUpIcon strokeWidth={2.5} className={`h-3.5 w-3.5 transition-transform ${openFilterWatchedMenu ? 'rotate-90' : ''}`} />
                                        </MenuItem>
                                    </MenuHandler>
                                    <MenuList className="max-h-72">
                                        <List className="outline-none">
                                            <ListItem selected={filterWatchedValue === false} onClick={() => setFilterWatchedValue(false)}>
                                                {t('gallery.select.watched.pending')}
                                            </ListItem>
                                            <ListItem selected={filterWatchedValue === true} onClick={() => setFilterWatchedValue(true)}>
                                                {t('gallery.select.watched.watched')}
                                            </ListItem>
                                        </List>
                                    </MenuList>
                                </Menu>
                            </ListItem>
                        </List>
                    </MenuList>
                </Menu>
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
                                        <img src={film.posterPath} className="h-full rounded-md" alt="Poster" />
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
                                    <img src={film.posterPath} className="h-full rounded-md" alt="Poster" />
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

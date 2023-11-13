import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import TheMovieDatabaseApiService from '../services/api/TheMovieDatabaseApiService'
import { Film } from '../models/Film'
import { Button } from '@material-tailwind/react'

const NewFilmForm = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
	const tmd = new TheMovieDatabaseApiService()
	const [ searching, setSearching ] = useState<boolean>(false)
	const [ titleSearch, setTitleSearch] = useState('')
	const [ filmsFound, setFilmsFound ] = useState<Film[]>([])
	const [ selectedFilm, setSelectedFilm ] = useState<Film | null>(null)
	const [ watched, setWatched ] = useState<boolean>(false)

	const searchByTitleHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchInputValue = event.target.value
		searchInputValue ? setSearching(true) : setSearching(false)
		console.debug('Search input value: ', searchInputValue)
		setTitleSearch(searchInputValue)
    }

    const selectFilmHandler = (film: Film) => {
		console.debug('Selected film: ', film)
		document.querySelector('#filmPoster')!.classList.remove('hidden')
		const saveButton = (document.querySelector('#saveFilm') as HTMLInputElement)
		saveButton.disabled = false
		setSearching(false)
		setTitleSearch(film.title)
		setSelectedFilm(film)
	}

	const saveFilm = () => {
		console.debug('ey')
	}

	const closeHandler = () => navigate(-1)

	const toggleWatched = () => setWatched(!watched)

	useEffect( () => {
		const searchResultsDiv = document.querySelector('#searchResults')
		const saveButton = document.querySelector('#saveFilm') as HTMLInputElement

		if (!titleSearch && !saveButton.disabled) saveButton.disabled = true
		else if (titleSearch && saveButton.disabled) saveButton.disabled = false

		if (searching && titleSearch) {
			tmd.searchMovieByTitle(titleSearch)
                .then(films => {
                    if (films.length > 0) {
                        searchResultsDiv?.classList.remove('hidden')
                        searchResultsDiv?.classList.add('flex')
                    } else {
                        searchResultsDiv?.classList.remove('flex')
                        searchResultsDiv?.classList.add('hidden')
                    }
					console.debug('Films found: ', films)
                    setFilmsFound([...films])
                })
                .catch( error => console.debug(error) )           
        } else {
            searchResultsDiv?.classList.remove('flex')
            searchResultsDiv?.classList.add('hidden')
        }
	}, [titleSearch])

    return (
        <div className="bg-white rounded-lg box-border">
            <div className="container flex flex-col mx-auto bg-white rounded-lg place-items-center">
                <div className="flex items-center justify-center w-full">
                    <form className="flex flex-col w-full text-center bg-white">
                        <h3 className="mb-6 mt-2 text-4xl font-extrabold text-gray-900">{t('new_film.title')}</h3>

                        <div className="flex flex-wrap justify-center px-4 md-px-0">
                            <div className="flex flex-wrap w-full md:w-1/2">
                                <label htmlFor="title" className="mb-2 text-sm text-start text-gray-900">
                                    {t('film.film_title')}*
                                </label>
                                <input
                                    id="title"
                                    type="text"
									required
                                    placeholder={t('film.film_title')}
                                    value={titleSearch}
                                    onChange={searchByTitleHandler}
                                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none hover:bg-indigo-200 mb-5 placeholder:text-gray-700 bg-indigo-100 text-dark-gray-900 rounded-2xl"
                                />
                            </div>
                            <div className="flex flex-wrap w-full md:w-1/2 gap-4">
                                <label className="mb-2 text-sm text-start text-gray-900">
                                    {t('film.film_poster')}
                                    <span className="material-symbols-outlined text-sm ml-1">lock</span>
                                </label>
                                <div id="filmPoster" className="mb-2 md:mb-0 hidden">
                                    {selectedFilm?.posterPath ? (
                                        <img src={selectedFilm.posterPath} className="w-20 h-20 object-cover" />
                                    ) : (
                                        <div className="flex flex-wrap place-content-center w-20 h-20 border">
                                            <span className="material-symbols-outlined text-indigo-600 text-2xl">image</span>
                                            <p className="text-sm md:text-md font-bold text-indigo-600">{t('film.image_error')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap w-full md:w-1/2">
                                <label htmlFor="originalTitle" className="mb-2 text-sm text-start text-gray-900">
                                    {t('film.film_original_title')}
                                    <span className="material-symbols-outlined text-sm ml-1">lock</span>
                                </label>
                                <input
                                    id="originalTitle"
                                    type="text"
                                    readOnly
                                    placeholder={t('film.film_original_title')}
                                    value={selectedFilm ? selectedFilm.originalTitle : ''}
                                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none placeholder:text-gray-700 bg-gray-100 text-dark-gray-900 rounded-2xl"
                                />
                            </div>
                            <div className="flex flex-wrap w-full md:w-1/2">
                                <label htmlFor="releaseYear" className="mb-2 text-sm text-start text-gray-900">
                                    {t('film.film_release_year')}
                                    <span className="material-symbols-outlined text-sm ml-1">lock</span>
                                </label>
                                <input
                                    id="releaseYear"
                                    type="text"
                                    readOnly
                                    placeholder={t('film.film_release_year')}
                                    value={selectedFilm ? selectedFilm.releaseYear : ''}
                                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none placeholder:text-gray-700 bg-gray-100 text-dark-gray-900 rounded-2xl"
                                />
                            </div>

                            <div className="flex flex-wrap w-full md:w-1/2">
                                <label htmlFor="score" className="mb-2 text-sm text-start text-gray-900">
                                    {t('film.film_score')}
                                </label>
                                <input
                                    id="score"
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.01"
                                    placeholder={t('film.film_score_placeholder')}
                                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none hover:bg-indigo-200 placeholder:text-gray-700 bg-indigo-100 text-dark-gray-900
										invalid:text-red-800 invalid:bg-red-200 invalid:hover:bg-red-200 invalid:font-bold rounded-2xl"
                                />
                            </div>
                            <div className="flex flex-wrap w-full md:w-1/2">
                                <label htmlFor="voteAverage" className="mb-2 text-sm text-start text-gray-900">
                                    {t('film.film_vote_average')}
                                    <span className="material-symbols-outlined text-sm ml-1">lock</span>
                                </label>
                                <input
                                    id="voteAverage"
                                    type="text"
                                    readOnly
                                    placeholder={t('film.film_vote_average')}
                                    value={selectedFilm ? Math.round(selectedFilm.voteAverage * 100) / 100 : ''}
                                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none placeholder:text-gray-700 bg-gray-100 text-dark-gray-900 rounded-2xl"
                                />
                            </div>

                            <div className="flex flex-wrap w-full md:w-1/2">
                                <label className="text-sm text-gray-900">{t('film.film_watched')}</label>
                                <div className="w-full mt-3 mb-5 py-4 px-5 mr-2 hover:bg-indigo-200 placeholder:text-gray-700 bg-indigo-100 text-dark-gray-900 rounded-2xl">
                                    <label className="flex mr-3 cursor-pointer select-none">
                                        <input type="checkbox" checked={watched} onChange={toggleWatched} className="sr-only peer" />
                                        <div className="w-5 h-5 bg-white border-2 rounded-sm border-gray-500 peer peer-checked:border-0 peer-checked:bg-violet-700">
                                            <img className="" src="check-icon.png" alt="tick" />
                                        </div>
                                        <span className="ml-3 text-sm font-medium text-gray-900">{t('film.film_watched')}</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full md:w-1/2">
                                <label htmlFor="id" className="mb-2 text-sm text-start text-gray-900">
                                    {t('film.film_id')}
                                    <span className="material-symbols-outlined text-sm ml-1">lock</span>
                                </label>
                                <input
                                    id="id"
                                    type="text"
                                    readOnly
                                    placeholder={t('film.film_id')}
                                    value={selectedFilm ? selectedFilm.id : ''}
                                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none placeholder:text-gray-700 bg-gray-100 text-dark-gray-900 rounded-2xl"
                                />
                            </div>
                        </div>

                        <div className="text-sm leading-relaxed my-3 mr-0 md:mr-6 text-gray-900">
                            <Button onClick={closeHandler} size="lg" className="text-xs text-dark-gray-900 font-bold bg-gray-300 hover:bg-gray-200 mr-2">
                                {t('common.cancel')}
                            </Button>

                            <Button disabled id='saveFilm' onClick={saveFilm} size="lg" className="text-xs bg-violet-700 hover:bg-violet-600 ml-1">
                                {t('new_film.save_film')}
                            </Button>
                        </div>

                        <div id="searchResults" className="hidden flex-wrap w-full max-w-fit md:max-w-[99%] h-max absolute z-10 top-[15rem] md:top-[17rem] left-0 bg-white border m-2">
                            <p className="w-full text-center text-xl text-deep-purple-700 font-bold italic mb-5 mt-2">{t('new_film.select_film')}</p>
                            {filmsFound.map((film: Film) => {
                                return (
                                    <div onClick={() => selectFilmHandler(film)} onKeyDown={() => selectFilmHandler(film)} key={film.id} id={film.id.toString()} className="flex place-items-center w-full
										md:w-1/2 gap-2 mb-2 px-2 hover:bg-violet-200">
                                        {film.posterPath ? (
                                            <img src={film.posterPath} className="w-20 h-20 object-cover" />
                                        ) : (
                                            <div className="flex flex-wrap place-content-center w-20 h-20 border">
                                                <span className="material-symbols-outlined text-indigo-600 text-2xl">image</span>
                                                <p className="text-sm md:text-md font-bold text-indigo-600">{t('film.image_error')}</p>
                                            </div>
                                        )}
                                        <div className="w-[70%] text-start">{film.title}</div>
                                        <div>{film.releaseYear}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewFilmForm

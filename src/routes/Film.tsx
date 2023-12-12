import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { useNavigate, useLoaderData } from 'react-router-dom'
import FirebaseFirestoreService from '../services/db/FirebaseFirestoreService';
import TheMovieDatabaseApiService from '../services/api/TheMovieDatabaseApiService'
import { Film as FilmModel, WatchProvider, ProductionCompany, ProductionCountry, CrewMember, Actor } from '../models/Film';
import { Button, Chip, Dialog, DialogBody, DialogFooter } from '@material-tailwind/react'
import Atropos from 'atropos/react';
import Flicking, { ViewportSlot } from '@egjs/react-flicking'
import { Arrow } from '@egjs/flicking-plugins'
import '@egjs/react-flicking/dist/flicking.css'
import '@egjs/flicking-plugins/dist/arrow.css'
import '../styles/Film.css'

const tmd = new TheMovieDatabaseApiService()

// React Router loader that obtains the complete detailed info about the film of the current route
export const loader = async ({ params }: any) => {
    const filmDetails: FilmModel = await tmd.getMovieById(params.filmId)
    return filmDetails
}

// Component that shows the complete information about a film
const Film = () => {
	const { t } = useTranslation()
    const navigate = useNavigate()
	const firestore = new FirebaseFirestoreService()
    const filmDetails = useLoaderData() as FilmModel
	const plugins = [new Arrow()]
	const [ score, setScore ] = useState<number>(0)
	const [ watched, setWatched ] = useState<boolean>(false)
	const [ openDeleteDialog, setOpenDeleteDialog ] = useState<boolean>(false)

	// Obtains the score and watched info abour the current film from the Firestore database
	useEffect( () => {
		const getFilmScoreAndWatched =  async () => {
			const scoreAndWatched = await firestore.getUserFilmScoreAndWatched(filmDetails.id.toString())
			filmDetails.score = scoreAndWatched.score
			filmDetails.watched = scoreAndWatched.watched
            setScore(scoreAndWatched.score)
            setWatched(scoreAndWatched.watched)
            console.log('Film details: ', filmDetails)
		}
		getFilmScoreAndWatched()
	}, [])

	// Only a maximum of 30 actors of each film are shown
	const cast = []
	for (let i=0; i<30; i++) {
		cast.push(filmDetails.cast![i])
		if (i == filmDetails.cast!.length-1) break;
	}

	// Changes the watched state of the film
	const toggleWatched = async () => {
		setWatched(!watched)
		filmDetails.watched = !filmDetails.watched
		await firestore.updateUserFilmWatched(filmDetails)
	}

	// Changes the score given to the film
	const scoreChangeHandler = (e: any) => {
        const scoreInput = document.querySelector('#score') as HTMLInputElement
		setScore(e.target.value)
        if (scoreInput.validity.valid) {
            filmDetails.score = Number(e.target.value)
            firestore.updateUserFilmScore(filmDetails)
        }
    }

    const goBackHandler = () => navigate('/')

	const handleOpenDeleteDialog = () => setOpenDeleteDialog(!openDeleteDialog)

	// Deletes the current film from the current user films list and redirects to the films gallery
	const handleDeleteFilm = async () => {
		await firestore.deleteUserFilm(filmDetails)
		navigate('/')
	}

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-base p-3 md:p-6">
                <div className="col-span-full justify-self-center uppercase text-center text-xl md:text-3xl font-bold">
                    <h1>{filmDetails.title}</h1>
                </div>

                {filmDetails.originalTitle ? (
                    <div className="col-span-full justify-self-center mb-2 md:mb-4">
                        <span className="font-bold italic mr-2">{t('film.film_original_title')}</span>
                        {filmDetails.originalTitle}
                    </div>
                ) : (
                    ''
                )}

                {/* The Atropos library provides a 3D parallax hover effect over the film poster */}
                <div className="row-span-5 grid grid-cols-[1fr_2fr] md:grid-cols-2 justify-items-center">
                    <Atropos rotateTouch={'scroll-y'} className="w-[35vw] md:w-[15vw]">
                        {filmDetails.posterPath ? (
                            <img src={filmDetails.posterPath} alt="Poster" className="rounded-md" />
                        ) : (
                            <div className="flex flex-wrap h-full place-content-center border bg-white">
                                <span className="material-symbols-outlined text-indigo-600 text-8xl">image</span>
                                <p className="text-center text-sm md:text-lg font-bold text-indigo-600">{t('film.image_error')}</p>
                            </div>
                        )}
                    </Atropos>

                    <div className="flex flex-wrap w-full content-around pl-6">
                        <div className="w-full">
                            <span className="material-symbols-outlined align-text-bottom text-xs md:text-sm text-violet-700 mr-1">timer</span>
                            <span className="font-bold italic mr-2">{t('film.film_duration')}</span>
                            {filmDetails.duration ? filmDetails.duration : '??'} {t('film.film_duration_units')}
                        </div>

                        {filmDetails.popularity ? (
                            <div className="w-full">
                                <span className="material-symbols-outlined align-text-bottom text-xs md:text-sm text-violet-700 mr-1">favorite</span>
                                <span className="font-bold italic mr-2">{t('film.film_popularity')}</span>
                                {Math.round(filmDetails.popularity * 100) / 100}
                            </div>
                        ) : (
                            ''
                        )}

                        {filmDetails.releaseYear ? (
                            <div className="w-full">
                                <span className="material-symbols-outlined align-text-bottom text-xs md:text-sm text-violet-700 mr-1">calendar_month</span>
                                <span className="font-bold italic mr-2">{t('film.film_release_year')}</span>
                                {filmDetails.releaseYear}
                            </div>
                        ) : (
                            ''
                        )}

                        {filmDetails.voteAverage ? (
                            <div className="w-full">
                                <span className="material-symbols-outlined align-text-bottom text-xs md:text-sm text-violet-700 mr-1">stars</span>
                                <span className="font-bold italic mr-2">{t('film.film_vote_average')}</span>
                                {Math.round(filmDetails.voteAverage * 100) / 100}
                            </div>
                        ) : (
                            ''
                        )}

                        {/* Shows the watched info of the film while allows to change its value */}
                        <div className="w-full">
                            <span className="material-symbols-outlined align-text-bottom text-xs md:text-sm text-violet-700 mr-1">visibility</span>
                            <span className="font-bold italic mr-2">{t('film.film_watched')}</span>
                            <div className="inline-flex ml-1 md:ml-3 p-2 md:p-3 hover:bg-indigo-200 placeholder:text-gray-700 bg-indigo-100 text-dark-gray-900 rounded-lg md:rounded-xl">
                                <label className="inline-flex cursor-pointer select-none">
                                    <input type="checkbox" checked={watched} onChange={toggleWatched} className="sr-only peer" />
                                    <div className="w-3 md:w-4 h-3 md:h-4 bg-white border-2 rounded-sm border-gray-500 peer peer-checked:border-0 peer-checked:bg-violet-700">
                                        <img src="/check-icon.png" alt="tick" />
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Shows the score info of the film while allows to change its value */}
                        <div className="w-full">
                            <span className="material-symbols-outlined align-text-bottom text-xs md:text-sm text-violet-700 mr-1">star</span>
                            <span className="font-bold italic mr-2">{t('film.film_score')}</span>
                            <input
                                id="score"
                                type="number"
                                min="0"
                                max="10"
                                step="0.01"
                                placeholder={t('film.film_score_placeholder')}
                                value={score}
                                onChange={scoreChangeHandler}
                                className="w-11 md:w-[4.5rem] ml-1 md:ml-3 p-2 md:pl-4 text-xs md:text-sm font-bold outline-none hover:bg-indigo-200 placeholder:text-gray-700 bg-indigo-100 text-dark-gray-900
										invalid:text-red-800 invalid:bg-red-200 invalid:hover:bg-red-200 invalid:font-bold rounded-lg md:rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                <div className="row-span-5 flex flex-wrap gap-4 w-full content-around md:p-2">
                    {filmDetails.revenue ? (
                        <div className="w-full">
                            <span className="font-bold italic mr-2">{t('film.film_revenue')}</span>
                            {new Intl.NumberFormat('es-ES').format(filmDetails.revenue)} $
                        </div>
                    ) : (
                        ''
                    )}

                    {filmDetails.genres?.length! > 0 ? <div className="flex flex-wrap w-full gap-2 italic">{filmDetails.genres?.map(genre => <Chip key={genre} value={genre} size="sm" className="chip h-[3vh]"></Chip>)}</div> : ''}

                    {filmDetails.productionCountries?.length! > 0 ? (
                        <div className="flex w-full">
                            <div className="font-bold italic mr-4">{t('film.film_production_countries')}</div>
                            <div className="flex flex-wrap gap-x-3">
                                {filmDetails.productionCountries?.map((productionCountry: ProductionCountry) => (
                                    <div key={productionCountry.iso3166}>
                                        <span className={'fi fi-' + productionCountry.iso3166.toLowerCase() + ' mr-1'} />
                                        <span>{productionCountry.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}

                    {filmDetails.tagLine ? (
                        <div className="w-full">
                            <span className="font-bold italic mr-2">{t('film.film_tagline')}</span>
                            {filmDetails.tagLine}
                        </div>
                    ) : (
                        ''
                    )}

                    {/* Only directors are shown */}
                    {filmDetails.crew?.length! > 0 ? (
                        <div className="flex w-full">
                            <div className="font-bold italic mr-4">{t('film.film_directors')}</div>
                            <div className="flex flex-wrap gap-3">
                                {filmDetails.crew?.map((crewMember: CrewMember) => {
                                    return crewMember.job == 'Director' ? (
                                        <div key={crewMember.name + '-' + crewMember.job} className="flex flex-col place-items-center">
                                            <span>{crewMember.name}</span>
                                            {crewMember.profilePath ? (
                                                <img src={crewMember.profilePath} alt="Profile photo" className="w-[10vw] md:w-[4vw] rounded-md" />
                                            ) : (
                                                <div className="flex flex-wrap place-content-center border bg-white w-[10vw] md:w-[4vw] h-[15.25vw] md:h-[6.1vw] rounded-md">
                                                    <span className="material-symbols-outlined text-indigo-600">image</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : undefined
                                })}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>

                {filmDetails.productionCompanies?.length! > 0 ? (
                    <div className="flex flex-wrap">
                        <div className="min-w-full font-bold italic mr-2 md:mr-4">{t('film.film_production_companies')}</div>
                        <div className="flex flex-wrap gap-1 md:gap-3 md:text-sm">
                            {filmDetails.productionCompanies?.map((productionCompany: ProductionCompany) => (
                                <div key={productionCompany.name} className="flex flex-col justify-between place-items-center w-[22vw] md:w-[8vw] p-1">
                                    <div className="text-center">{productionCompany.name}</div>
                                    {productionCompany.logoUrl ? <img src={productionCompany.logoUrl} alt="Production company logo" className="block max-h-[10vw] md:max-h-[3vw] my-auto" /> : undefined}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    ''
                )}

                {filmDetails.overview ? <div className="md:text-sm p-2">{filmDetails.overview}</div> : ''}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white bg-violet-800 md:text-base p-3 md:p-6">
                {/* Carousel that shows the profile photo and name of the main 30 actors */}
                {filmDetails.cast?.length! > 0 ? (
                    <div className="flex flex-wrap">
                        <span className="font-bold italic mr-2">{t('film.film_cast')}</span>
                        <Flicking defaultIndex={cast.length - 1} circular={true} circularFallback={'bound'} align={'prev'} plugins={plugins}>
                            {cast.map((actor: Actor) => (
                                <div className="flex flex-col justify-between place-items-center w-[22vw] md:w-[8vw] p-3" key={actor.name}>
                                    <div className="text-center">{actor.name}</div>
                                    {actor.profilePath ? (
                                        <img src={actor.profilePath} alt="Profile photo" className="block w-[10vw] md:w-[4vw] rounded-md" />
                                    ) : (
                                        <div className="flex flex-wrap place-content-center border bg-white w-[10vw] md:w-[4vw] h-[15.25vw] md:h-[6.1vw] rounded-md">
                                            <span className="material-symbols-outlined text-indigo-600">image</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <ViewportSlot>
                                <span className="flicking-arrow-prev"></span>
                                <span className="flicking-arrow-next"></span>
                            </ViewportSlot>
                        </Flicking>
                    </div>
                ) : (
                    ''
                )}

                {filmDetails.watchProviders?.length! > 0 ? (
                    <div className="flex flex-wrap md:pl-16">
                        <div className="min-w-full font-bold italic mb-4 md:mb-0">
                            {t('film.film_watch_providers')}
                            <img src="/justwatch_logo.svg" alt="JustWatch logo" className="inline w-[17vw] md:w-[5vw] ml-4" />
                        </div>

                        <div className="flex flex-wrap gap-3 ml-2 md:ml-4">
                            {filmDetails.watchProviders?.map((watchProvider: WatchProvider) => (
                                <div key={watchProvider.name} className="flex flex-col place-items-center">
                                    <span>{watchProvider.name}</span>
                                    {watchProvider.logoUrl ? <img src={watchProvider.logoUrl} alt="Watch provider logo" className="w-[10vw] md:w-[4vw] mt-2" /> : undefined}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>

            <div className="flex justify-center gap-4 my-2 md:my-4 ">
                {/* Delete film functionality with a dialog to confirm the action */}
                <Button id="delete" onClick={handleOpenDeleteDialog} size="sm" className="text-xs bg-red-700 hover:bg-red-600 ml-1">
                    {t('common.delete_film')}
                </Button>
                <Dialog open={openDeleteDialog} handler={handleOpenDeleteDialog}>
                    <DialogBody className="text-center font-extrabold mt-3">
                        <span className="material-symbols-outlined text-4xl mb-2">error</span>
                        <p>{t('delete_film.dialog_body')}</p>
                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={handleOpenDeleteDialog} className="text-xs text-white bg-red-700 hover:bg-red-600 mr-3">
                            <span>{t('common.cancel')}</span>
                        </Button>
                        <Button onClick={handleDeleteFilm} className="text-xs bg-green-700 hover:bg-green-600 ">
                            <span>{t('common.delete_film')}</span>
                        </Button>
                    </DialogFooter>
                </Dialog>

                <Button id="goBack" onClick={goBackHandler} size="sm" className="text-xs bg-violet-700 hover:bg-violet-600 ml-1">
                    {t('common.come_back')}
                </Button>
            </div>
        </>
    )
}

export default Film

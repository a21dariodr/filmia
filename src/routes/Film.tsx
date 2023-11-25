import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { useNavigate, useLoaderData } from 'react-router-dom'
import FirebaseFirestoreService from '../services/db/FirebaseFirestoreService';
import TheMovieDatabaseApiService from '../services/api/TheMovieDatabaseApiService'
import { Film as FilmModel, WatchProvider, ProductionCompany, ProductionCountry, CrewMember, Actor } from '../models/Film';
import { Button, Chip } from '@material-tailwind/react'
import Atropos from 'atropos/react';
import Flicking from '@egjs/react-flicking'
import '@egjs/react-flicking/dist/flicking.css'


const tmd = new TheMovieDatabaseApiService()

export const loader = async ({ params }: any) => {
    const filmDetails: FilmModel = await tmd.getMovieById(params.filmId)
    return filmDetails
}

const Film = () => {
	const { t } = useTranslation()
    const navigate = useNavigate()
	const firestore = new FirebaseFirestoreService()
    const filmDetails = useLoaderData() as FilmModel
	const [score, setScore] = useState<number>()
	const [watched, setWatched] = useState<boolean>()

	useEffect( () => {
		const getFilmScoreAndWatched =  async () => {
			const scoreAndWatched = await firestore.getUserFilmScoreAndWatched(filmDetails.id.toString())
            setScore(scoreAndWatched.score)
            setWatched(scoreAndWatched.watched)
            console.debug('Film details: ', filmDetails)
		}
		getFilmScoreAndWatched()
	}, [score, watched])

	// Se guardan como máximo 20 actores del elenco de cada película
	const cast = []
	for (let i=0; i<20; i++) {
		cast.push(filmDetails.cast![i])
		if (i == filmDetails.cast!.length-1) break;
	}

    const goBackHandler = () => navigate('/')

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 md:p-6">
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

            <div className="row-span-4 grid grid-cols-[1fr_2fr] md:grid-cols-2 justify-items-center">
                <Atropos rotateTouch={'scroll-y'} className="w-[35vw] md:w-[15vw]">
                    {filmDetails.posterPath ? (
                        <img src={filmDetails.posterPath} alt="Poster" className="rounded-md" />
                    ) : (
                        <div className="flex flex-wrap h-full place-content-center border bg-white">
                            <span className="material-symbols-outlined text-indigo-600 text-8xl">image</span>
                            <p className="text-sm md:text-lg font-bold text-indigo-600">{t('film.image_error')}</p>
                        </div>
                    )}
                </Atropos>

                <div className="flex flex-wrap w-full content-around pl-2">
                    <div className="w-full">
                        <span className="font-bold italic mr-2">{t('film.film_duration')}</span>
                        {filmDetails.duration ? filmDetails.duration : '??'} {t('film.film_duration_units')}
                    </div>

                    {filmDetails.popularity ? (
                        <div className="w-full">
                            <span className="font-bold italic mr-2">{t('film.film_popularity')}</span>
                            {Math.round(filmDetails.popularity * 100) / 100}
                        </div>
                    ) : (
                        ''
                    )}

                    {filmDetails.releaseYear ? (
                        <div className="w-full">
                            <span className="font-bold italic mr-2">{t('film.film_release_year')}</span>
                            {filmDetails.releaseYear}
                        </div>
                    ) : (
                        ''
                    )}

                    {filmDetails.voteAverage ? (
                        <div className="w-full">
                            <span className="font-bold italic mr-2">{t('film.film_vote_average')}</span>
                            {Math.round(filmDetails.voteAverage * 100) / 100}
                        </div>
                    ) : (
                        ''
                    )}

                    <div className="w-full">
                        <span className="font-bold italic mr-2">{t('film.film_watched')}</span>
                        {/* TODO cambiar por checkbox para cambiar valor a tiempo real */}
                        {watched ? 'Vista' : 'Pendente'}
                    </div>

                    <div className="w-full">
                        <span className="font-bold italic mr-2">{t('film.film_score')}</span>
                        {score}
                    </div>
                </div>
            </div>

            {filmDetails.revenue ? (
                <div>
                    <span className="font-bold italic mr-2">{t('film.film_revenue')}</span>
                    {new Intl.NumberFormat('es-ES').format(filmDetails.revenue)} $
                </div>
            ) : (
                ''
            )}

            {filmDetails.genres?.length! > 0 ? <div className="flex flex-wrap gap-2 italic">{filmDetails.genres?.map(genre => <Chip key={genre} value={genre} size="sm" className="h-[3vh]"></Chip>)}</div> : ''}

            {filmDetails.productionCountries?.length! > 0 ? (
                <div className="flex">
                    <div className="font-bold italic mr-4">{t('film.film_production_countries')}</div>
                    <div className="flex flex-wrap gap-x-3">
                        {filmDetails.productionCountries?.map((productionCountry: ProductionCountry) => (
                            <div key={productionCountry.iso3166}>
                                <span className={'fi fis fi-' + productionCountry.iso3166.toLowerCase() + ' mr-1'} />
                                <span>{productionCountry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                ''
            )}

            {/* Únicamente se mostrarán los directores */}
            {filmDetails.crew?.length! > 0 ? (
                <div className="flex">
                    <div className="font-bold italic mr-2">{t('film.film_directors')}</div>
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

            {filmDetails.overview ? <div className="border border-violet-300 bg-violet-100 rounded-lg p-2">{filmDetails.overview}</div> : ''}

            {filmDetails.watchProviders?.length! > 0 ? (
                <div className="flex flex-wrap">
                    <span className="font-bold italic mr-2">{t('film.film_watch_providers')}</span>
                    {filmDetails.watchProviders?.map((watchProvider: WatchProvider) => (
                        <div key={watchProvider.name}>
                            <span>{watchProvider.name}</span>
                            {watchProvider.logoUrl ? <img src={watchProvider.logoUrl} alt="Watch provider logo" className="w-[10vw] md:w-[4vw]" /> : undefined}
                        </div>
                    ))}
                </div>
            ) : (
                ''
            )}

            {filmDetails.tagLine ? (
                <div>
                    <span className="font-bold italic mr-2">{t('film.film_tagline')}</span>
                    {filmDetails.tagLine}
                </div>
            ) : (
                ''
            )}

            {filmDetails.productionCompanies?.length! > 0 ? (
                <div className="flex flex-wrap">
                    <span className="font-bold italic mr-2">{t('film.film_production_companies')}</span>
                    {filmDetails.productionCompanies?.map((productionCompany: ProductionCompany) => (
                        <div key={productionCompany.name}>
                            <span>{productionCompany.name}</span>
                            <span>{productionCompany.originCountry}</span>
                            {productionCompany.logoUrl ? <img src={productionCompany.logoUrl} alt="Production company logo" className="w-[10vw] md:w-[4vw]" /> : undefined}
                        </div>
                    ))}
                </div>
            ) : (
                ''
            )}

            {filmDetails.cast?.length! > 0 ? (
                <div className="flex flex-wrap">
                    <span className="font-bold italic mr-2">{t('film.film_cast')}</span>
                    <Flicking circular={true}>
                        {cast.map((actor: Actor) => (
                            <div className="flicking-panel flex flex-col place-items-center" key={actor.name}>
                                <span>{actor.name}</span>
                                {actor.profilePath ? (
                                    <img src={actor.profilePath} alt="Profile photo" className="w-[10vw] md:w-[4vw] rounded-md" />
                                ) : (
                                    <div className="flex flex-wrap place-content-center border bg-white w-[10vw] md:w-[4vw] h-[15.25vw] md:h-[6.1vw] rounded-md">
                                        <span className="material-symbols-outlined text-indigo-600">image</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </Flicking>
                </div>
            ) : (
                ''
            )}

            <div className="col-span-full justify-self-center mt-5">
                <Button id="goBack" onClick={goBackHandler} size="lg" className="text-xs bg-violet-700 hover:bg-violet-600 ml-1">
                    {t('common.come_back')}
                </Button>
            </div>
        </div>
    )
}

export default Film

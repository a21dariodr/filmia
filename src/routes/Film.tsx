import { useTranslation } from 'react-i18next'
import { useNavigate, useLoaderData } from 'react-router-dom'
import TheMovieDatabaseApiService from '../services/api/TheMovieDatabaseApiService'
import { Film as FilmModel, WatchProvider, ProductionCompany, ProductionCountry, CrewMember, Actor } from '../models/Film';
import { Button, Chip } from '@material-tailwind/react'
import Atropos from 'atropos/react';
import Flicking from '@egjs/react-flicking'
import '@egjs/react-flicking/dist/flicking.css'

const tmd = new TheMovieDatabaseApiService()

export const loader = async ({ params }: any) => {
    const filmDetails: FilmModel = await tmd.getMovieById(params.filmId)
	console.debug('Film details: ', filmDetails)
    return filmDetails
}

const Film = () => {
	const { t } = useTranslation()
    const navigate = useNavigate()
    const filmDetails = useLoaderData() as FilmModel

	// Se guardan como máximo 20 actores del elenco de cada película
	const cast = []
	for (let i=0; i<20; i++) {
		cast.push(filmDetails.cast![i])
		if (i == filmDetails.cast!.length-1) break;
	}

    const goBackHandler = () => navigate('/')

    return (
        <div className="grid grid-cols-1 grid-flow-row-dense md:grid-cols-2 gap-2 p-3 md:p-6">
            <div className="col-span-full justify-self-center uppercase text-center text-xl md:text-3xl font-bold">
                <h1>{filmDetails.title}</h1>
            </div>

            <div className="col-span-full justify-self-center mb-2 md:mb-4">
                <span className="font-bold italic mr-2">{t('film.film_original_title')}</span>
                {filmDetails.originalTitle}
            </div>

            <div className="row-span-4 grid grid-cols-2 justify-items-center">
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

                <div className="flex flex-wrap w-full">
                    <div className="w-full">
                        <span className="font-bold italic mr-2">{t('film.film_duration')}</span>
                        {filmDetails.duration} {t('film.film_duration_units')}
                    </div>

                    <div className="w-full">
                        <span className="font-bold italic mr-2">{t('film.film_popularity')}</span>
                        {filmDetails.popularity}
                    </div>

                    <div className="w-full">
                        <span className="font-bold italic mr-2">{t('film.film_release_year')}</span>
                        {filmDetails.releaseYear}
                    </div>

                    <div className="w-full">
                        <span className="font-bold italic mr-2">{t('film.film_vote_average')}</span>
                        {filmDetails.voteAverage}
                    </div>

                    <div className="w-full">
                        <span className="font-bold italic mr-2">{t('film.film_watched')}</span>
                        {filmDetails.watched}
                    </div>

                    <div className="w-full">
                        <span className="font-bold italic mr-2">{t('film.film_score')}</span>
                        {filmDetails.score}
                    </div>
                </div>
            </div>

            <div>{filmDetails.overview}</div>

            <div className="flex flex-wrap">
                <span className="font-bold italic mr-2">{t('film.film_watch_providers')}</span>
                {filmDetails.watchProviders?.map((watchProvider: WatchProvider) => (
                    <div key={watchProvider.name}>
                        <span>{watchProvider.name}</span>
                        {watchProvider.logoUrl ? <img src={watchProvider.logoUrl} alt="Watch provider logo" className="w-[10vw] md:w-[4vw]" /> : undefined}
                    </div>
                ))}
            </div>

            <div>
                <span className="font-bold italic mr-2">{t('film.film_original_language')}</span>
                {filmDetails.originalLanguage}
            </div>

            <div className="flex flex-wrap gap-2 italic">{filmDetails.genres?.map(genre => <Chip key={genre} value={genre}></Chip>)}</div>

            <div>
                <span className="font-bold italic mr-2">{t('film.film_revenue')}</span>
                {filmDetails.revenue}
            </div>

            {filmDetails.tagLine ? (
                <div>
                    <span className="font-bold italic mr-2">{t('film.film_tagline')}</span>
                    {filmDetails.tagLine}
                </div>
            ) : (
                ''
            )}

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

            <div className="flex flex-wrap">
                <span className="font-bold italic mr-2">{t('film.film_production_countries')}</span>
                {filmDetails.productionCountries?.map((productionCountry: ProductionCountry) => (
                    <div key={productionCountry.iso3166}>
                        <span>{productionCountry.name}</span>
                        <span>{productionCountry.iso3166}</span>
                    </div>
                ))}
            </div>

            {/* Únicamente se mostrarán los directores */}
            <div className="flex flex-wrap">
                <span className="font-bold italic mr-2">{t('film.film_directors')}</span>
                {filmDetails.crew?.map((crewMember: CrewMember) => {
                    return crewMember.job == 'Director' ? (
                        <div key={crewMember.name + '-' + crewMember.job}>
                            <span>{crewMember.name}</span>
                            {crewMember.profilePath ? <img src={crewMember.profilePath} alt="Profile photo" className="w-[10vw] md:w-[4vw] rounded-md" /> : undefined}
                        </div>
                    ) : undefined
                })}
            </div>

            <div className="flex flex-wrap">
                <span className="font-bold italic mr-2">{t('film.film_cast')}</span>
                <Flicking circular={true}>
                    {cast.map((actor: Actor) => (
                        <div className="flicking-panel" key={actor.name}>
                            <span>{actor.name}</span>
                            {actor.profilePath ? (
                                <img src={actor.profilePath} alt="Profile photo" className="w-[10vw] md:w-[4vw] rounded-md" />
                            ) : (
                                <div className="flex flex-wrap h-full place-content-center border bg-white w-[10vw] md:w-[4vw] rounded-md">
                                    <span className="material-symbols-outlined text-indigo-600">image</span>
                                </div>
                            )}
                        </div>
                    ))}
                </Flicking>
            </div>

            <div className="col-span-full  justify-self-center">
                <Button id="goBack" onClick={goBackHandler} size="lg" className="text-xs bg-violet-700 hover:bg-violet-600 ml-1">
                    {t('common.come_back')}
                </Button>
            </div>
        </div>
    )
}

export default Film

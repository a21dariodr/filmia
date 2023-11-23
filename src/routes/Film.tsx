import { useTranslation } from 'react-i18next'
import { useNavigate, useLoaderData } from 'react-router-dom'
import TheMovieDatabaseApiService from '../services/api/TheMovieDatabaseApiService'
import { Film as FilmModel, WatchProvider, ProductionCompany, ProductionCountry, CrewMember, Actor } from '../models/Film';
import { Button } from '@material-tailwind/react'
import Atropos from 'atropos/react';

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
		if (i == cast.length-1) break;
	}

    const goBackHandler = () => navigate('/')

    return (
        <div className="grid p-3">
            {filmDetails.duration}
            {filmDetails.genres}
            {filmDetails.id}
            {filmDetails.originalLanguage}
            {filmDetails.originalTitle}
            {filmDetails.overview}
            {filmDetails.popularity}

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

            {filmDetails.releaseYear}
            {filmDetails.revenue}
            {filmDetails.score}
            {filmDetails.tagLine}
            {filmDetails.title}
            {filmDetails.voteAverage}
            {filmDetails.watched}

            {filmDetails.watchProviders?.map((watchProvider: WatchProvider) => (
                <div key={watchProvider.name}>
                    <span>{watchProvider.name}</span>
                    {watchProvider.logoUrl ? <img src={watchProvider.logoUrl} alt="Watch provider logo" className="w-[10vw] md:w-[4vw]" /> : undefined}
                </div>
            ))}

            {filmDetails.productionCompanies?.map((productionCompany: ProductionCompany) => (
                <div key={productionCompany.name}>
                    <span>{productionCompany.name}</span>
                    <span>{productionCompany.originCountry}</span>
                    {productionCompany.logoUrl ? <img src={productionCompany.logoUrl} alt="Production company logo" className="w-[10vw] md:w-[4vw]" /> : undefined}
                </div>
            ))}
            {filmDetails.productionCountries?.map((productionCountry: ProductionCountry) => (
                <div key={productionCountry.iso3166}>
                    <span>{productionCountry.name}</span>
                    <span>{productionCountry.iso3166}</span>
                </div>
            ))}

            {/* Únicamente se mostrarán los directores y productores */}
            {filmDetails.crew?.map((crewMember: CrewMember) => {
                const jobsToFilter = ['Director', 'Producer']

                return jobsToFilter.includes(crewMember.job) ? (
                    <div key={crewMember.name + '-' + crewMember.job}>
                        <span>{crewMember.name}</span>
                        <span>{crewMember.job}</span>
                        {crewMember.profilePath ? <img src={crewMember.profilePath} alt="Profile photo" className="w-[10vw] md:w-[4vw]" /> : undefined}
                    </div>
                ) : undefined
            })}

            {cast.map((actor: Actor) => (
                <div key={actor.name}>
                    <span>{actor.name}</span>
                    {actor.profilePath ? <img src={actor.profilePath} alt="Profile photo" className="w-[10vw] md:w-[4vw]" /> : undefined}
                </div>
            ))}

            <div>
                <Button id="goBack" onClick={goBackHandler} size="lg" className="text-xs bg-violet-700 hover:bg-violet-600 ml-1">
                    {t('common.come_back')}
                </Button>
            </div>
        </div>
    )
}

export default Film

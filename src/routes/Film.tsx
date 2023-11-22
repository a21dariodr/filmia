import { useTranslation } from 'react-i18next'
import { useNavigate, useLoaderData } from 'react-router-dom'
import TheMovieDatabaseApiService from '../services/api/TheMovieDatabaseApiService'
import { Film as FilmModel } from '../models/Film'
import { Button } from '@material-tailwind/react'

const tmd = new TheMovieDatabaseApiService()

export const loader = async ({ params }: any) => {
    const filmDetails: FilmModel = await tmd.getMovieById(params.filmId)
    return filmDetails
}

const Film = () => {
	const { t } = useTranslation()
    const navigate = useNavigate()
    const filmDetails = useLoaderData() as FilmModel

    const goBackHandler = () => navigate('/')

    return (
        <div className=''>
            {filmDetails.id} {filmDetails.genres}
            <Button id="goBack" onClick={goBackHandler} size="lg" className="text-xs bg-violet-700 hover:bg-violet-600 ml-1">
                {t('common.come_back')}
            </Button>
        </div>
    )
}

export default Film

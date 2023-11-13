import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import FirebaseFirestoreService from '../services/db/FirebaseFirestoreService'
import { Button } from '@material-tailwind/react'

const Gallery = () => {
    const { t } = useTranslation()
	const navigate = useNavigate()
	const firestore = new FirebaseFirestoreService()

	const newFilmHandler = () => navigate('/newFilm')

	useEffect( () => {
		const films = firestore.getUserFilms()

		console.log(films)
		
	})

    return (
        <>
            <h2>
                {t('deploy_test')}
            </h2>

            <Button onClick={newFilmHandler} size="md" className="text-xs bg-violet-700 hover:bg-violet-600">
                {t('common.add_film')}
            </Button>
        </>
    )
}

export default Gallery

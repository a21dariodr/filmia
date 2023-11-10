import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

const Gallery = () => {
    const { t } = useTranslation()
	const navigate = useNavigate()

	const newFilmHandler = () => navigate('/newFilm')

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

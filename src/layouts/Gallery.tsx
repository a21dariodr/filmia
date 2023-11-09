import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

const Gallery = () => {
    const { t } = useTranslation()
	const navigate = useNavigate()

	const newFilmHandler = () => {
		navigate('/newFilm')
	}

    return (
        <>
            <h1>Filmia</h1>
            <h2>
                {t('deploy_test')} {t('common.with_pipeline')}
            </h2>
            <span className="material-symbols-outlined text-red-800">error</span>
            <Button onClick={newFilmHandler} size="sm" className="text-xs bg-violet-700 hover:bg-violet-600">
                {t('common.add_film')}
            </Button>
        </>
    )
}

export default Gallery

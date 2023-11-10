import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

const NewFilmForm = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const closeHandler = () => navigate(-1)

    // TODO
    const saveFilm = () => 'ey'

    return (
        <div className="bg-white rounded-lg">
            <div className="container flex flex-col mx-auto bg-white rounded-lg place-items-center">
                <div className="flex items-center justify-center w-full">
                    <form className="flex flex-col w-full text-center bg-white">
                        <h3 className="mb-6 mt-2 text-4xl font-extrabold text-gray-900">{t('new_film.title')}</h3>

                        <div className="flex flex-wrap justify-center px-4 md-px-0">
                            <div className="flex flex-wrap w-full md:w-1/2">
                                <label htmlFor="title" className="mb-2 text-sm text-start text-gray-900">
                                    {t('new_film.film_title')}*
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder={t('new_film.film_title')}
                                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-5 placeholder:text-gray-700 bg-gray-100 text-dark-gray-900 rounded-2xl"
                                />
                            </div>
                            <div className="flex flex-wrap w-full md:w-1/2">
                                <label htmlFor="originalTitle" className="mb-2 text-sm text-start text-gray-900">
                                    {t('new_film.film_original_title')}*
                                </label>
                                <input
                                    id="originalTitle"
                                    type="text"
                                    placeholder={t('new_film.film_original_title')}
                                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-700 bg-gray-100 text-dark-gray-900 rounded-2xl"
                                />
                            </div>
                        </div>

                        <div className="text-sm leading-relaxed my-3 text-gray-900">
                            <Button onClick={closeHandler} size="lg" className="text-xs text-dark-gray-900 font-bold bg-gray-300 hover:bg-gray-200 mr-2">
                                {t('common.come_back')}
                            </Button>

                            <Button onClick={saveFilm} size="lg" className="text-xs bg-violet-700 hover:bg-violet-600 ml-1">
                                {t('new_film.save_film')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewFilmForm

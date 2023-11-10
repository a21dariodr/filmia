import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

const NewFilmForm = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const closeHandler = () => navigate(-1)

    return (
        <>
            Nueva película!
            <Button onClick={closeHandler} size="sm" className="text-xs bg-violet-700 hover:bg-violet-600">
                {t('common.come_back')}
            </Button>
        </>
    )
}

export default NewFilmForm

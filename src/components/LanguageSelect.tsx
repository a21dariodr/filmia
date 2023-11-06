import { Select, Option } from '@material-tailwind/react'
import { useTranslation } from 'react-i18next'

const LanguageSelect = () => {
	const { t } = useTranslation()

	return (
        <div>
            <Select label={t('languages.select')}>
                <Option value="spanish">{t('languages.spanish')}</Option>
                <Option value="galician">{t('languages.galician')}</Option>
                <Option value="english">{t('languages.english')}</Option>
            </Select>
        </div>
    )
}

export default LanguageSelect

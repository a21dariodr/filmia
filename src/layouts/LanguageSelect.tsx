import { useState, cloneElement } from 'react'
import { Select, Option } from '@material-tailwind/react'
import { useTranslation } from 'react-i18next'
import '../styles/LanguageSelect.css'

/* Language selector component that provides internationalization functionality through i18next
 * Includes support for english, spanish and galician languages
 */
const LanguageSelect = () => {
    const { t, i18n } = useTranslation()
	const [ selectedLanguage, setSelectedLanguage ] = useState<string>(i18n.resolvedLanguage ? i18n.resolvedLanguage : 'es')

	const languageChangeHandler = (e: any) => {
		i18n.changeLanguage(e)
		setSelectedLanguage(e)
	}

    return (
        <div id='languageSelect'>
            <Select
				className='bg-white'
				color='deep-purple'
                size="lg"
                selected={element =>
                    element &&
                    cloneElement(element, {
                        disabled: true,
                        className: 'flex items-center opacity-100 px-0 gap-2 pointer-events-none'
                    })
                }
                value={selectedLanguage}
                onChange={languageChangeHandler}>
                <Option className="flex items-center gap-2" value={'es'}>
                    <img className="h-5 w-5 rounded-full object-cover" src="/flags/es.svg" alt="Español" />
                    {t('languages.spanish')}
                </Option>
                <Option className="flex items-center gap-2" value={'gl'}>
                    <img className="h-5 w-5 rounded-full object-cover" src="/flags/es-ga.svg" alt="Español" />
                    {t('languages.galician')}
                </Option>
                <Option className="flex items-center gap-2" value={'en'}>
                    <img className="h-5 w-5 rounded-full object-cover" src="/flags/gb.svg" alt="Español" />
                    {t('languages.english')}
                </Option>
            </Select>
        </div>
    )
}

export default LanguageSelect

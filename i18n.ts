import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// Internacionalización con i18next utilizando detección del idioma del navegador
i18n.use(Backend)
	.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false // No necesario en react que escapa por defecto
        }
    })

export default i18n

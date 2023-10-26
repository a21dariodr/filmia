import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Internacionalización con i18next utilizando detección del idioma del navegador
i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false // No necesario en react que escapa por defecto
        },
        resources: {
            en: {
                translation: {
                    deploy_test: 'Automatic deploy test with pipeline'
                }
            },
            es: {
                translation: {
                    deploy_test: 'Prueba de despliegue automático con pipeline'
                }
            },
            gl: {
                translation: {
                    deploy_test: 'Proba de despregamento automático con pipeline'
                }
            }
        }
    })

export default i18n

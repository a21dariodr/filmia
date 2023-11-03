import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "../styles/Home.css"
import { Button } from "@material-tailwind/react"
// import { onAuthStateChanged } from "firebase/auth"

type Langtype = {
    [key: string]: { nativeName: string }
}

const langs: Langtype = {
    en: { nativeName: "English" },
    es: { nativeName: "Español" },
    gl: { nativeName: "Galego" }
}

const Home = () => {
    const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const [ userEmail, setUserEmail ] = useState<string | null>()

	useEffect(() => {
		if (localStorage.getItem('userEmail')) {
            if (!userEmail) setUserEmail(localStorage.getItem('userEmail'))
        } else {
            navigate('/login')
        }
	})

    return (
        <>
            <h1>Filmia</h1>
            {Object.keys(langs).map(lang => (
                <span key={lang}>
                    <Button onClick={() => i18n.changeLanguage(lang)} style={{ fontWeight: i18n.resolvedLanguage === lang ? 'bold' : 'normal' }}>
                        {langs[lang].nativeName}
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                </span>
            ))}
            <h2>
                {t('deploy_test')} {t('common.with_pipeline')}
            </h2>
            <span className="material-symbols-outlined text-red-800">error</span>
        </>
    )
}

export default Home

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import firebase from "../util/firebase/firebase"
import { onAuthStateChanged } from 'firebase/auth'
import { useSelector, useDispatch } from "react-redux"
import { getEmail, setEmail, setId, getId } from "../state-slices/userSlice"
import "../styles/Home.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@material-tailwind/react"


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
	const dispatch = useDispatch()
	const userEmail = useSelector(getEmail)
	const userId = useSelector(getId)

	useEffect(() => {
		onAuthStateChanged(firebase.auth, (user) => {
			if (user) {
                if (!userEmail) {
					dispatch(setEmail(user.email!))
					dispatch(setId(user.uid))
				}
				console.log('User Firebase', user)
				console.log('User email: ', userEmail)
				console.log('User id: ', userId)			
            } else {
                navigate('/login')
            }
		})
	})

    return (
        <div className="w-full">
			<Header />
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
			<Footer />
        </div>
    )
}

export default Home

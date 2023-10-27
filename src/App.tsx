import firebase from "./util/firebase/firebase"
import FirebaseAuthService from "./services/auth/FirebaseAuthService"
import { onAuthStateChanged } from "firebase/auth"
import { useTranslation } from "react-i18next"
import "./App.css"
import { Button } from "@material-tailwind/react"

type Langtype = {
    [key: string]: { nativeName: string }
}

const langs: Langtype = {
    en: { nativeName: "English" },
    es: { nativeName: "Español" },
    gl: { nativeName: "Galego" }
}

const App = () => {
    const { t, i18n } = useTranslation()
    const tmdApiKey = import.meta.env.VITE_TMD_ACCESS_TOKEN
    const firebaseAuth = new FirebaseAuthService()

    if (firebase && firebaseAuth && tmdApiKey) console.log("App iniciada")

    // Vincula un observador al objeto de autenticación global
    onAuthStateChanged(firebase.auth, user => {
        if (user) {
            const uid = user.uid
            console.log(uid)
        }
    })

    return (
        <>
            <h1>Filmia</h1>
			{Object.keys(langs).map(lang => (
				<span key={lang}>
					<Button onClick={() => i18n.changeLanguage(lang)} style={{ fontWeight: i18n.resolvedLanguage === lang ? "bold" : "normal" }}>
						{langs[lang].nativeName}
					</Button>
					&nbsp;&nbsp;&nbsp;
				</span>
			))}
			<h2>{t("deploy_test")} {t("common.with_pipeline")}</h2>
        </>
    )
}

export default App

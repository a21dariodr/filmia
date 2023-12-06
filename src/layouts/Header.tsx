import { Button, Navbar } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import FirebaseAuthService from "../services/auth/FirebaseAuthService"
import { useTranslation } from 'react-i18next'
import LanguageSelect from "./LanguageSelect"

// Header component that includes a logo that redirects to the root route, a language selector and a close session button
const Header = () => {
	const { t } = useTranslation()
	const authService = new FirebaseAuthService()

	const closeSession = () =>  {
		authService.logOut()
	}

	return (
        <div className="w-100 bg-violet-800">
            <Navbar id="navbar" className="sticky top-0 z-10 max-w-full rounded-none p-2 lg:p-4 mb-2 lg:mb-4 bg-violet-800 border-0">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link to={'/'} className="flex items-center gap-2 md:gap-4 cursor-pointer font-bold">
                        <img src="/logo/logo-white.svg" className="w-[80%] md:w-[15%] ml-1 md:ml-4" alt="Filmia logo" />
                    </Link>
                    <div className="flex items-center md:items-stretch gap-5">
                        <LanguageSelect />
                        <Button onClick={closeSession} size="sm" className="text-xs text-black font-extrabold bg-white hover:bg-slate-200">
                            {t('login.log_out_1_upper')}&nbsp;
                            <br className="inline md:hidden" />
                            {t('login.log_out_2_upper')}
                        </Button>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}

export default Header

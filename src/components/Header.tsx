import { Button, Navbar } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import FirebaseAuthService from "../services/auth/FirebaseAuthService"
import { useTranslation } from 'react-i18next'
import LanguageSelect from "./LanguageSelect"

const Header = () => {
	const { t } = useTranslation()
	const authService = new FirebaseAuthService()

	const closeSession = () =>  {
		authService.logOut()
	}

	return (
        <div className="w-100">
            <Navbar className="sticky top-0 z-10 max-w-full rounded-none p-2 lg:p-4 mb-2 lg:mb-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link to={'/'} className="flex items-center gap-2 md:gap-4 cursor-pointer font-bold">
                        <img src="movie_clapperboard.svg" className="w-[25%] md:w-[12%]" alt="Filmia logo" />
                        <span className="text-xl md:text-3xl">FILMIA</span>
                    </Link>
                    <div className="flex items-center md:items-stretch gap-5">
                        <LanguageSelect />
                        <Button onClick={closeSession} size="sm" className="text-xs bg-violet-700 hover:bg-violet-600">
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

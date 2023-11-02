import { useState } from "react"
import FirebaseAuthService from "../services/auth/FirebaseAuthService"
import { useTranslation } from "react-i18next"
import '../styles/Login.css'

const Login = () => {
	const { t } = useTranslation()
	const firebaseAuth = new FirebaseAuthService()
	const [ keepLogin, setKeepLogin ] = useState<boolean>(true) 

	const toggleKeepLogin = () => setKeepLogin(!keepLogin)

	const signUpGoogle = () => firebaseAuth.signInGoogle()

    return (
        <>
            <div className="bg-white rounded-lg h-full">
                <div className="container flex flex-col mx-auto bg-white rounded-lg h-full place-items-center">
                    <div className="flex w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                        <div className="flex items-center justify-center w-full lg:p-12">
                            <div className="flex xl:p-10">
                                <form className="flex flex-col w-full h-full text-center bg-white">
                                    <h3 className="mb-14 text-4xl font-extrabold text-gray-900">{t('login.title')}</h3>
                                    <div onClick={signUpGoogle} className="login-google flex items-center justify-center w-full py-4 mb-6 text font-medium rounded-2xl text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300">
                                        <img className="h-5 mr-2" src="google-logo.png" alt="" />
                                        {t('login.google')}
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <hr className="h-0 border-b border-solid border-gray-500 grow" />
                                        <p className="mx-4 text-gray-600">{t('login.or')}</p>
                                        <hr className="h-0 border-b border-solid border-gray-500 grow" />
                                    </div>
                                    <label htmlFor="email" className="mb-2 text-sm text-start text-gray-900">
                                        {t('login.email')}*
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder={t('login.email_placeholder')}
                                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-gray-700 bg-gray-100 text-dark-gray-900 rounded-2xl"
                                    />
                                    <label htmlFor="password" className="mb-2 text-sm text-start text-gray-900">
                                        {t('login.password')}*
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder={t('login.password_placeholder')}
                                        className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-700 bg-gray-100 text-dark-gray-900 rounded-2xl"
                                    />
                                    <div className="flex flex-row justify-between my-5">
                                        <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                                            <input type="checkbox" checked={keepLogin} onChange={toggleKeepLogin} className="sr-only peer" />
                                            <div className="w-5 h-5 bg-white border-2 rounded-sm border-gray-500 peer peer-checked:border-0 peer-checked:bg-violet-700">
                                                <img className="" src="check-icon.png" alt="tick" />
                                            </div>
                                            <span className="ml-3 text-sm font-normal text-gray-900">{t('login.keep_login')}</span>
                                        </label>
                                        <a href="" className="mr-4 text-sm font-bold text-violet-700">
                                            {t('login.forget_password')}
                                        </a>
                                    </div>
                                    <button className="w-full px-6 py-5 my-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-violet-600 focus:ring-4 focus:ring-purple-blue-100 bg-violet-700">
                                        {t('login.sign_in')}
                                    </button>
                                    <p className="text-sm leading-relaxed text-gray-900">
                                        {t('login.not_registered')}
                                        <span className="whitespace-pre"> </span>
                                        <a href="" className="font-bold text-slate-700">
                                            {t('login.sign_up')}
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
